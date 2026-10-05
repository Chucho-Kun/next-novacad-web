"use client";

import { useState } from "react";
import Gallery from "@/components/Gallery";
import { procedures } from "@/data/procedures";

export default function VideoPlaylist() {
  const [activeProcedure, setActiveProcedure] = useState(procedures[0]);

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-[3vw]">
      <div className="flex min-h-[476px] w-[90vw] items-center justify-center bg-black lg:h-[476px] lg:min-h-0 lg:w-auto">
        <video
          key={activeProcedure.src}
          controls
          preload="metadata"
          aria-label={activeProcedure.title}
          aria-describedby="video-actual-descripcion"
          className="h-[476px] w-[267px] max-w-full object-contain focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:outline-none lg:w-auto lg:max-w-[44vw]"
        >
          <source src={activeProcedure.src} type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
      </div>
      <p id="video-actual-descripcion" className="sr-only" aria-live="polite">
        Reproduciendo: {activeProcedure.title}. Usa los botones de la galería para elegir otro procedimiento.
      </p>
      <Gallery
        items={procedures.slice(0, 6)}
        activeId={activeProcedure.id}
        onSelect={setActiveProcedure}
      />
    </div>
  );
}
