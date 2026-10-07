export type ImageEntry = {
  src: string;
  title: string;
  pageUrl: string;
  caption?: string;
};

// Fuente única del sitemap de imágenes (SPEC 10).
// - `src` y `pageUrl` son rutas relativas; la ruta las convierte a absolutas
//   con la base https://novacad.com.mx.
// - Las 9 de servicios son copia de `ServiceItem.image` + `ServiceItem.href`
//   de `data/services.ts`; si ese archivo añade o renombra `image`/`href`,
//   actualizar esta lista.
// - Los 7 posters son copia de `VideoMeta.poster` de `data/videos.ts` con
//   `pageUrl` `/videos/[id]`; el `title` es el mismo del video.
// - Las 6 del home se listan manualmente (no hay fuente tipada).
// - Excluidas a propósito: favicon.png, webclip.png, whatsapp.svg,
//   n-icono-*, n-2-icono-*, estrellas.png, icono_persona.png y duplicados
//   `.webp`/`slide` del mismo encuadre (una variante por imagen).

export const images: ImageEntry[] = [
  // Home (/)
  {
    src: "/images/Portada-Novacad-0.jpg",
    title: "Laboratorio dental CAD/CAM NOVACAD | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/fotografia-lab-01.jpg",
    title: "Interior del laboratorio dental NOVACAD | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/fotografia-lab-03-2.jpg",
    title: "Equipo CAD/CAM del laboratorio NOVACAD | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/bg-logo-novacad-publish.jpg",
    title: "NOVACAD Laboratorio Dental CAD/CAM | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/n-protesis-CAD-CAM.jpg",
    title: "Prótesis dental fabricada con CAD/CAM | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/n-protesis-fija.jpg",
    title: "Prótesis dental fija sobre implantes | NOVACAD",
    pageUrl: "/",
  },
  // Servicios (derivadas de `ServiceItem.alt` + " | NOVACAD")
  {
    src: "/images/zirconia.jpg",
    title: "Prótesis dental de zirconia | NOVACAD",
    pageUrl: "/servicios/zirconia",
  },
  {
    src: "/images/emax.jpg",
    title: "Restauración dental E-Max | NOVACAD",
    pageUrl: "/servicios/e-max",
  },
  {
    src: "/images/pmma.jpg",
    title: "Prótesis provisional dental de PMMA | NOVACAD",
    pageUrl: "/servicios/pmma",
  },
  {
    src: "/images/resina-provisional.jpg",
    title: "Prótesis provisional de resina híbrida | NOVACAD",
    pageUrl: "/servicios/resina-hibrida",
  },
  {
    src: "/images/diseno-de-sonrisa.jpg",
    title: "Planificación digital para diseño de sonrisa | NOVACAD",
    pageUrl: "/servicios/diseno-de-sonrisa",
  },
  {
    src: "/images/mock-up.jpg",
    title: "Mock up para tratamiento dental estético | NOVACAD",
    pageUrl: "/servicios/mock-up",
  },
  {
    src: "/images/guarda.jpg",
    title: "Guarda oclusal dental | NOVACAD",
    pageUrl: "/servicios/guardas-oclusales",
  },
  {
    src: "/images/Otros-Alineadores.jpg",
    title: "Alineadores dentales transparentes | NOVACAD",
    pageUrl: "/servicios/alineadores",
  },
  {
    src: "/images/guia.jpg",
    title: "Guía quirúrgica dental personalizada | NOVACAD",
    pageUrl: "/servicios/guias-quirurgicas",
  },
  // Posters de video (mismo `title` del video correspondiente)
  {
    src: "/images/n-img-video-1.jpg",
    title: "Corona de zirconia: del diseño CAD al fresado | NOVACAD",
    pageUrl: "/videos/procedimiento-1",
  },
  {
    src: "/images/n-img-video-2.jpg",
    title: "Restauración E-max: ajuste y caracterización | NOVACAD",
    pageUrl: "/videos/procedimiento-2",
  },
  {
    src: "/images/n-img-video-3.jpg",
    title: "Escaneo intraoral digital y diseño CAD/CAM dental | NOVACAD",
    pageUrl: "/videos/procedimiento-3",
  },
  {
    src: "/images/n-img-video-4.jpg",
    title: "Fresado CAD/CAM de estructuras dentales | NOVACAD",
    pageUrl: "/videos/procedimiento-4",
  },
  {
    src: "/images/n-img-video-5.jpg",
    title: "Acabado y pulido de restauraciones dentales | NOVACAD",
    pageUrl: "/videos/procedimiento-5",
  },
  {
    src: "/images/n-img-video-6.jpg",
    title:
      "Alineadores y guardas oclusales: termoformado dental de alta precisión | NOVACAD",
    pageUrl: "/videos/procedimiento-6",
  },
  {
    src: "/images/n-img-video.jpg",
    title: "9 de Febrero - Día del Odontólogo",
    pageUrl: "/videos/procedimiento-7",
  },
  // Resina híbrida permanente (detailImage)
  {
    src: "/images/nuevo-producto/page-resina-hibrida.jpg",
    title: "Resina híbrida permanente NOVACAD | NOVACAD",
    pageUrl: "/servicios/resina-hibrida",
  },
];
