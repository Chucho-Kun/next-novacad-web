import Image from "next/image";

type PackagingStep = {
  number: number;
  alt: string;
};

const firstRow: PackagingStep[] = [
  {
    number: 1,
    alt: "Paso 1: Desinfectar todos los materiales incluidos en la caja y envolver cada modelo con papel burbuja o relleno de espuma para evitar que estos se dañen.",
  },
  {
    number: 2,
    alt: "Paso 2: Si se envían coronas sueltas, puentes, implantes o aditamentos, colocarlos en bolsas por separado o en un recipiente pequeño dentro de la caja.",
  },
  {
    number: 3,
    alt: "Paso 3: Enviar las impresiones de alginato en corridas de yeso Tipo II (antagonistas) o Tipo IV (modelos de trabajo), preferentemente arcadas completas.",
  },
];

const secondRow: PackagingStep[] = [
  {
    number: 4,
    alt: "Paso 4: Se recomienda que las fotografías y los mapeos de color se agreguen a nuestra plataforma en Vevi Dental.",
  },
  {
    number: 5,
    alt: "Paso 5: Si se envía más de un caso, separar las cajas para cada uno, con sus respectivas indicaciones.",
  },
];

function PackagingImage({ number, alt }: { number: number; alt: string }) {
  return (
    <Image
      src={`/images/n-img-como-empacar-${number}.svg`}
      alt={alt}
      width={500}
      height={500}
      unoptimized
      className="h-auto w-[25vw] lg:w-[20vw] 2xl:w-[17vw]"
    />
  );
}

export default function ComoEmpacar() {
  return (
    <section id="como-empacar" aria-labelledby="como-empacar-heading" className="bg-brand-soft px-[5vw] py-[50px] lg:px-[10vw]">
      <h2 id="como-empacar-heading" className="text-center text-[30px] leading-9 font-normal lg:text-[28px] lg:font-medium">Cómo empacar</h2>
      <ol aria-label="Pasos 1 a 3 para empacar un caso dental" className="mx-auto mt-10 flex w-[80vw] items-end justify-between">
        {firstRow.map((step) => (
          <li key={step.number}>
            <PackagingImage number={step.number} alt={step.alt} />
          </li>
        ))}
      </ol>
      <ol start={4} aria-label="Pasos 4 y 5 para empacar un caso dental" className="mx-auto mt-10 flex w-[65vw] items-end justify-between lg:w-[80vw] lg:justify-around">
        {secondRow.map((step) => (
          <li key={step.number}>
            <PackagingImage number={step.number} alt={step.alt} />
          </li>
        ))}
      </ol>
    </section>
  );
}
