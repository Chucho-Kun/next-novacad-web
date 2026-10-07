# SPEC 09 — Página de videos cortos con SEO para Google Videos

> **Status:** Approved
> **Depends on:** SPEC 04
> **Date:** 2026-10-07
> **Objective:** Crear la sección `/videos` con galería y ficha individual por video, con `VideoObject`, sitemap de video y metadatos únicos, para indexar los 7 MP4 verticales en Google Videos.

## Scope

**In:**

- Ruta `/videos` (`app/videos/page.tsx`, Server Component): galería en retícula de 7 tarjetas verticales 9:16, cada tarjeta con thumbnail (`poster` JPG existente), título, duración visible y enlace a su ficha `/videos/[id]`.
- Ruta `/videos/[id]` (`app/videos/[id]/page.tsx`, estática vía `generateStaticParams` con los 7 ids de `data/procedures.ts`): ficha con reproductor `<video>` nativo self-hosted, título, descripción, breadcrumb visible (Inicio → Videos → [Video]) y `VideoObject` + `BreadcrumbList` vía `components/JsonLd.tsx`.
- Modelo `data/videos.ts` (nuevo): un registro por video con `id`, `title`, `description`, `src`, `poster`, `duration` (ISO 8601, ej. `PT45S`) y `uploadDate` (ISO 8601 con zona horaria, ej. `2026-09-01T12:00:00-06:00`); títulos y descripciones propuestos en este spec, únicos por video y en `es-MX`.
- `generateMetadata` en ambas rutas: `title`, `description`, `alternates.canonical` absoluto (`https://novacad.com.mx/videos`, `https://novacad.com.mx/videos/[id]`), OG/Twitter con el `poster` como imagen y `og:video` apuntando al MP4 (`contentUrl` absoluta).
- `VideoObject` por ficha con propiedades requeridas por Google (`name`, `thumbnailUrl`, `uploadDate`) más recomendadas (`description`, `duration`, `contentUrl`, `embedUrl` omitido por ser self-hosted sin player propio, `inLanguage: "es-MX"`); `ItemList` de `VideoObject` en la galería.
- Sitemap de video: ruta XML dedicada con namespace `video:` (`video:thumbnail_loc`, `video:content_loc`, `video:title`, `video:description`, `video:duration` en segundos, `video:publication_date`) para las 7 fichas, referenciada desde `app/robots.ts` junto al sitemap general.
- Entradas estándar de `/videos` + 7 fichas en `app/sitemap.ts` (derivadas de `data/videos.ts`, `changeFrequency: "monthly"`, `priority: 0.8` como servicios).
- Enlace visible desde la sección `Procedimientos` (`#galeria` del home) hacia `/videos`, sin cambiar `VideoPlaylist` ni su comportamiento.
- Misma `thumbnailUrl` absoluta en `VideoObject`, sitemap de video, atributo `poster` del `<video>` y `og:video:image`, como exige Google (consistencia entre fuentes).

**Out of scope (for future specs):**

- `Clip` / `hasPart` (momentos clave) y `SeekToAction`.
- Migración a YouTube o cualquier embed externo (`embedUrl` de terceros).
- Thumbnails nuevas o re-generadas (se reutilizan los 7 JPG existentes).
- Cambios en `VideoPlaylist`, `Gallery` o el resto del home salvo el enlace añadido.
- Subtítulos WebVTT / transcripciones (mejora futura de accesibilidad y SEO).
- `interactionStatistic`, `regionsAllowed`, `expires` (no hay fuente de view counts ni restricciones regionales).
- Nuevas dependencias, cambios en `next.config.ts` o en el dominio canónico.

## Data model

```ts
// data/videos.ts — nuevo, fuente única de la sección
type VideoMeta = {
  id: string;           // ej: "procedimiento-2" (reutiliza ids de data/procedures.ts)
  title: string;        // único por video, ej: "Cómo se fresa una corona de zirconia | NOVACAD"
  description: string;  // única por video, 1-2 frases es-MX
  src: string;          // ej: "/images/procedimientos/novacad-video-2.mp4"
  poster: string;       // ej: "/images/n-img-video-2.jpg"
  duration: string;     // ISO 8601, ej: "PT45S" (medir real con ffprobe al implementar)
  uploadDate: string;   // ISO 8601 con TZ, ej: "2026-09-01T12:00:00-06:00"
};

// URLs absolutas derivadas (base https://novacad.com.mx):
// watchUrl:    https://novacad.com.mx/videos/[id]
// contentUrl:  https://novacad.com.mx + src
// thumbnailUrl: https://novacad.com.mx + poster

// app/videos/[id]/page.tsx — JSON-LD por ficha (vía components/JsonLd.tsx)
const videoLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Cómo se fresa una corona de zirconia | NOVACAD",
  description: "...",
  thumbnailUrl: "https://novacad.com.mx/images/n-img-video-2.jpg",
  uploadDate: "2026-09-01T12:00:00-06:00",
  duration: "PT45S",
  contentUrl: "https://novacad.com.mx/images/procedimientos/novacad-video-2.mp4",
  inLanguage: "es-MX",
};
```

Convenciones:

- `uploadDate` es fecha fija por video (propuesta en este spec, el usuario la corrige), nunca `new Date()` en build.
- `duration` se mide con `ffprobe` al implementar y se registra en `data/videos.ts`; el valor del spec es placeholder.
- `video:duration` del sitemap de video va en segundos (derivado del ISO 8601).
- `app/sitemap.ts` sigue el patrón de SPEC 04: importa el array de `data/videos.ts` igual que `serviceCategories`.

Metadatos propuestos (el usuario los corrige al revisar el spec):

| id | title propuesto | uploadDate propuesta |
|---|---|---|
| procedimiento-1 | Corona de zirconia: del diseño CAD al fresado \| NOVACAD | 2026-09-01T12:00:00-06:00 |
| procedimiento-2 | Restauración E-max: ajuste y caracterización \| NOVACAD | 2026-09-02T12:00:00-06:00 |
| procedimiento-3 | PMMA provisional: fresado de alta precisión \| NOVACAD | 2026-09-03T12:00:00-06:00 |
| procedimiento-4 | Resina híbrida permanente: acabado y pulido \| NOVACAD | 2026-09-04T12:00:00-06:00 |
| procedimiento-5 | Diseño de sonrisa digital: mock-up en laboratorio \| NOVACAD | 2026-09-05T12:00:00-06:00 |
| procedimiento-6 | Alineadores y guardas oclusales: termoformado \| NOVACAD | 2026-09-06T12:00:00-06:00 |
| procedimiento-7 | Guías quirúrgicas: impresión y verificación \| NOVACAD | 2026-09-07T12:00:00-06:00 |

## Implementation plan

1. **Crear `data/videos.ts` con los 7 registros.** Campos `id/src/poster` copiados de `data/procedures.ts`; `title/description/duration/uploadDate` con los valores propuestos. Verificación: `npx tsc --noEmit` pasa.
2. **Medir duraciones reales y fijar fechas.** Con `ffprobe` obtener la duración de cada MP4 y registrarla en ISO 8601; confirmar o corregir cada `uploadDate` con el usuario. Verificación: ningún `duration` es placeholder y ningún video queda sin fecha.
3. **Crear la galería `app/videos/page.tsx`.** Server Component con `generateMetadata` (canonical + OG), retícula de 7 tarjetas 9:16 (thumbnail, título, duración) con enlace a `/videos/[id]` e `ItemList` de `VideoObject` vía `JsonLd`. Verificación: `npm run dev`, `/videos` muestra 7 tarjetas navegables.
4. **Crear la ficha `app/videos/[id]/page.tsx`.** `generateStaticParams` con los 7 ids (+ `notFound()` si id inválido), reproductor `<video controls preload="metadata" poster>`, título, descripción, breadcrumb visible, canonical/OG por ficha y `VideoObject` + `BreadcrumbList` vía `JsonLd`. Verificación: cada `/videos/[id]` reproduce su video y su view-source contiene 2 bloques JSON-LD parseables.
5. **Añadir sitemap de video y extender sitemap/robots.** Ruta XML dedicada con namespace `video:` para las 7 fichas; añadir `/videos` + fichas a `app/sitemap.ts`; añadir la URL del sitemap de video en `app/robots.ts`. Verificación: `curl` al sitemap de video lista 7 `<video:video>` con `thumbnail_loc` y `content_loc` absolutos.
6. **Enlazar desde el home.** Añadir enlace visible a `/videos` en `components/Procedimientos.tsx`, sin tocar `VideoPlaylist`. Verificación: la `#galeria` muestra el enlace y el playlist funciona igual.
7. **Verificación técnica y de SEO final.** `npm run lint`, `npm run build`; validar JSON-LD con Rich Results Test / Schema Validator; comprobar que `thumbnailUrl` es idéntica en VideoObject, sitemap de video, `poster` y OG. Verificación: `✓ Compiled successfully`, 0 errores de validación estructurada.

## Acceptance criteria

- [ ] `GET /videos` retorna 200 y muestra 7 tarjetas verticales con thumbnail, título y duración, cada una enlazando a `/videos/[id]`.
- [ ] Cada `/videos/[id]` (7 fichas) retorna 200, reproduce su MP4 con `<video controls poster>` y expone canonical absoluto `https://novacad.com.mx/videos/[id]`.
- [ ] Cada ficha contiene un `VideoObject` válido con `name`, `thumbnailUrl`, `uploadDate` (ISO 8601 con TZ), `description`, `duration` (ISO 8601), `contentUrl` (MP4 absoluto) e `inLanguage: es-MX`, más `BreadcrumbList` (Inicio → Videos → [Video]).
- [ ] `name`, `description` y `thumbnailUrl` son únicos por video en los 7 registros.
- [ ] Existe un sitemap de video con namespace `video:` y 7 entradas con `thumbnail_loc`, `content_loc`, `title`, `description`, `duration` (segundos) y `publication_date`, referenciado en `/robots.txt`.
- [ ] `GET /sitemap.xml` incluye `/videos` y las 7 fichas con URLs absolutas bajo `https://novacad.com.mx`.
- [ ] La `thumbnailUrl` es idéntica en `VideoObject`, sitemap de video, atributo `poster` y OG de cada video.
- [ ] La sección `#galeria` del home conserva su funcionamiento y muestra un enlace visible a `/videos`.
- [ ] `npm run lint` pasa y `npm run build` compila con `✓ Compiled successfully`.
- [ ] View-source de `/videos` y de una ficha contiene bloques JSON-LD parseables con `JSON.parse`, sin `</script>` sin escapar.

## Decisions

- **Sí:** galería + ficha individual por video. Google exige que el `VideoObject` viva en la página donde se ve el video (watch page); la ficha es la unidad indexable y la galería el índice navegable.
- **No:** solo galería con `ItemList`. Más simple pero Google indexa peor el video individual y no hay watch page dedicada por video.
- **Sí:** ruta `/videos`. Corta, en español, fácil de enlazar; `/galeria-videos` y `/procedimientos/videos` descartadas por longitud y profundidad innecesaria.
- **Sí:** self-hosted con `contentUrl` al MP4. Los archivos ya viven en `public/images/procedimientos/` con URLs estables; es la vía que Google prefiere para descubrir el contenido. Migración a YouTube descartada.
- **No:** `embedUrl` de terceros. Sin player propio ni embeds externos, no aplica.
- **Sí:** reutilizar los 7 JPG como `thumbnailUrl`. Ya existen, son estables y accesibles por URL absoluta; thumbnails nuevas van en spec futura si se necesitan.
- **Sí:** paquete SEO completo (VideoObject + ItemList + BreadcrumbList + canonical/OG por ficha + sitemap de video). Solo-JSON-LD descartado porque el sitemap de video acelera el descubrimiento.
- **Sí:** metadatos propuestos por el asistente y corregidos por el usuario. Los actuales (`"This is some text inside"`) no son indexables; bloquear la implementación a recibir los textos reales retrasaría sin necesidad.
- **Sí:** `uploadDate` fija por video. `new Date()` en build (patrón de SPEC 04 para `lastModified`) es incorrecto aquí: Google usa la fecha como señal de publicación original.
- **No:** `Clip`/`hasPart`, subtítulos WebVTT, `interactionStatistic`. Sin fuente de datos (momentos, transcripciones, view counts); cada uno va en su propia spec si se necesita.
- **Definición rápida sin documentación externa exhaustiva.** El usuario pidió revisar docs de Google; se verificaron los requisitos vigentes de Search Central (requeridas: `name`, `thumbnailUrl`, `uploadDate`; recomendadas: `description`, `duration`, `contentUrl`) vía búsqueda web en lugar de `/superpowers`, no disponible en este entorno.

## Risks

| Risk | Mitigation |
|---|---|
| Videos de menos de 30 segundos pierden elegibilidad para algunas funciones de video de Google | Medir duraciones con `ffprobe` en el paso 2; si algún short dura <30s, documentarlo en el spec y mantenerlo (sigue siendo indexable como página, sin rich features) |
| `duration` o `uploadDate` placeholder llegan a producción | El paso 2 exige medir/confirmar antes de seguir; criterio de aceptación bloquea placeholders |
| `MetadataRoute.Sitemap` de Next.js no soporta el namespace `video:` | Sitemap de video como ruta XML dedicada (`Response` con `text/xml`), no dentro de `app/sitemap.ts`; solo las URLs estándar van en `app/sitemap.ts` |
| `procedimiento-7` usa poster singular (`n-img-video.jpg`) distinto al patrón numerado | Mapeo explícito en `data/videos.ts`; verificar que el archivo existe y responde 200 |
| Thumbnail o MP4 bloqueados para Googlebot (robots, redirects, URLs inestables) | No añadir `Disallow` que afecte `/images/`; URLs fijas en `public/`; verificar con `curl` que responden 200 sin cadena de redirects |

## What is **not** in this spec

- Momentos clave (`Clip`/`hasPart`, `SeekToAction`), subtítulos o transcripciones, migración a YouTube, thumbnails nuevas, cambios en `VideoPlaylist`/`Gallery` o el resto del home, `interactionStatistic`/`regionsAllowed`, nuevas dependencias y cambios en `next.config.ts` o el dominio canónico. Cada uno, si se necesita, va en su propia spec.
