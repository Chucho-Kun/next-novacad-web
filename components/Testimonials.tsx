import TestimonialCarousel from "@/components/TestimonialCarousel";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonios" aria-labelledby="testimonios-titulo" className="bg-white px-[5vw] pt-10 pb-5 lg:px-[10vw] lg:pt-0">
      <h2 id="testimonios-titulo" className="mx-auto mb-10 max-w-97.5 text-center text-[30px] leading-9 font-normal lg:mb-7.5 lg:max-w-none lg:text-[28px] lg:font-medium">
        ¿Qué opinan nuestros clientes?
      </h2>
      <TestimonialCarousel testimonials={testimonials} />
    </section>
  );
}
