import Image from "next/image";
import type { Procedure } from "@/data/procedures";

type GalleryProps = {
  items: Procedure[];
  activeId: string;
  onSelect: (procedure: Procedure) => void;
};

export default function Gallery({ items, activeId, onSelect }: GalleryProps) {
  return (
    <div className="w-[90vw] lg:w-[30vw]">
      <h3 className="hidden rounded-t-[20px] bg-gradient-to-b from-[#2e3891] to-[#0092dd] px-4 py-2.5 text-center text-[25px] text-white lg:block">
        Galería Instagram, TikTok
      </h3>
      <ul className="list-none space-y-5 p-0 lg:h-[418px] lg:overflow-y-auto lg:pt-0.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-label={`Ver ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                className="flex min-h-[120px] w-[85vw] rounded-[10px] text-left focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:outline-none lg:w-[29vw]"
              >
                <span className="relative h-[120px] w-[40vw] shrink-0 overflow-hidden rounded-l-[10px] bg-black lg:w-[13vw]">
                  <Image
                    src={item.poster}
                    alt={`Miniatura del ${item.title}`}
                    fill
                    sizes="(max-width: 991px) 40vw, 13vw"
                    className="object-contain"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-[#555]"
                  >
                    <span className="ml-1 block h-0 w-0 border-y-[9px] border-l-[14px] border-y-transparent border-l-current" />
                  </span>
                </span>
                <span className="flex min-h-[120px] w-[43vw] flex-col justify-center rounded-r-[10px] bg-[#f5f5f5] px-5 lg:w-[16vw] lg:px-2.5">
                  <strong className="mb-[15px] text-base font-bold">{item.description}</strong>
                  <span>NOVACAD{isActive ? " (en reproducción)" : ""}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
