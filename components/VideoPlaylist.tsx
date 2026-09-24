"use client";

import { useState } from "react";
import Gallery from "@/components/Gallery";
import { procedures } from "@/data/procedures";

export default function VideoPlaylist() {
  const [activeProcedure, setActiveProcedure] = useState(procedures[0]);

  return (
    <div className="flex flex-col items-center gap-0 lg:flex-row lg:items-start lg:gap-[3vw]">
      <div className="flex h-[476px] w-[90vw] items-center justify-center bg-black lg:w-[47vw]">
        <video
          key={activeProcedure.src}
          controls
          preload="auto"
          aria-label={activeProcedure.title}
          className="h-[476px] w-[267px] object-contain"
        >
          <source src={activeProcedure.src} type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
      </div>
      <Gallery
        items={procedures.slice(0, 6)}
        activeId={activeProcedure.id}
        onSelect={setActiveProcedure}
      />
    </div>
  );
}
