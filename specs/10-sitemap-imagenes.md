# SPEC 10 — Sitemap de imágenes para Google Imágenes y Search Console

> **Status:** Approved
> **Depends on:** SPEC 04, SPEC 09
> **Date:** 2026-10-07
> **Objective:** Crear el sitemap de imágenes (`image-sitemap.xml`) con la lista curada de imágenes del sitio agrupada por página para acelerar su descubrimiento e indexación en Google Imágenes vía Search Console.

## Scope

**In:**

- Archivo `data/images.ts` (nuevo): fuente única con un registro por imagen curada (`src`, `title`, `pageUrl`, `caption` opcional), en `es-MX`.
- Ruta `app/image-sitemap.xml/route.ts` (nueva): XML dedicado con namespace `image:` (`image:loc`, `image:title`), agrupado por página (`<url><loc>page</loc><image:image>...`), URLs absolutas bajo `https://novacad.com.mx`.
- Lista curada de ~20 imágenes con valor de búsqueda: fotos de servicios (derivadas de `data/services.ts`), posters de video (derivadas de `data/videos.ts`), fotos de laboratorio y hero del home, más la imagen OG `bg-logo-novacad-publish.jpg`.
- Registro del tercer sitemap en `app/robots.ts`: añadir `https://novacad.com.mx/image-sitemap.xml` al array `sitemap` existente (sin sitemap-index).
- Verificación manual documentada: `curl` al sitemap, validación XML y envío en Search Console (Sitemaps → Añadir sitemap).

**Out of scope (for future specs):**

- `ImageObject` JSON-LD en las páginas.
- `image:caption`, `image:license` y `image:geo_location` (solo `loc` + `title` en este spec).
- Incluir iconos, logos pequeños, favicons, SVG y webp duplicados solo-decorativos.
- `sitemap-index.xml` o consolidación de los 3 sitemaps.
- Thumbnails nuevas o re-generadas y cambios en `app/sitemap.ts`, `video-sitemap.xml` o el resto del home.
- Nuevas dependencias, cambios en `next.config.ts` o en el dominio canónico.

## Data model

```ts
// data/images.ts — nuevo, fuente única del sitemap de imágenes
type ImageEntry = {
  src: string;      // ej: "/images/zirconia.jpg" (ruta en public/, sin dominio)
  title: string;    // ej: "Corona dental de zirconia fresada con CAD/CAM | NOVACAD" (es-MX, único)
  pageUrl: string;  // ej: "/servicios/zirconia" (página donde aparece la imagen)
  caption?: string; // opcional, reservado para spec futura (no se emite en este spec)
};

// URLs absolutas derivadas (base https://novacad.com.mx):
// pageLoc:  https://novacad.com.mx + pageUrl
// imageLoc: https://novacad.com.mx + src

// app/image-sitemap.xml/route.ts — forma por página (extracto)
// <url>
//   <loc>https://novacad.com.mx/servicios/zirconia</loc>
//   <image:image>
//     <image:loc>https://novacad.com.mx/images/zirconia.jpg</image:loc>
//     <image:title>Corona dental de zirconia fresada con CAD/CAM | NOVACAD</image:title>
//   </image:image>
// </url>
```

Convenciones:

- `src` y `pageUrl` son rutas relativas; la ruta las convierte a absolutas con la base `https://novacad.com.mx` (mismo patrón que `video-sitemap.xml/route.ts`).
- `title` es único por imagen, en español (`es-MX`), sin HTML ni entidades sin escapar; la ruta aplica el mismo `escapeXml` del sitemap de video.
- Las imágenes de servicios se derivan de `ServiceItem.image` + `ServiceItem.href` de `data/services.ts`; los posters de `VideoMeta.poster` + `/videos/[id]` de `data/videos.ts`; las del home se listan manualmente (no hay fuente tipada).
- La lista curada excluye: `favicon.png`, `webclip.png`, `whatsapp.svg`, `n-icono-*`, `n-2-icono-*`, `estrellas.png`, `icono_persona.png` y duplicados `.webp`/`slide` del mismo encuadre (se conserva una variante por imagen).

Lista curada propuesta (el usuario la corrige al revisar el spec):

| pageUrl | src | title propuesto |
|---|---|---|
| `/` | `/images/Portada-Novacad-0.jpg` | Laboratorio dental CAD/CAM NOVACAD \| NOVACAD |
| `/` | `/images/fotografia-lab-01.jpg` | Interior del laboratorio dental NOVACAD \| NOVACAD |
| `/` | `/images/fotografia-lab-03-2.jpg` | Equipo CAD/CAM del laboratorio NOVACAD \| NOVACAD |
| `/` | `/images/bg-logo-novacad-publish.jpg` | NOVACAD Laboratorio Dental CAD/CAM \| NOVACAD |
| `/` | `/images/n-protesis-CAD-CAM.jpg` | Prótesis dental fabricada con CAD/CAM \| NOVACAD |
| `/` | `/images/n-protesis-fija.jpg` | Prótesis dental fija sobre implantes \| NOVACAD |
| `/servicios/*` | 9 × `ServiceItem.image` de `data/services.ts` | Derivado de `ServiceItem.alt` + `\| NOVACAD` |
| `/videos/[id]` | 7 × `VideoMeta.poster` de `data/videos.ts` | Mismo `title` del video correspondiente |
| `/servicios/resina-hibrida` | `/images/nuevo-producto/page-resina-hibrida.jpg` | Resina híbrida permanente NOVACAD \| NOVACAD |

## Implementation plan

1. **Crear `data/images.ts` con la lista curada.** Un registro por imagen con `src`, `title`, `pageUrl` (y `caption` solo si el usuario lo pide). Verificación: `npx tsc --noEmit` pasa y cada `src` existe en `public/`.
2. **Crear `app/image-sitemap.xml/route.ts`.** Agrupa por `pageUrl`, emite `<urlset>` con `xmlns:image`, reutiliza el patrón `escapeXml` del sitemap de video y responde `Content-Type: text/xml`. Verificación: `npm run dev`, `curl http://localhost:3000/image-sitemap.xml` lista cada página con sus `image:loc` absolutos.
3. **Registrar el sitemap en `app/robots.ts`.** Añadir `https://novacad.com.mx/image-sitemap.xml` al array `sitemap` existente. Verificación: `curl http://localhost:3000/robots.txt` contiene los 3 sitemaps.
4. **Verificación técnica y envío a Search Console.** `npm run lint`, `npm run build`; validar el XML (parse + namespaces) y enviar `image-sitemap.xml` en Search Console (Sitemaps → Añadir). Verificación: `✓ Compiled successfully`, Search Console acepta el sitemap sin errores.

## Acceptance criteria

- [ ] `data/images.ts` existe con ~20 registros curados, cada uno con `src` (existe en `public/`), `title` único en español y `pageUrl` válido.
- [ ] `GET /image-sitemap.xml` retorna 200 con `Content-Type: text/xml` y `<urlset>` con namespaces `sitemap/0.9` e `image`.
- [ ] Cada `<url>` contiene un `<loc>` de página absoluto bajo `https://novacad.com.mx` y 1+ `<image:image>` con `image:loc` absoluto e `image:title` no vacío.
- [ ] Ningún `image:loc` apunta a iconos, favicons, SVG ni a rutas fuera de `https://novacad.com.mx`.
- [ ] `GET /robots.txt` lista los 3 sitemaps: `sitemap.xml`, `video-sitemap.xml` e `image-sitemap.xml`.
- [ ] Ninguna imagen del sitemap responde 404 ni redirección (`curl` 200 directo en una muestra de 5).
- [ ] `npm run lint` pasa y `npm run build` compila con `✓ Compiled successfully`.
- [ ] El XML parsea sin errores y Search Console acepta `image-sitemap.xml` como sitemap enviado.

## Decisions

- **Sí:** ruta XML dedicada `app/image-sitemap.xml/route.ts` con namespace `image:`. `MetadataRoute.Sitemap` no soporta el namespace `image:`; el patrón de ruta dedicada ya funciona para video (SPEC 09).
- **No:** extender `app/sitemap.ts` con tags `image:`. Más simple pero sin soporte tipado ni garantía de emisión del namespace.
- **Sí:** lista curada de ~20 imágenes con valor de búsqueda. Incluir las ~60 diluye la señal (Google ignora iconos/logos) y mete ruido en Search Console.
- **No:** todas las imágenes de `public/images`. Incluye favicons, SVG, iconos sociales y duplicados webp sin valor de indexación.
- **Sí:** `data/images.ts` como fuente única. Mismo patrón que `data/videos.ts` (SPEC 09): auditable, tipado y desacoplado de la ruta.
- **No:** derivar todo sin archivo nuevo. Ahorra un archivo pero deja las imágenes del home sin fuente y los titles sin lugar donde vivir.
- **Sí:** `loc` + `title` por imagen. Título en español da contexto a Google Imágenes sin el coste de redactar captions y licencias.
- **No:** solo `loc` ni paquete completo con `caption`/`license`. Solo-`loc` pierde contexto; completo exige textos legales que no existen.
- **Sí:** agrupación por página (`<url>` = página con sus imágenes). Es como Google correlaciona imagen y contenido para rankear.
- **No:** una entrada por imagen. Pierde el contexto página→imagen.
- **Sí:** tercer sitemap en `robots.ts`, sin sitemap-index. No rompe lo que ya funciona (2 sitemaps actuales) y Search Console acepta varios sitemaps.
- **No:** `sitemap-index.xml`. Más estándar a escala pero obliga a migrar los 2 sitemaps existentes.
- **Sí:** titles propuestos por el asistente y corregidos por el usuario (patrón SPEC 09). Bloquear el spec a recibir los textos retrasa sin necesidad.
- **No:** `ImageObject` JSON-LD en este spec. Va en su propia spec si se necesita; aquí solo sitemap XML.

## Risks

| Risk | Mitigation |
|---|---|
| `data/services.ts` añade o renombra `image`/`href` y el sitemap queda desincronizado | Documentar en `data/images.ts` que las 9 de servicios son copia; en la implementación, verificar con `grep` que cada `src` existe en `public/` y cada `pageUrl` en `app/sitemap.ts` |
| `title` con `&`, `<` o comillas rompe el XML | Reutilizar `escapeXml` de `video-sitemap.xml/route.ts`; validar parseando el XML en la verificación final |
| Imagen listada responde 404 o redirect (Google la descarta) | Criterio de aceptación exige `curl` 200 directo en muestra de 5; no añadir `Disallow` que afecte `/images/` |
| Duplicados `.jpg` + `.webp` del mismo encuadre se indexan como duplicadas | Conservar una variante por imagen en la lista curada; la otra sigue servida en la web pero fuera del sitemap |

## What is **not** in this spec

- `ImageObject` JSON-LD, `image:caption` / `image:license` / `image:geo_location`, iconos y favicons en el sitemap, `sitemap-index.xml`, thumbnails nuevas, cambios en `app/sitemap.ts` o `video-sitemap.xml`, nuevas dependencias y cambios en `next.config.ts` o el dominio canónico. Cada uno, si se necesita, va en su propia spec.
