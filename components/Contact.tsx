import Image from "next/image";
import ContactForm from "@/components/ContactForm";

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61585583129527#",
    label: "Facebook",
    icon: "/images/n-icono-fb.png",
  },
  { href: "https://www.instagram.com/novacadental/", label: "Instagram", icon: "/images/n-icono-insta.png" },
  { href: "https://www.tiktok.com/@novacad.dental", label: "TikTok", icon: "/images/n-icono-tiktok.png" },
  {
    href: "https://wa.me/message/WGEHL6GIRQIVL1?src=qr",
    label: "WhatsApp",
    icon: "/images/n-icono-wa.png",
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="bg-brand-blue px-[5vw] pt-5 text-white lg:px-[10vw] lg:pt-[34px]">
      <h2 className="text-center text-[30px] leading-9 font-normal lg:text-[28px] lg:font-medium">Contacto</h2>
      <div className="mt-[46px] flex w-[90vw] flex-wrap justify-center pb-5 lg:mt-[30px] lg:w-[80vw] lg:flex-nowrap lg:justify-start lg:pb-0">
        <div className="flex w-[90vw] items-center justify-center px-5 lg:w-[26vw] lg:justify-start">
          <Image
            src="/images/n_logo_blanco_novacad.png"
            alt="NOVACAD Laboratorios y Depósitos"
            width={500}
            height={97}
            className="h-10 w-auto lg:h-auto lg:w-[24vw]"
          />
        </div>
        <div className="mt-10 w-[60vw] px-4 lg:mt-0 lg:w-[26vw] lg:px-5">
          <h3 className="mb-3 text-xl leading-[30px] font-semibold">Síguenos</h3>
          <div className="mb-[30px] flex gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${social.label} de NOVACAD`}
              >
                <Image src={social.icon} alt="" width={50} height={50} className="size-[35px]" />
              </a>
            ))}
          </div>
          <h3 className="mb-3 text-xl leading-[30px] font-semibold">Teléfono</h3>
          <a href="tel:+525662682487" className="mb-[30px] block text-base leading-[22px]">
            56 6268 2487
          </a>
          <h3 className="mb-3 text-xl leading-[30px] font-semibold">Correo</h3>
          <a href="mailto:novacad.social@gmail.com" className="mb-[30px] block text-base leading-[22px] underline">
            novacad.social@gmail.com
          </a>
          <h3 className="mb-3 text-xl leading-[30px] font-semibold">Dirección</h3>
          <address className="mb-[30px] text-base leading-[22px] not-italic">
            Cerezo 77A, Boulevares Impala, 55040, Ecatepec de Morelos, Méx, México
          </address>
        </div>
        <div className="mt-10 lg:mt-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
