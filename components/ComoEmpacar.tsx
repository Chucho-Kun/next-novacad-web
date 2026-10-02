import Image from "next/image";

import { comoEmpacarSteps } from "@/data/como-empacar";

export default function ComoEmpacar() {
  return (
    <section
      id="como-empacar"
      aria-labelledby="como-empacar-titulo"
      className="bg-brand-soft px-[5vw] py-[50px] lg:px-[10vw]"
    >
      <h2
        id="como-empacar-titulo"
        className="text-center text-[30px] leading-9 font-normal lg:text-[28px] lg:font-medium"
      >
        Cómo empacar
      </h2>
      <ol
        aria-label="Pasos para empacar un caso dental"
        className="mx-auto mt-4 grid list-none grid-cols-1 gap-x-8 gap-y-4 p-0 md:grid-cols-2 lg:grid-cols-6"
      >
        {comoEmpacarSteps.map((step, i) => {
          const number = String(i + 1).padStart(2, "0");
          const isLast = i === comoEmpacarSteps.length - 1;
          return (
            <li
              key={step.id}
              className={[
                "relative mt-12",
                "md:col-span-1 lg:col-span-2",
                i === 3 ? "lg:col-start-2" : "",
                i === 4 ? "lg:col-start-4" : "",
                isLast
                  ? "md:col-span-2 md:mx-auto md:w-full md:max-w-md lg:mx-0 lg:max-w-none"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="absolute -top-10 left-8 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-brand-deep shadow-md">
                <Image
                  src={step.icon}
                  alt={step.iconAlt}
                  width={80}
                  height={80}
                  className="h-11 w-11 object-contain"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute top-4 right-6 z-10 text-[40px] leading-none font-bold text-slate-300/70 select-none"
              >
                {number}
              </span>
              <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white pt-14 pr-6 pb-6 pl-8 shadow-sm">
                <span
                  aria-hidden="true"
                  className="absolute top-0 bottom-0 left-0 w-2.5 bg-brand-blue"
                />
                <h3 className="text-[20px] leading-7 font-bold text-brand-deep">
                  {step.title}
                </h3>
                {step.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="mt-3 text-[16px] leading-6 font-normal text-brand-deep/90"
                  >
                    {paragraph}
                  </p>
                ))}
                {step.bullets && step.bullets.length > 0 ? (
                  <ul className="mt-3 space-y-1.5">
                    {step.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[16px] leading-6 font-normal text-brand-deep/90"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-brand-blue"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {step.note ? (
                  <>
                    <hr className="my-4 border-t border-slate-200" />
                    <p className="text-[16px] leading-6 font-normal text-brand-deep/90">
                      {step.note}
                    </p>
                  </>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
