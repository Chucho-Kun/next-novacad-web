import Image from "next/image";

const priceListUrl = "https://drive.google.com/file/d/1PPoYiu9yjx-gO9PaDCmsOGz6u8TraAFE/view";
const whatsappUrl = "https://wa.me/message/WGEHL6GIRQIVL1?src=qr";

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Presentación de NOVACAD Laboratorio Dental"
      className="relative isolate flex min-h-106 flex-col items-center justify-center overflow-hidden px-[5vw] py-10 text-center text-white xs:h-[50vh] xs:py-0 lg:h-[calc(70vh+5px)] lg:min-h-141.25 lg:max-h-201.25 lg:px-0 2xl:min-h-176.25"
    >
      <Image
        src="/images/webp/Portada-Novacad-0.webp"
        alt="Laboratorio dental CAD/CAM NOVACAD en Ecatepec"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="-z-20 object-cover object-right lg:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/60 via-black/40 to-black/60"
      />
      <div className="flex translate-y-1.25 flex-col items-center lg:translate-y-2">
        <h1 className="font-display text-[32px] leading-[1.15] font-bold text-shadow-[0_5px_9px_rgb(0_0_0_/0.62)] xs:text-[50px] lg:text-[65px] lg:leading-18.75 2xl:text-[85px] 2xl:leading-22.5">
          Innovación Digital
          <br />
          Sonrisa Natural
        </h1>
        <div
          aria-hidden="true"
          className="mt-6 mb-5 h-0.5 w-[70vw] bg-white lg:mt-5.5 lg:mb-4.75 lg:w-[47vw]"
        />
        <p className="font-display text-[23px] leading-normal font-bold text-shadow-[0_2px_5px_rgb(0_0_0_/0.75)] xs:text-xl lg:text-[30px] lg:leading-8.75 2xl:text-[50px] 2xl:leading-15">
          Tecnología CAD/CAM para prótesis dentales
          <br />
          precisas y estéticas
        </p>
        <p className="mt-4 max-w-[85vw] text-sm leading-6 font-medium text-white/95 text-shadow-[0_2px_5px_rgb(0_0_0_/0.75)] lg:max-w-[60vw] lg:text-lg lg:leading-7">
          Laboratorio dental CAD/CAM en Ecatepec, Estado de México — prótesis para
          odontólogos de CDMX y Edomex
        </p>
        <div className="mt-8 flex translate-y-2 items-center justify-center gap-4 max-[479px]:flex-col lg:mt-6 lg:translate-y-px lg:gap-8.75">
          <a
            href={priceListUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Lista de precios de NOVACAD (se abre en una pestaña nueva)"
            className="flex min-h-9.5 w-35 items-center justify-center rounded-xl bg-white px-4 py-2 font-display text-lg leading-none font-bold text-[#011458] shadow-[0_2px_10px_rgb(0_0_0_/0.55)] transition-transform hover:-translate-y-0.5 max-[479px]:w-62.5 lg:w-auto lg:px-3.75 lg:text-xl 2xl:text-[30px]"
          >
            Lista de precios
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar trabajo por WhatsApp (se abre en una pestaña nueva)"
            className="flex min-h-9.5 w-35 items-center justify-center rounded-xl bg-brand-blue px-4 py-2 font-display text-lg leading-none font-bold text-white shadow-[0_2px_10px_rgb(0_0_0_/0.55)] transition-transform hover:-translate-y-0.5 max-[479px]:w-62.5 lg:w-auto lg:px-3.75 lg:text-xl 2xl:text-[30px]"
          >
            Enviar trabajo
          </a>
        </div>
      </div>
    </section>
  );
}
