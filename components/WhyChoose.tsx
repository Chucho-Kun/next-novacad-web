import Image from "next/image";
import { whyChooseItems } from "@/data/why-choose";

const mobileWidths = ["w-[112px]", "w-[130px]", "w-[100px]"];

export default function WhyChoose() {
  return (
    <section aria-labelledby="why-choose-title" className="bg-white px-[5vw] pt-10 lg:px-[10vw] lg:pt-15">
      <h2
        id="why-choose-title"
        className="text-center text-[30px] leading-9 font-normal max-[479px]:text-[25px] max-[479px]:leading-7.5 max-[479px]:font-bold lg:text-[28px] lg:font-medium"
      >
        ¿Por qué elegir NOVACAD?
      </h2>
      <ul className="mx-auto mt-12 flex w-full list-none items-start justify-between p-0 lg:mt-15 lg:w-[54vw]">
        {whyChooseItems.map((item, index) => (
          <li key={item.title} className={`flex ${mobileWidths[index]} flex-col items-center text-center lg:w-auto`}>
            <Image
              src={item.icon}
              alt=""
              aria-hidden="true"
              width={120}
              height={120}
              className="h-20 w-auto object-contain lg:h-25"
            />
            <p className="mt-3.75 text-base leading-5.5 lg:text-[17px]">{item.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
