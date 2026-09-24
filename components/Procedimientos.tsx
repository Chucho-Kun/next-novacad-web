import VideoPlaylist from "@/components/VideoPlaylist";

export default function Procedimientos() {
  return (
    <section id="galeria" className="flex flex-col items-center bg-white px-[5vw] py-[50px] lg:py-[100px]">
      <h2 className="mb-[30px] text-center text-[30px] leading-9 font-normal lg:hidden">Procedimientos</h2>
      <VideoPlaylist />
    </section>
  );
}
