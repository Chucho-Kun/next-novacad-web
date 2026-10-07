import Link from "next/link";
import VideoPlaylist from "@/components/VideoPlaylist";

export default function Procedimientos() {
  return (
    <section
      id="galeria"
      aria-labelledby="procedimientos-titulo"
      className="flex flex-col items-center bg-white px-[5vw] py-[50px] lg:py-[100px]"
    >
      <h2 id="procedimientos-titulo" className="mb-[30px] text-center text-[30px] leading-9 font-normal">
        Procedimientos
      </h2>
      <VideoPlaylist />
      <Link
        href="/videos"
        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-[10px] border-2 border-brand-deep bg-white px-8 py-3 text-center text-base font-semibold text-brand-deep transition-colors hover:bg-brand-light focus-visible:outline-brand-deep"
      >
        Ver todos los videos
      </Link>
    </section>
  );
}
