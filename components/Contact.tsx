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
    <section id="contacto" aria-labelledby="contacto-titulo" className="bg-brand-blue px-[5vw] pt-5 text-white lg:px-[10vw] lg:pt-8.5">
      <h2 id="contacto-titulo" className="text-center text-[30px] leading-9 font-normal lg:text-[28px] lg:font-medium">Contacto</h2>
      <div className="mt-11.5 flex w-[90vw] flex-wrap justify-center pb-5 lg:mt-7.5 lg:w-[80vw] lg:flex-nowrap lg:justify-start lg:pb-0">
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

          <h3 className="mb-3 text-xl leading-7.5 font-semibold">Teléfono</h3>
          <div>
            <a href="tel:+525662682487" className="mb-7.5 block w-fit rounded text-base leading-5.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue focus-visible:outline-none">
              <div className="flex flex-2 gap-2">
                <div> <img src="/images/whatsapp.svg" className="w-5 h-5" alt="icono whats app" /> </div>
                <div>56 6268 2487</div>
              </div>
            </a>

          </div>

          <h3 className="mb-3 text-xl leading-7.5 font-semibold">Correo</h3>
          <a href="mailto:novacad.social@gmail.com" className="mb-7.5 block w-fit rounded text-base leading-5.5 no-underline focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue focus-visible:outline-none">
            novacad.social@gmail.com
          </a>
          
          <h3 className="mb-3 text-xl leading-7.5 font-semibold">Dirección</h3>
          <address className="mb-7.5 text-base leading-5.5 not-italic">
            Cerezo 77A, Boulevares Impala, 55040, Ecatepec de Morelos, Méx, México
          </address>

           <h3 className="mb-3 text-xl leading-7.5 font-semibold">Síguenos</h3>
          <div className="mb-7.5 flex gap-2.5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${social.label} de NOVACAD`}
                className="rounded-[10px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-blue focus-visible:outline-none"
              >
                <Image src={social.icon} alt="" aria-hidden="true" width={50} height={50} className="size-8.75" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
