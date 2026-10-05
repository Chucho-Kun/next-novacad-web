import Image from "next/image";
import type { Procedure } from "@/data/procedures";

type GalleryProps = {
  items: Procedure[];
  activeId: string;
  onSelect: (procedure: Procedure) => void;
};

export default function Gallery({ items, activeId, onSelect }: GalleryProps) {
  return (
    <div className="w-[90vw] lg:flex lg:h-119 lg:w-[30vw] lg:flex-col">
      <h3 className="rounded-lg bg-brand-blue px-4 py-1 text-center text-[25px] text-white">
        Galería
      </h3>
      <ul className="grid list-none grid-cols-3 gap-3 bg-white p-3 lg:min-h-0 lg:flex-1 lg:grid-rows-2 lg:gap-4 lg:overflow-y-auto lg:p-0.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="lg:min-h-0">
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-label={`Ver ${item.title}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex w-full flex-col overflow-hidden rounded-[10px] bg-neutral-100 text-left opacity-100 focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:outline-none lg:h-full lg:transition-opacity lg:duration-200 ${isActive ? "lg:opacity-100" : "lg:opacity-80 lg:hover:opacity-100"}`}
              >
                <span className="relative aspect-9/16 w-full shrink-0 overflow-hidden bg-black lg:min-h-0 lg:flex-1 lg:aspect-auto">
                  <Image
                    src={item.poster}
                    alt={`Miniatura del ${item.title}`}
                    fill
                    sizes="(max-width: 1023px) 28vw, 10vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/75 text-[#555]"
                  >
                    <span className="ml-0.5 block h-0 w-0 border-y-8px border-l-12 border-y-transparent border-l-current" />
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
