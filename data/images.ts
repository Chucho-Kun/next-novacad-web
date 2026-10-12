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
// - SPEC 11: cada `src` apunta a la variante ganadora de la auditoría WebP
//   (`/images/webp/*.webp`, salvo `nuevo-producto` que usa su propia carpeta).
//   Los 8 ORIGINAL de servicios (zirconia, emax, pmma, resina-provisional,
//   diseno-de-sonrisa, mock-up, guarda, guia) conservan su `.jpg` porque el
//   `.webp` pesa más. Si un archivo cambia en disco, re-medir antes de migrar.

export const images: ImageEntry[] = [
  // Home (/)
  {
    src: "/images/webp/Portada-Novacad-0.webp",
    title: "Laboratorio dental CAD/CAM NOVACAD | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/webp/fotografia-lab-01.webp",
    title: "Interior del laboratorio dental NOVACAD | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/webp/fotografia-lab-03-2.webp",
    title: "Equipo CAD/CAM del laboratorio NOVACAD | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/webp/bg-logo-novacad-publish.webp",
    title: "NOVACAD Laboratorio Dental CAD/CAM | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/webp/n-protesis-CAD-CAM.webp",
    title: "Prótesis dental fabricada con CAD/CAM | NOVACAD",
    pageUrl: "/",
  },
  {
    src: "/images/webp/n-protesis-fija.webp",
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
    src: "/images/webp/Otros-Alineadores.webp",
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
    src: "/images/webp/n-img-video-1.webp",
    title: "Corona de zirconia: del diseño CAD al fresado | NOVACAD",
    pageUrl: "/videos/procedimiento-1",
  },
  {
    src: "/images/webp/n-img-video-2.webp",
    title: "Restauración E-max: ajuste y caracterización | NOVACAD",
    pageUrl: "/videos/procedimiento-2",
  },
  {
    src: "/images/webp/n-img-video-3.webp",
    title: "Escaneo intraoral digital y diseño CAD/CAM dental | NOVACAD",
    pageUrl: "/videos/procedimiento-3",
  },
  {
    src: "/images/webp/n-img-video-4.webp",
    title: "Fresado CAD/CAM de estructuras dentales | NOVACAD",
    pageUrl: "/videos/procedimiento-4",
  },
  {
    src: "/images/webp/n-img-video-5.webp",
    title: "Acabado y pulido de restauraciones dentales | NOVACAD",
    pageUrl: "/videos/procedimiento-5",
  },
  {
    src: "/images/webp/n-img-video-6.webp",
    title:
      "Alineadores y guardas oclusales: termoformado dental de alta precisión | NOVACAD",
    pageUrl: "/videos/procedimiento-6",
  },
  {
    src: "/images/webp/n-img-video.webp",
    title: "9 de Febrero - Día del Odontólogo",
    pageUrl: "/videos/procedimiento-7",
  },
  // Resina híbrida permanente (detailImage)
  {
    src: "/images/nuevo-producto/page-resina-hibrida.webp",
    title: "Resina híbrida permanente NOVACAD | NOVACAD",
    pageUrl: "/servicios/resina-hibrida",
  },
];
