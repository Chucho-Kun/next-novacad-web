import Image from "next/image";

const firstRow = [1, 2, 3];
const secondRow = [4, 5];

function PackagingImage({ number }: { number: number }) {
  return (
    <Image
      src={`/images/n-img-como-empacar-${number}.svg`}
      alt={`Paso ${number} para empacar un caso dental`}
      width={500}
      height={500}
      unoptimized
      className="h-auto w-[25vw] lg:w-[20vw] 2xl:w-[17vw]"
    />
  );
}

export default function ComoEmpacar() {
  return (
    <section id="como-empacar" className="bg-brand-soft px-[5vw] py-[50px] lg:px-[10vw]">
      <h2 className="text-center text-[30px] leading-9 font-normal lg:text-[28px] lg:font-medium">Como empacar</h2>
      <div className="mx-auto mt-10 flex w-[80vw] items-end justify-between">
        {firstRow.map((number) => (
          <PackagingImage key={number} number={number} />
        ))}
      </div>
      <div className="mx-auto mt-10 flex w-[65vw] items-end justify-between lg:w-[80vw] lg:justify-around">
        {secondRow.map((number) => (
          <PackagingImage key={number} number={number} />
        ))}
      </div>
    </section>
  );
}
