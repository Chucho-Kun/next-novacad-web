export type VideoMeta = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  duration: string;
  uploadDate: string;
};

export const videos: VideoMeta[] = [
  {
    id: "procedimiento-1",
    title: "Corona de zirconia: del diseño CAD al fresado | NOVACAD",
    description:
      "Del diseño CAD al fresado: así se fabrica una corona de zirconia con precisión micrométrica en el laboratorio NOVACAD.",
    src: "/images/procedimientos/novacad-video-1.mp4",
    poster: "/images/n-img-video-1.jpg",
    duration: "PT37S",
    uploadDate: "2026-09-01T12:00:00-06:00",
  },
  {
    id: "procedimiento-2",
    title: "Restauración E-max: ajuste y caracterización | NOVACAD",
    description:
      "Ajuste y caracterización de una restauración E-max para lograr estética natural y función precisa.",
    src: "/images/procedimientos/novacad-video-2.mp4",
    poster: "/images/n-img-video-2.jpg",
    duration: "PT12S",
    uploadDate: "2026-09-02T12:00:00-06:00",
  },
  {
    id: "procedimiento-3",
    title: "Escaneo intraoral digital y diseño CAD/CAM dental | NOVACAD",
    description:
      "Tecnología de escaneo intraoral y diseño CAD para planificar restauraciones dentales con alta precisión y ajuste.",
    src: "/images/procedimientos/novacad-video-3.mp4",
    poster: "/images/n-img-video-3.jpg",
    duration: "PT18S",
    uploadDate: "2026-09-03T12:00:00-06:00",
  },
  {
    id: "procedimiento-4",
    title: "Fresado CAD/CAM de estructuras dentales | NOVACAD",
    description:
      "Fabricación de estructuras dentales mediante fresado CAD/CAM de alta precisión para lograr resultados exactos y un ajuste óptimo.",
    src: "/images/procedimientos/novacad-video-4.mp4",
    poster: "/images/n-img-video-4.jpg",
    duration: "PT23S",
    uploadDate: "2026-09-04T12:00:00-06:00",
  },
  {
    id: "procedimiento-5",
    title: "Acabado y pulido de restauraciones dentales | NOVACAD",
    description:
      "Trabajo de precisión sobre materiales dentales de tonalidad natural para lograr un acabado, forma y apariencia estética óptimos.",
    src: "/images/procedimientos/novacad-video-5.mp4",
    poster: "/images/n-img-video-5.jpg",
    duration: "PT17S",
    uploadDate: "2026-09-05T12:00:00-06:00",
  },
  {
    id: "procedimiento-6",
    title: "Alineadores y guardas oclusales: termoformado dental de alta precisión | NOVACAD",
    description:
      "Proceso de termoformado dental para adaptar materiales termoplásticos al modelo con precisión, ajuste y acabado uniforme.",
    src: "/images/procedimientos/novacad-video-6.mp4",
    poster: "/images/n-img-video-6.jpg",
    duration: "PT21S",
    uploadDate: "2026-09-06T12:00:00-06:00",
  },
  {
    id: "procedimiento-7",
    title: "9 de Febrero - Día del Odontólogo",
    description:
      "Gracias por su confianza y por permitirnos formar parte de su trabajo diario",
    src: "/images/procedimientos/novacad-video-7.mp4",
    poster: "/images/n-img-video.jpg",
    duration: "PT8S",
    uploadDate: "2026-09-07T12:00:00-06:00",
  },
];
