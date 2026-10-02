import Image from "next/image";

const whatsappUrl = "https://wa.me/message/WGEHL6GIRQIVL1?src=qr";

export default function FloatingContact() {
  return (
    <aside
      aria-label="Contacto rápido"
      className="fixed right-3 bottom-10 z-60 flex flex-col gap-5 lg:right-6 lg:bottom-8.5"
    >
      <a href="tel:+525662682487" aria-label="Llamar a NOVACAD" className="rounded-full">
        <Image
          src="/images/n-2-icono-telefono.png"
          alt=""
          aria-hidden="true"
          width={60}
          height={60}
          priority
          className="size-12.5 lg:size-17.5"
        />
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a NOVACAD por WhatsApp (se abre en una pestaña nueva)"
        className="rounded-full"
      >
        <Image
          src="/images/n-2-icono-waf.webp"
          alt=""
          aria-hidden="true"
          width={60}
          height={60}
          loading="eager"
          fetchPriority="high"
          unoptimized
          className="size-12.5 lg:size-17.5"
        />
      </a>
    </aside>
  );
}
