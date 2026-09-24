const priceListUrl = "https://drive.google.com/file/d/1PPoYiu9yjx-gO9PaDCmsOGz6u8TraAFE/view";
const whatsappUrl = "https://wa.me/message/WGEHL6GIRQIVL1?src=qr";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-[424px] flex-col items-center justify-center bg-[url('/images/Portada-Novacad-0.jpg')] bg-cover bg-center px-[5vw] py-10 text-center text-white xs:h-[50vh] xs:bg-right xs:py-0 lg:h-[calc(70vh+5px)] lg:min-h-[565px] lg:max-h-[805px] lg:bg-center lg:px-0 2xl:min-h-[705px]"
    >
      <div className="flex translate-y-[5px] flex-col items-center lg:translate-y-2">
        <h1 className="font-display text-[32px] leading-[1.15] font-bold text-shadow-[0_5px_9px_rgb(0_0_0_/_0.62)] xs:text-[50px] lg:text-[65px] lg:leading-[75px] 2xl:text-[85px] 2xl:leading-[90px]">
          Innovación Digital
          <br />
          Sonrisa Natural
        </h1>
        <div
          aria-hidden
          className="mt-6 mb-5 h-0.5 w-[70vw] bg-white lg:mt-[22px] lg:mb-[19px] lg:w-[47vw]"
        />
        <p className="font-display text-[23px] leading-[1.5] font-bold text-shadow-[0_2px_5px_rgb(0_0_0_/_0.75)] xs:text-xl lg:text-[30px] lg:leading-[35px] 2xl:text-[50px] 2xl:leading-[60px]">
          Tecnología CAD/CAM para prótesis dentales
          <br />
          precisas y estéticas
        </p>
        <div className="mt-8 flex translate-y-2 items-center justify-center gap-4 max-[479px]:flex-col lg:mt-6 lg:translate-y-px lg:gap-[35px]">
          <a
            href={priceListUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[38px] w-[140px] items-center justify-center rounded-xl bg-white px-4 font-display text-lg leading-none font-bold text-[#011458] shadow-[0_2px_10px_rgb(0_0_0_/_0.55)] transition-transform hover:-translate-y-0.5 max-[479px]:w-[250px] lg:w-auto lg:px-[15px] lg:text-xl 2xl:text-[30px]"
          >
            Lista de precios
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[38px] w-[140px] items-center justify-center rounded-xl bg-brand-blue px-4 font-display text-lg leading-none font-bold text-white shadow-[0_2px_10px_rgb(0_0_0_/_0.55)] transition-transform hover:-translate-y-0.5 max-[479px]:w-[250px] lg:w-auto lg:px-[15px] lg:text-xl 2xl:text-[30px]"
          >
            Enviar trabajo
          </a>
        </div>
      </div>
    </section>
  );
}
