import { faqs } from "@/data/faqs";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-titulo" className="bg-white px-[5vw] py-12.5 lg:px-[10vw] lg:py-25">
      <h2 id="faq-titulo" className="text-center text-[30px] leading-9 font-normal lg:text-[28px] lg:font-medium">
        Preguntas frecuentes
      </h2>
      <p className="mx-auto mt-5 w-[90vw] text-center text-base leading-5 lg:w-[80vw] lg:text-[17px] lg:leading-5.5">
        Resolvemos las dudas más comunes de los odontólogos que trabajan con nuestro laboratorio dental en Ecatepec.
      </p>
      <div className="mx-auto mt-7.5 w-[90vw] max-w-3xl space-y-4 lg:w-[80vw]">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-[10px] border border-[#c7c7c7] bg-white px-5 py-4"
          >
            <summary className="cursor-pointer text-base leading-6 font-semibold text-black lg:text-[17px]">
              {faq.question}
            </summary>
            <p className="mt-3 text-base leading-6 text-[#333333] lg:text-[17px]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
