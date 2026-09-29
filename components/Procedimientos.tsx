import VideoPlaylist from "@/components/VideoPlaylist";

export default function Procedimientos() {
  return (
    <section id="galeria" className="flex flex-col items-center bg-white px-[5vw] py-12.5 lg:py-25">
      <h2 className="mb-7.5 text-center text-[30px] leading-9 font-normal lg:mb-0 lg:sr-only">Procedimientos</h2>
      <VideoPlaylist />
    </section>
  );
}
