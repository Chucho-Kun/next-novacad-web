import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";

export const runtime = "nodejs";

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp?.trim()) return realIp.trim();
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }
  if (bucket.count < MAX_HITS) {
    bucket.count += 1;
    return { allowed: true };
  }
  return { allowed: false, retryAfterMs: bucket.resetAt - now };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Cuerpo JSON inválido" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "Datos inválidos", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, email, message, _gotcha } = parsed.data;

  // Honeypot — respuesta silenciosa sin enviar correo
  if (_gotcha && _gotcha.trim().length > 0) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    const retryAfterSec = Math.ceil((rate.retryAfterMs ?? WINDOW_MS) / 1000);
    return Response.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { ok: false, error: "Falta configuración de correo en el servidor" },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_TO ?? "gameroapp@gmail.com";
  const from = process.env.CONTACT_FROM ?? "contacto@novacad.com.mx";

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto NOVACAD — ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nIP: ${ip}\nFecha: ${new Date().toISOString()}\n\nMensaje:\n${message}`,
    });

    if (error) {
      // No exponer detalles internos de Resend más allá del mensaje
      const msg =
        typeof error.message === "string" && error.message.length > 0
          ? error.message
          : "Error al enviar el correo";
      // Mensaje amigable si el dominio no está verificado
      const isDomainError =
        msg.toLowerCase().includes("domain") ||
        msg.toLowerCase().includes("verify") ||
        msg.toLowerCase().includes("from");
      return Response.json(
        {
          ok: false,
          error: isDomainError
            ? "Dominio remitente no verificado en Resend. Verifica contacto@novacad.com.mx o usa onboarding@resend.dev para pruebas."
            : msg,
        },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error interno";
    return Response.json({ ok: false, error: msg }, { status: 500 });
  }
}
