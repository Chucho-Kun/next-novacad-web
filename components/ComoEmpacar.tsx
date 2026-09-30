import Image from "next/image";

const firstRow = [1, 2, 3];
const secondRow = [4, 5];

function PackagingImage({ number, total }: { number: number; total: number }) {
  return (
    <Image
      src={`/images/n-img-como-empacar-${number}.svg`}
      alt={`Paso ${number} de ${total}: cómo empacar un caso dental`}
      width={500}
      height={500}
      unoptimized
      className="h-auto w-[25vw] lg:w-[20vw] 2xl:w-[17vw]"
    />
  );
}

export default function ComoEmpacar() {
  const total = firstRow.length + secondRow.length;
  return (
    <section id="como-empacar" aria-labelledby="como-empacar-titulo" className="bg-brand-soft px-[5vw] py-[50px] lg:px-[10vw]">
      <h2 id="como-empacar-titulo" className="text-center text-[30px] leading-9 font-normal lg:text-[28px] lg:font-medium">Cómo empacar</h2>
      <ol aria-label="Pasos 1 a 3 para empacar un caso dental" className="mx-auto mt-10 flex w-[80vw] list-none items-end justify-between p-0">
        {firstRow.map((number) => (
          <li key={number}>
            <PackagingImage number={number} total={total} />
          </li>
        ))}
      </ol>
      <ol start={firstRow.length + 1} aria-label={`Pasos ${firstRow.length + 1} a ${total} para empacar un caso dental`} className="mx-auto mt-10 flex w-[65vw] list-none items-end justify-between p-0 lg:w-[80vw] lg:justify-around">
        {secondRow.map((number) => (
          <li key={number}>
            <PackagingImage number={number} total={total} />
          </li>
        ))}
      </ol>
    </section>
  );
}
