"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/validations/contact";

const whatsappUrl = "https://wa.me/message/WGEHL6GIRQIVL1?src=qr";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccess("");
    setGeneralError("");
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      _gotcha: String(data.get("_gotcha") ?? ""),
    };

    // Validación cliente con Zod (mismos mensajes que el servidor)
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const errs: FieldErrors = {};
      let firstGeneral = "";
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as string | undefined;
        if (field === "name" && !errs.name) errs.name = issue.message;
        else if (field === "email" && !errs.email) errs.email = issue.message;
        else if (field === "message" && !errs.message) errs.message = issue.message;
        else if (!firstGeneral) firstGeneral = issue.message;
      }
      setFieldErrors(errs);
      if (firstGeneral && !errs.name && !errs.email && !errs.message) {
        setGeneralError(firstGeneral);
      }
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = (await res.json()) as {
        ok: boolean;
        error?: string;
        issues?: { path: (string | number)[]; message: string }[];
      };

      if (!res.ok || !json.ok) {
        // Si el servidor trae issues de Zod, mapear a campos
        if (json.issues && Array.isArray(json.issues)) {
          const errs: FieldErrors = {};
          for (const issue of json.issues) {
            const field = issue.path[0] as string | undefined;
            if (field === "name" && !errs.name) errs.name = issue.message;
            else if (field === "email" && !errs.email) errs.email = issue.message;
            else if (field === "message" && !errs.message) errs.message = issue.message;
          }
          if (Object.keys(errs).length > 0) {
            setFieldErrors(errs);
            return;
          }
        }
        const msg = json.error ?? "No se pudo enviar el mensaje. Intenta de nuevo o escribe a novacad.social@gmail.com";
        // Mensaje con fallback explícito
        if (msg.includes("novacad.social@gmail.com")) {
          setGeneralError(msg);
        } else {
          setGeneralError(`${msg}. Intenta de nuevo o escribe a novacad.social@gmail.com`);
        }
        return;
      }

      setSuccess("¡Mensaje enviado! Te responderemos pronto.");
      form.reset();
    } catch {
      setGeneralError("Error de red. Intenta de nuevo o escribe a novacad.social@gmail.com");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="contact-form" className="w-[60vw] -translate-y-4 lg:w-[26vw] lg:translate-y-0">
      <h3 className="mb-3 text-xl leading-[30px] font-semibold">Escríbenos</h3>
      <form onSubmit={handleSubmit} noValidate className="text-[#333]">
        {/* Honeypot — oculto para usuarios y lectores de pantalla, visible para bots */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <label className="sr-only" htmlFor="contact-name">
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          placeholder="Nombre..."
          aria-invalid={!!fieldErrors.name}
          aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          className="mb-1 h-[38px] w-full rounded-[10px] border border-[#ccc] bg-white px-3 text-sm placeholder:text-[#767676] focus:border-brand-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cyan"
        />
        {fieldErrors.name ? (
          <p id="contact-name-error" role="alert" className="mb-3 text-xs text-white">
            {fieldErrors.name}
          </p>
        ) : (
          <div className="mb-4" />
        )}
        <label className="sr-only" htmlFor="contact-email">
          Correo electrónico
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="E-mail..."
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          className="mb-1 h-[38px] w-full rounded-[10px] border border-[#ccc] bg-white px-3 text-sm placeholder:text-[#767676] focus:border-brand-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cyan"
        />
        {fieldErrors.email ? (
          <p id="contact-email-error" role="alert" className="mb-3 text-xs text-white">
            {fieldErrors.email}
          </p>
        ) : (
          <div className="mb-4" />
        )}
        <label className="sr-only" htmlFor="contact-message">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          placeholder="Mensaje..."
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className="mb-1 h-[58px] w-full resize-y rounded-[10px] border border-[#ccc] bg-white px-3 py-2 text-sm placeholder:text-[#767676] focus:border-brand-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cyan lg:mb-1"
        />
        {fieldErrors.message ? (
          <p id="contact-message-error" role="alert" className="mb-3 text-xs text-white">
            {fieldErrors.message}
          </p>
        ) : (
          <div className="mb-3 lg:mb-4" />
        )}
        <button
          type="submit"
          disabled={submitting}
          className="h-[38px] w-full rounded-[10px] bg-[#0078aa] px-[15px] text-lg text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue focus-visible:outline-none lg:w-auto"
        >
          {submitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
      <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-xs text-white">
        {success ? (
          <>
            {success}{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Continuar por WhatsApp de NOVACAD"
              className="underline focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue focus-visible:outline-none"
            >
              WhatsApp
            </a>
            .
          </>
        ) : generalError ? (
          generalError
        ) : null}
      </p>
    </div>
  );
}
