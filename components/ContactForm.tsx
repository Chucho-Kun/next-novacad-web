"use client";

import { useState } from "react";

const recipient = "novacad.social@gmail.com";
const whatsappUrl = "https://wa.me/message/WGEHL6GIRQIVL1?src=qr";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Consulta NOVACAD de ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);

    setStatus("Se abrirá tu cliente de correo para completar el envío.");
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  }

  return (
    <div id="contact-form" className="w-[60vw] -translate-y-4 lg:w-[26vw] lg:translate-y-0">
      <h3 className="mb-3 text-xl leading-[30px] font-semibold">Escribenos</h3>
      <form onSubmit={handleSubmit} className="text-[#333]">
        <label className="sr-only" htmlFor="contact-name">
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={256}
          placeholder="Nombre..."
          className="mb-5 h-[38px] w-full rounded-[10px] border border-[#ccc] bg-white px-3 text-sm placeholder:text-[#999] focus:border-brand-cyan focus:outline-none"
        />
        <label className="sr-only" htmlFor="contact-email">
          Correo electrónico
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={256}
          placeholder="E-mail..."
          className="mb-5 h-[38px] w-full rounded-[10px] border border-[#ccc] bg-white px-3 text-sm placeholder:text-[#999] focus:border-brand-cyan focus:outline-none"
        />
        <label className="sr-only" htmlFor="contact-message">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          placeholder="Mensaje..."
          className="mb-3.5 h-[58px] w-full resize-y rounded-[10px] border border-[#ccc] bg-white px-3 py-2 text-sm placeholder:text-[#999] focus:border-brand-cyan focus:outline-none lg:mb-5"
        />
        <button
          type="submit"
          className="h-[38px] w-full rounded-[10px] bg-brand-cyan px-[15px] text-lg text-white transition-colors hover:bg-[#0078aa] lg:w-auto"
        >
          Enviar
        </button>
      </form>
      <p aria-live="polite" className="mt-3 text-xs text-white">
        {status}
        {status ? (
          <>
            {" "}
            También puedes usar{
              " "
            }
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline">
              WhatsApp
            </a>
            .
          </>
        ) : null}
      </p>
    </div>
  );
}
