import ServiceCategoryCard from "@/components/ServiceCategoryCard";
import { serviceCategories } from "@/data/services";

export default function Services() {
  const mainCategories = serviceCategories.filter((category) => category.slug !== "nuevo-producto");
  const newProductCategory = serviceCategories.find((category) => category.slug === "nuevo-producto");

  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="bg-white px-[5vw] pt-5 pb-12.5 lg:px-[10vw] lg:pt-15 lg:pb-25">
      <h2 id="servicios-titulo" className="text-center text-[30px] leading-9 font-normal max-[479px]:text-[25px] max-[479px]:leading-7.5 max-[479px]:font-bold lg:text-[28px] lg:font-medium">
        Nuestros productos
      </h2>
      <p className="mx-auto mt-5 w-[90vw] text-justify text-base leading-5 lg:mt-7.5 lg:w-[80vw] lg:text-[17px] lg:leading-5.5">
        En NOVACAD estamos para ofrecerte la mejor atención, calidad y rapidez. Utilizamos la combinación de tecnologías como CAD/CAM garantizando un ajuste más preciso en cada caso.
      </p>
      <div className="mx-auto mt-7.5 flex w-[85vw] flex-wrap items-start justify-between gap-y-5 md:w-[70vw] lg:w-[80vw] lg:flex-nowrap lg:gap-y-0">
        {mainCategories.map((category) => (
          <ServiceCategoryCard key={category.slug} category={category} />
        ))}
      </div>

      <br />

      <h2 id="nuevo-producto-titulo" className="text-center text-[30px] leading-9 font-normal max-[479px]:text-[25px] max-[479px]:leading-7.5 max-[479px]:font-bold lg:text-[28px] lg:font-medium">
        NUEVO PRODUCTO
      </h2>

      <div className="mx-auto mt-7.5 flex w-[85vw] flex-wrap items-start justify-center gap-y-5 md:w-[70vw] lg:w-[80vw] lg:flex-nowrap lg:gap-y-0">
        {newProductCategory ? (
          <ServiceCategoryCard key={newProductCategory.slug} category={newProductCategory} />
        ) : null}
      </div>
    </section>
  );
}
