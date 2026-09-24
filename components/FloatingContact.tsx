import Image from "next/image";

const whatsappUrl = "https://wa.me/message/WGEHL6GIRQIVL1?src=qr";

export default function FloatingContact() {
  return (
    <aside
      aria-label="Contacto rápido"
      className="fixed right-3 bottom-10 z-[60] flex flex-col gap-5 lg:right-6 lg:bottom-[34px]"
    >
      <a href="tel:+525662682487" aria-label="Llamar a NOVACAD" className="rounded-full">
        <Image
          src="/images/n-2-icono-telefono.png"
          alt=""
          width={60}
          height={60}
          priority
          className="size-[50px] lg:size-[70px]"
        />
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a NOVACAD por WhatsApp"
        className="rounded-full"
      >
        <Image
          src="/images/n-2-icono-waf.png"
          alt=""
          width={60}
          height={60}
          loading="eager"
          fetchPriority="high"
          unoptimized
          className="size-[50px] lg:size-[70px]"
        />
      </a>
    </aside>
  );
}
