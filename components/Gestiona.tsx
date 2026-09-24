import Image from "next/image";

const veviUrl = "https://www.vevidental.com/novacad";
const workOrderUrl = "https://drive.google.com/file/d/1TmrkULEnk59rYrwj4g8cKrSS9s8Q4UzE/view";

export default function Gestiona() {
  return (
    <section id="gestiona" aria-label="Gestiona tu trabajo">
      <div className="flex h-[253px] items-center justify-center bg-[url('/images/fotografia-lab-03-2.jpg')] bg-cover bg-center px-[5vw] lg:h-[30vh] lg:min-h-[220px] lg:max-h-[320px] lg:px-[10vw]">
        <a
          href={veviUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-[75vw] flex-col items-start text-white lg:w-auto lg:flex-row lg:items-center lg:rounded-[30px] lg:border lg:border-white lg:bg-white/25 lg:px-5 lg:py-2.5 lg:shadow-[0_2px_7px_rgb(0_0_0_/_0.45)]"
        >
          <span className="mb-2.5 w-[230px] text-[35px] leading-10 font-bold text-shadow-[0_1px_2px_rgb(0_0_0_/_0.75)] lg:mb-0 lg:w-auto lg:px-5 lg:text-[30px]">
            Gestiona tu trabajo
          </span>
          <span className="ml-[90px] self-start rounded-[20px] bg-white px-5 py-2.5 shadow-[0_2px_6px_rgb(0_0_0_/_0.28)] lg:ml-0 lg:self-center">
            <Image src="/images/logo_vevi_dental.png" alt="Vevi Dental" width={367} height={130} className="h-10 w-auto" />
          </span>
        </a>
      </div>
      <div className="flex h-[139px] items-center justify-center gap-5 bg-white px-[5vw] lg:h-[130px]">
        <p className="text-[26px] leading-9 font-medium">Mándanos tu caso</p>
        <a
          href={workOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[14px] bg-brand-blue px-4 py-2 text-[18px] leading-[22px] text-white lg:ml-0"
        >
          Orden de trabajo
        </a>
      </div>
    </section>
  );
}
