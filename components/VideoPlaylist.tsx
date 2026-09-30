"use client";

import { useState } from "react";
import Gallery from "@/components/Gallery";
import { procedures } from "@/data/procedures";

export default function VideoPlaylist() {
  const [activeProcedure, setActiveProcedure] = useState(procedures[0]);

  return (
    <div className="flex flex-col items-center gap-0 lg:flex-row lg:items-start lg:gap-[3vw]">
      <figure className="m-0 flex flex-col items-center">
        <div className="flex h-[476px] w-[90vw] items-center justify-center bg-black lg:w-[47vw]">
          <video
            key={activeProcedure.src}
            controls
            preload="auto"
            poster={activeProcedure.poster}
            aria-label={activeProcedure.title}
            aria-describedby="procedimiento-actual-descripcion"
            className="h-[476px] w-[267px] object-contain"
          >
            <source src={activeProcedure.src} type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
        <figcaption id="procedimiento-actual-descripcion" aria-live="polite" className="sr-only">
          {activeProcedure.title}. {activeProcedure.description}. Si necesitas una
          transcripción de este video, escríbenos a novacad.social@gmail.com.
        </figcaption>
      </figure>
      <Gallery
        items={procedures.slice(0, 6)}
        activeId={activeProcedure.id}
        onSelect={setActiveProcedure}
      />
    </div>
  );
}
