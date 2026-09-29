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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildContactHtml({
  name,
  email,
  message,
  ip,
  date,
}: {
  name: string;
  email: string;
  message: string;
  ip: string;
  date: string;
}): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const safeIp = escapeHtml(ip);
  const safeDate = escapeHtml(date);
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#f1f1f1;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f1f1;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
          <tr>
            <td align="center" style="background-color:#011458;padding:24px;">
              <img src="https://novacad.com.mx/images/n_logo_blanco_novacad.png" alt="NOVACAD" width="220" style="display:block;max-width:220px;width:100%;height:auto;border-radius:8px;" />
            </td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px 28px;">
              <h1 style="margin:0 0 8px 0;font-size:20px;color:#223a87;">Nuevo mensaje de contacto</h1>
              <p style="margin:0;font-size:14px;color:#555555;">Recibido desde el formulario web de NOVACAD.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#333333;">
                <tr><td style="padding:6px 0;color:#555555;width:90px;">Nombre:</td><td style="padding:6px 0;font-weight:bold;color:#011458;">${safeName}</td></tr>
                <tr><td style="padding:6px 0;color:#555555;">Correo:</td><td style="padding:6px 0;"><a href="mailto:${safeEmail}" style="color:#0089c0;">${safeEmail}</a></td></tr>
                <tr><td style="padding:6px 0;color:#555555;">Fecha:</td><td style="padding:6px 0;">${safeDate}</td></tr>
                <tr><td style="padding:6px 0;color:#555555;">IP:</td><td style="padding:6px 0;">${safeIp}</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 8px 28px;">
              <p style="margin:0 0 8px 0;font-size:14px;font-weight:bold;color:#223a87;">Mensaje:</p>
              <div style="background-color:#f8f8f8;border-left:4px solid #0089c0;border-radius:0 8px 8px 0;padding:14px 16px;font-size:14px;line-height:1.6;color:#333333;">${safeMessage}</div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 28px 28px 28px;">
              <a href="mailto:${safeEmail}" style="display:inline-block;background-color:#0089c0;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 28px;border-radius:10px;">Responder al contacto</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="background-color:#011458;padding:16px;font-size:12px;color:#ffffff;">NOVACAD · Laboratorio Dental CAD/CAM · novacad.com.mx</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
    const sentAt = new Date().toISOString();
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto NOVACAD — ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nIP: ${ip}\nFecha: ${sentAt}\n\nMensaje:\n${message}`,
      html: buildContactHtml({ name, email, message, ip, date: sentAt }),
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
