import Image from "next/image";

export default function About() {
  return (
    <section id="quienes-somos" className="bg-white pt-10 pb-10 lg:pt-20">
      <div className="mx-auto flex w-[90vw] flex-col items-center lg:w-[80vw] lg:flex-row lg:justify-between">
        <div className="flex w-full flex-col lg:w-[40vw] lg:items-start">
          <h2 className="text-center text-[30px] leading-9 font-normal max-[479px]:text-[25px] max-[479px]:leading-7.5 max-[479px]:font-bold lg:text-left lg:text-[28px] lg:font-medium">
            ¿Quiénes Somos?
          </h2>
          <div className="mt-7.5 w-full lg:hidden">
            <Image
              src="/images/fotografia-lab-01.jpg"
              alt="Instalaciones y equipo del laboratorio dental NOVACAD"
              width={1128}
              height={800}
              sizes="90vw"
              className="h-auto w-full rounded-[15px]"
            />
          </div>
          <div className="mt-3.75 space-y-5 text-justify text-base leading-5 lg:mt-5.5 lg:space-y-5.5 lg:text-[17px] lg:leading-5.5">
            <p>
              Somos un laboratorio dental especializado en prótesis de alta calidad, impulsado por tecnología de vanguardia y
              un equipo de expertos comprometidos con la excelencia.
            </p>
            <p className="lg:hidden">
              Usamos tecnología CAD/CAM e impresión 3D para fabricar prótesis dentales con máxima precisión.
            </p>
            <p className="hidden lg:block">
              En NOVACAD, combinamos tecnología CAD/CAM de última generación, impresión 3D y experiencia clínica para ofrecer
              calidad, rapidez y eficiencia en cada pieza dental que elaboramos.
            </p>
          </div>
        </div>
        <div className="hidden w-[40vw] justify-end lg:flex">
          <Image
            src="/images/fotografia-lab-01.jpg"
            alt="Instalaciones y equipo del laboratorio dental NOVACAD"
            width={1128}
            height={800}
            sizes="35vw"
            className="h-auto w-[35vw] rounded-[15px]"
          />
        </div>
      </div>
    </section>
  );
}
