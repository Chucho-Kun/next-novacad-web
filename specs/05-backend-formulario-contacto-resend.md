# SPEC 05 — Backend formulario de contacto con Resend (provisional gameroapp@gmail.com)

> **Status:** Approved
> **Depends on:** SPEC 02
> **Date:** 2026-09-24
> **Objective:** Implementar el backend del formulario de contacto con validación Zod en cliente y servidor, rate limiting en memoria y envío provisional vía Resend desde contacto@novacad.com.mx a gameroapp@gmail.com.

## Scope

**In:**

- Ruta API `app/api/contact/route.ts` (POST, App Router) que recibe JSON `{name, email, message, _gotcha?}`, valida con Zod, aplica rate limiting en memoria (5 req / 10 min por IP vía `x-forwarded-for` / `x-real-ip`), honeypot `_gotcha` (si tiene valor responde 200 silencioso sin enviar), y envía correo vía Resend a `CONTACT_TO` provisional `gameroapp@gmail.com` desde `CONTACT_FROM=contacto@novacad.com.mx` con `replyTo` = email del usuario.
- Validación básica compartida cliente+servidor: `name` requerido 2–100 chars (trim), `email` requerido formato válido, `message` requerido 10–5000 chars (trim). Mensajes de error en español. En el API responde `400` con `{error, issues}` si falla; `429` si supera rate limit; `500` si falta `RESEND_API_KEY` o falla Resend.
- Instalación de dependencias `resend` y `zod` en `package.json:12` (únicas nuevas deps permitidas en este spec por ser imprescindibles).
- Variables de entorno documentadas en `.env.example` y consumidas en el API: `RESEND_API_KEY` (obligatoria, proporcionada por el usuario), `CONTACT_TO` (default `gameroapp@gmail.com` provisional), `CONTACT_FROM` (default `contacto@novacad.com.mx`, requiere dominio verificado en Resend). Sin hardcodear el destinatario final en código más allá del default.
- Actualización de `components/ContactForm.tsx:1` (`"use client"`) para dejar de usar `mailto:` (`ContactForm.tsx:21` actual) y hacer `fetch("/api/contact", {method:"POST"})` con estados `idle → submitting → success | error`, botón deshabilitado con texto `Enviando...`, mensaje `¡Mensaje enviado!` en éxito y `Error: ... Intenta de nuevo o escribe a novacad.social@gmail.com` en fallo, sin recarga de página (`event.preventDefault()` se mantiene).
- Preservación de `components/Contact.tsx:1` y ancla `#contacto` (`app/globals.css:76`); el form sigue aislado como Client Component y la página home `app/page.tsx:1` permanece Server Component.
- Asunto del correo fijo `Nuevo contacto NOVACAD — [name]` y cuerpo en texto plano con `Nombre`, `Correo`, `Mensaje`, fecha ISO y `IP` si disponible.

**Out of scope (for future specs):**

- Reemplazo definitivo de `CONTACT_TO` a `novacad.social@gmail.com` (se hará cambiando env, sin código).
- CAPTCHA / Turnstile / reCAPTCHA, validación con servicio externo, o scoring de spam más allá de honeypot+rate limiting.
- Persistencia en base de datos, guardado de leads, o log estructurado en servicio externo.
- Adjuntos de archivos, campos extra (`tel`, `asunto`, `servicio`), o formulario multi-step.
- Rate limiting distribuido con Redis/Upstash o KV; este spec usa memoria del proceso (se resetea al redeploy, no compartido entre instancias serverless).
- Verificación de dominio en Resend, configuración DNS SPF/DKIM, o `next.config.ts:1` headers — se documenta pero no se implementa en código.
- Cambio de `metadataBase` (`app/layout.tsx:20`), sitemap/robots/JSON-LD de SPEC 04, o estilos Tailwind v4.

## Data model

Esta feature introduce validación y envío; no crea tablas ni cambia `data/services.ts`.

```ts
// lib/validations/contact.ts — schema compartido (importado por API y por ContactForm para mensajes consistentes)
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "El nombre debe tener al menos 2 caracteres").max(100, "El nombre no puede superar 100 caracteres"),
  email: z.string().trim().email("Ingresa un correo válido").max(254),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres").max(5000, "El mensaje no puede superar 5000 caracteres"),
  _gotcha: z.string().optional(), // honeypot — si tiene valor, no enviar
});

export type ContactInput = z.infer<typeof contactSchema>;

// app/api/contact/route.ts — tipos de respuesta
type SuccessRes = { ok: true; id?: string };
type ErrorRes = { ok: false; error: string; issues?: z.ZodIssue[] };

// lib/rate-limit.ts (o inline en route.ts) — memoria del proceso
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>(); // key = ip
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX_HITS = 5;

// .env.example
RESEND_API_KEY="re_xxx"
CONTACT_TO="gameroapp@gmail.com"
CONTACT_FROM="contacto@novacad.com.mx"

// Resend payload (en route.ts)
await resend.emails.send({
  from: process.env.CONTACT_FROM ?? "contacto@novacad.com.mx",
  to: process.env.CONTACT_TO ?? "gameroapp@gmail.com",
  replyTo: validated.email,
  subject: `Nuevo contacto NOVACAD — ${validated.name}`,
  text: `Nombre: ${validated.name}\nCorreo: ${validated.email}\nIP: ${ip}\nFecha: ${new Date().toISOString()}\n\nMensaje:\n${validated.message}`,
});
```

Convenciones:

- Fuente única de validación: `contactSchema` en `lib/validations/contact.ts`; tanto `app/api/contact/route.ts` como `components/ContactForm.tsx:11` importan o duplican las mismas reglas para mensajes idénticos en es-MX.
- IP se extrae de `request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()` fallback `x-real-ip` fallback `"unknown"`; no se confía para auth, solo para rate limit y traza en el correo.
- `resend` se instancia con `new Resend(process.env.RESEND_API_KEY!)` y se valida presencia de la key al inicio del handler (500 si falta).
- El destinatario provisional es env-driven; cambiar a `novacad.social@gmail.com` no requiere deploy de código, solo rotar `CONTACT_TO`.

## Implementation plan

1. **Añadir dependencias `resend` y `zod`.** Ejecutar `npm install resend zod` (actualiza `package.json:12` y `package-lock.json`). Verificación: `npm run build` sigue compilando y `npx tsc --noEmit` sin errores; `npm run lint` sin errores.
2. **Crear `.env.example` y helper de validación.** Crear `.env.example` con `RESEND_API_KEY`, `CONTACT_TO=gameroapp@gmail.com`, `CONTACT_FROM=contacto@novacad.com.mx` y comentario sobre verificar dominio `novacad.com.mx` en Resend. Crear `lib/validations/contact.ts` exportando `contactSchema` (Zod) con mensajes en español y límites 2–100 / email / 10–5000. Verificación: `npx tsc --noEmit` tipa correctamente y el schema es importable desde un script `node -e "import('./lib/validations/contact.ts')"` sin errores.
3. **Implementar `app/api/contact/route.ts`.** Crear Server Route `export async function POST(request: Request)` que: parsea JSON, valida con `contactSchema.safeParse`, si `_gotcha` tiene valor responde `200 {ok:true}` sin enviar, aplica rate limiting en memoria por IP (429 con `Retry-After` si excede), valida `RESEND_API_KEY` (500 si falta), llama `resend.emails.send` con `from/to/replyTo/subject/text`, y responde `200 {ok:true, id}` o `500 {error}`. Manejar `try/catch` y no exponer stack. Verificación: `npm run build` lista `○ /api/contact` y `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"A","email":"bad","message":"hi"}'` responde 400 con `issues`.
4. **Actualizar `components/ContactForm.tsx:1`.** Mantener `"use client"` y `useState` pero reemplazar `window.location.href = mailto:...` (`ContactForm.tsx:21`) por `fetch("/api/contact", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({name,email,message,_gotcha})})`. Añadir campo honeypot oculto `<input name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />`. Gestionar estados `submitting/success/error`, deshabilitar botón con `disabled={submitting}` y texto `Enviando...`, mostrar `¡Mensaje enviado!` (y reset form) o error con fallback `o escribe a novacad.social@gmail.com`. Validación cliente previa con `contactSchema` o checks equivalentes para feedback inmediato sin round-trip. Verificación: `npm run dev` → enviar form válido muestra éxito sin recarga; enviar inválido muestra errores inline; `_gotcha` con valor no envía correo pero responde éxito.
5. **Verificación técnica y manual final.** Ejecutar `npm run lint`, `npm run build`, `npx tsc --noEmit`; probar `POST /api/contact` con payload válido (requiere `RESEND_API_KEY` real) y verificar llegada a `gameroapp@gmail.com` con `from: contacto@novacad.com.mx` y `replyTo` correcto; probar rate limit (6º envío en <10 min → 429); probar sin `RESEND_API_KEY` → 500 controlado; confirmar que `components/Contact.tsx:19` (`#contacto`) y navegación no se rompen y que no hay hotlinks nuevos ni cambios en `next.config.ts:1`/`app/globals.css:1`. Verificación: `✓ Compiled successfully`, `○ /api/contact` en build, 0 warnings de hydration, correo recibido en bandeja provisional.

## Acceptance criteria

- [ ] `app/api/contact/route.ts` existe y exporta `POST` que valida con Zod (`name` 2–100, `email` formato válido, `message` 10–5000, mensajes en español), responde 400 con `issues` si falla, 429 si supera 5 req/10 min por IP, y 500 si falta `RESEND_API_KEY` o falla Resend.
- [ ] El handler implementa honeypot `_gotcha`: si viene con valor no vacío, responde `200 {ok:true}` sin llamar a Resend.
- [ ] Con `RESEND_API_KEY` válida, un POST válido envía correo vía Resend con `from: contacto@novacad.com.mx`, `to: gameroapp@gmail.com` (via `CONTACT_TO`), `replyTo` = email del usuario, `subject: "Nuevo contacto NOVACAD — [name]"` y cuerpo con nombre/correo/mensaje/fecha/IP, y responde `200 {ok:true, id}`.
- [ ] `package.json` lista `resend` y `zod` en `dependencies`; `.env.example` documenta `RESEND_API_KEY`, `CONTACT_TO=gameroapp@gmail.com`, `CONTACT_FROM=contacto@novacad.com.mx` y nota de dominio verificado en Resend.
- [ ] `components/ContactForm.tsx` ya no usa `mailto:` ni `window.location.href`; hace `fetch` a `/api/contact`, incluye input honeypot oculto, deshabilita el botón con `Enviando...` durante el envío, muestra `¡Mensaje enviado!` en éxito (resetea campos) y mensaje de error con fallback a `novacad.social@gmail.com` en fallo, sin recargar la página.
- [ ] Validación cliente muestra errores en español antes del fetch (mismos límites que el servidor) y el form previene submit inválido.
- [ ] Rate limiting en memoria funciona: 5 envíos por IP en 10 min permitidos, el 6º responde 429 con mensaje en español y header `Retry-After`.
- [ ] `npm run lint` pasa sin errores, `npm run build` compila con `✓ Compiled successfully` y lista `○ /api/contact`, `npx tsc --noEmit` pasa, y no hay cambios en `next.config.ts`, `tsconfig.json` o sistema Tailwind v4 fuera de lo declarado.
- [ ] Correo de prueba llega a `gameroapp@gmail.com` con remitente `contacto@novacad.com.mx` (si el dominio está verificado en Resend) o el error de Resend se surfacea como 500 controlado sin exponer la key.

## Decisions

- **Sí:** Resend como transporte. Recomendado para Next.js, API simple, sin gestionar SMTP/App Password de Gmail, y compatible con dominio `novacad.com.mx` verificado; evita fragilidad de `nodemailer` + Gmail.
- **No:** Nodemailer + SMTP Gmail. Requiere App Password, rotación manual y manejo de OAuth; se descarta para este provisional.
- **Sí:** Zod para validación compartida cliente+servidor. Mensajes consistentes en es-MX, tipado `ContactInput`, y `safeParse` con `issues` estructurados para el API; costo de dep mínimo y ya aprobado por el usuario.
- **No:** validación manual sin librería. Duplica regex y mensajes entre cliente y servidor, propenso a drift.
- **Sí:** `CONTACT_FROM=contacto@novacad.com.mx` + `replyTo` = email del usuario. Cumple SPF/DKIM del dominio y permite responder directo al usuario sin spoofear `FROM`.
- **No:** usar el email del usuario como `FROM`. Falla autenticación y Resend lo rechaza si el dominio no está verificado.
- **Sí:** destinatario provisional `gameroapp@gmail.com` via `CONTACT_TO` en env (default hardcodeado solo como fallback). Permite cambiar a `novacad.social@gmail.com` sin tocar código.
- **No:** hardcodear `gameroapp@gmail.com` en `route.ts` sin env. Obliga a deploy para rotar destinatario.
- **Sí:** rate limiting en memoria `Map<ip, Bucket>` 5/10 min + honeypot `_gotcha`. Suficiente para spam básico sin Redis/KV ni CAPTCHA, sin nuevas infra deps.
- **No:** Redis/Upstash o CAPTCHA en este spec. Añade costo e integración externa; va en spec futura si el spam escala.
- **Sí:** `.env.example` con las 3 keys y comentario de verificación de dominio. Documenta setup sin commitear secretos.
- **No:** commitear `RESEND_API_KEY` o dejar `.env.local` en repo. Riesgo de fuga de secretos.
- **Sí:** `ContactForm.tsx` con estados `submitting/success/error` y botón deshabilitado. Evita doble submit y da feedback claro, reemplazando el `mailto:` frágil de `ContactForm.tsx:21`.
- **No:** mantener `mailto:` como fallback automático además del API. El usuario confirmó flujo A sin fallback; el fallback queda como mensaje de error manual.

## Risks

| Risk | Mitigation |
|---|---|
| `CONTACT_FROM=contacto@novacad.com.mx` no está verificado en Resend y el envío es rechazado (403/422) | Documentar en `.env.example` que el dominio debe verificarse (SPF/DKIM) en dashboard Resend; si no está verificado, el API responde 500 con mensaje `Dominio remitente no verificado` sin exponer key; permitir override temporal a `onboarding@resend.dev` solo para pruebas locales documentado en comentario |
| `RESEND_API_KEY` ausente en producción y el form siempre falla | Validar presencia al inicio del handler y responder 500 controlado con `Falta configuración de correo`; no loguear la key; `.env.example` y README de spec recuerdan inyectar la var en hosting |
| Rate limiting en memoria no compartido entre instancias serverless (Vercel multi-lambda) | Aceptado como limitación provisional documentada; mitiga spam casual pero no ataque distribuido; spec futura migra a Redis/Upstash si se observa abuso; ventana 5/10 min es conservadora |
| Honeypot `_gotcha` es bypassable por bots sofisticados | No es defensa única; combinado con rate limiting y validación Zod (longitud/email) reduce spam automatizado básico; CAPTCHA queda como out-of-scope para siguiente spec si se necesita |
| Validación Zod desalineada entre cliente y servidor si se duplica en lugar de compartir | Fuente única `lib/validations/contact.ts` importada por ambos; si `ContactForm.tsx` no puede importar Zod sin aumentar bundle, se duplica con comentario `// keep in sync with lib/validations/contact.ts` y test manual de 400 vs cliente |
| Exposición de `CONTACT_TO` en el cliente si se importa env en `ContactForm.tsx` | Nunca exponer `CONTACT_TO` en el cliente; solo el API lo lee en servidor; el cliente solo hace `fetch` sin conocer el destinatario |

## What is **not** in this spec

- Cambio definitivo a `novacad.social@gmail.com`, CAPTCHA/Turnstile, persistencia en DB, adjuntos, campos extra, rate limiting distribuido con Redis, verificación DNS/SPF/DKIM automatizada, o cambios en `next.config.ts`/`app/layout.tsx:20`/`app/globals.css:1`. Cada uno, si se necesita, va en su propia spec.
