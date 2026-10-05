import Image from "next/image";

const veviUrl = "https://www.vevidental.com/novacad";
const workOrderUrl = "/PDF/orden-de-trabajo-novacad.pdf";

export default function Gestiona() {
  return (
    <section id="gestiona" aria-label="Gestiona tu trabajo">
      <div className="flex h-63.25 items-center justify-center bg-[url('/images/fotografia-lab-03-2.jpg')] bg-cover bg-center px-[5vw] lg:h-[30vh] lg:min-h-55 lg:max-h-80 lg:px-[10vw]">
        <a
          href={veviUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-[75vw] flex-col items-start text-white lg:w-auto lg:flex-row lg:items-center lg:rounded-[30px] lg:border lg:border-white lg:bg-white/25 lg:px-5 lg:py-2.5 lg:shadow-0_2px_7px_rgb(0_0_0_/_0.45)"
        >
          <span className="mb-2.5 w-57.5 text-[35px] leading-10 font-bold text-shadow-0_1px_2px_rgb(0_0_0_/_0.75) lg:mb-0 lg:w-auto lg:px-5 lg:text-[30px] lg:text-brand-deep lg:text-shadow-none">
            Gestiona tu trabajo
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </span>
          <span className="ml-22.5 self-start rounded-[20px] bg-white px-5 py-2.5 shadow-0_2px_6px_rgb(0_0_0_/_0.28) lg:ml-0 lg:self-center">
            <Image src="/images/logo_vevi_dental.png" alt="Vevi Dental" width={367} height={130} className="h-10 w-auto" />
          </span>
        </a>
      </div>
      <div className="flex h-34.75 items-center justify-center gap-5 bg-white px-[5vw] lg:h-32.5">
        <h2 className="text-[26px] leading-9 font-medium">Mándanos tu caso</h2>
        <a
          href={workOrderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[14px] bg-brand-blue px-4 py-2 text-center text-[18px] leading-5.5 text-white lg:ml-0"
        >
          Orden de trabajo
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </div>
    </section>
  );
}
