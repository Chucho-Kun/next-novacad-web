import ServiceCategoryCard from "@/components/ServiceCategoryCard";
import { serviceCategories } from "@/data/services";

export default function Services() {
  return (
    <section id="servicios" className="bg-white px-[5vw] pt-5 pb-[50px] lg:px-[10vw] lg:pt-[60px] lg:pb-[100px]">
      <h2 className="text-center text-[30px] leading-9 font-normal max-[479px]:text-[25px] max-[479px]:leading-[30px] max-[479px]:font-bold lg:text-[28px] lg:font-medium">
        Nuestros servicios
      </h2>
      <p className="mx-auto mt-5 w-[90vw] text-justify text-base leading-5 lg:mt-[30px] lg:w-[80vw] lg:text-[17px] lg:leading-[22px]">
        Somos un laboratorio dental especializado en prótesis de alta calidad, impulsado por tecnología de vanguardia y un equipo
        de expertos comprometidos con la excelencia
      </p>
      <div className="mx-auto mt-[30px] flex w-[85vw] flex-wrap items-start justify-between gap-y-5 md:w-[70vw] lg:w-[80vw] lg:flex-nowrap lg:gap-y-0">
        {serviceCategories.map((category) => (
          <ServiceCategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </section>
  );
}
