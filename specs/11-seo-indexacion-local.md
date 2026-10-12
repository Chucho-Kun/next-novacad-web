# SPEC 11 — Mejoras SEO para indexación y posicionamiento local

> **Status:** Approved
> **Depends on:** SPEC 04, SPEC 09, SPEC 10
> **Date:** 2026-10-12
> **Objective:** Acelerar la indexación de las 15 URLs pendientes en Search Console y mejorar el posicionamiento local (Ecatepec, CDMX, Edomex) con quick wins técnicos, schema local enriquecido, FAQ con rich results y guía operativa de GSC/GBP.

## Por qué existe este spec

Search Console (2026-10-12, ver `screenshots/paginas/`) muestra 4 URLs indexadas y 15 en *"Descubierta: actualmente sin indexar"*, sin errores. Google descubrió las URLs vía sitemaps pero no las rastrea: es falta de señales de calidad y de rastreo, no de sitemaps. El sitio además no declara ninguna señal geográfica en metadata ni schema pese a tener Perfil de Empresa verificado en Maps que ya enlaza al sitio. Este spec cierra esas dos brechas en un solo paquete trabajable por fases.

## Scope

**In:**

- Fase A (técnica): subtítulo SEO con keywords+geo en `Hero.tsx` (H1 intacto), portada como `<Image priority>` en vez de fondo CSS, migración JPG/PNG → WebP **por imagen solo si el .webp pesa menos** (ver regla WebP abajo; las actuales pesan más que los JPG), title/description con geo en `app/layout.tsx` (title ≤60 caracteres, description ≤155), OG/Twitter a URLs absolutas, JSON-LD local enriquecido en `app/page.tsx` (teléfono, dirección completa, geo, horarios, `sameAs`, `areaServed`), `lastModified` estable en `app/sitemap.ts`, quitar `host:` de `app/robots.ts`, alts duplicadas de `About.tsx`.
- Fase B (contenido): sección FAQ nueva en el home (`components/Faq.tsx` + `data/faqs.ts`, 6–8 Q&A en es-MX redactadas por el asistente) con `FAQPage` JSON-LD, más refuerzo de copy local en `About`/`Services`/`Contact` sin cambiar el tono.
- Fase C (videos): optimización de carga de los 7 `.mp4` auto-hospedados (`preload`, `poster`, lazy) en `VideoPlaylist.tsx`/`Procedimientos.tsx` sin cambiar de hosting.
- Fase D (operativa, pasos manuales del usuario): guía de solicitud de indexación en GSC (orden de URLs), verificación en Rich Results Test y checklist de GBP (NAP, servicios, reseñas, publicaciones).

**Out of scope (for future specs):**

- Migración de videos a YouTube o embeds externos.
- Blog, nuevas páginas o nuevas rutas.
- `sitemap-index.xml`, cambios en `video-sitemap.xml` / `image-sitemap.xml` o en el dominio canónico.
- `ImageObject` JSON-LD, `image:caption` / `license` / `geo_location`.
- Rediseño del Hero o cambios visuales más allá del subtítulo.
- Campañas de pago, estrategia de backlinks ejecutada por el asistente (solo guía).

## Data model

```ts
// data/faqs.ts — nuevo, fuente de la sección FAQ y del FAQPage JSON-LD
type FaqEntry = {
  question: string; // ej: "¿Qué es una corona de zirconia?"
  answer: string;   // 2-4 frases, es-MX, puede mencionar servicios con enlace
};
```

```jsonc
// Enriquecimiento del Organization JSON-LD en app/page.tsx (extracto)
// "telephone": "+525662682487",
// "address": { "@type": "PostalAddress", "streetAddress": "Cerezo 77A, Boulevares Impala",
//   "addressLocality": "Ecatepec de Morelos", "addressRegion": "Estado de México",
//   "postalCode": "55040", "addressCountry": "MX" },
// "geo": { "@type": "GeoCoordinates", "latitude": 19.5939938, "longitude": -99.0385493 },
// "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification",
//   "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
//   "opens": "09:00", "closes": "18:00" }],
// "sameAs": ["https://www.facebook.com/profile.php?id=61585583129527",
//   "https://www.instagram.com/novacadental/", "https://www.tiktok.com/@novacad.dental"],
// "areaServed": ["Ecatepec de Morelos", "Ciudad de México", "Estado de México"]
```

Convenciones:

- NAP canónico (idéntico en web y GBP): `NOVACAD`, `Cerezo 77A, Boulevares Impala, 55040 Ecatepec de Morelos, Méx.`, `+52 56 6268 2487`.
- Sábados y domingos cerrado: no se emite `OpeningHoursSpecification` para esos días.
- `lastModified` del sitemap principal deja de ser `new Date()` por build; usa **constantes de fecha por grupo de URLs** en `app/sitemap.ts` (home, servicios, videos).
- Regla WebP (auditoría 2026-10-12, bytes medidos): migrar a `.webp` **solo** los archivos donde el webp pesa menos (tabla en el plan, paso 1). Los `src` en `data/services.ts`, `data/videos.ts`, `data/images.ts` y componentes, más los `image:loc` del sitemap de imágenes, deben apuntar a la variante ganadora. Si un .webp pesa más, se conserva el original.
- Regla AGENTS.md: todo cambio de contenido actualiza la constante `lastModified` de su grupo en `app/sitemap.ts` (convención a añadir en `AGENTS.md` al implementar).
- Las Q&A de la FAQ se redactan en es-MX, orientadas a odontólogos (B2B), y el usuario las corrige al revisar el spec.

## Implementation plan

1. **Auditoría de pesos WebP (COMPLETADA 2026-10-12, no re-ejecutar).** Resultado por archivo en uso — gana WebP salvo los 12 marcados `ORIGINAL`:

   | Archivo | Original | WebP | Usar |
   |---|---|---|---|
   | `Portada-Novacad-0.jpg` (Hero) | 158419 | 118784 | webp |
   | `fotografia-lab-01.jpg` | 137194 | 108676 | webp |
   | `fotografia-lab-03-2.jpg` | 383158 | 77472 | webp |
   | `bg-logo-novacad-publish.jpg` (OG) | 79355 | 27212 | webp |
   | `n-protesis-CAD-CAM.jpg` | 112103 | 26880 | webp |
   | `n-protesis-fija.jpg` | 132664 | 33612 | webp |
   | `zirconia.jpg` | 13796 | 14188 | ORIGINAL |
   | `emax.jpg` | 14266 | 17124 | ORIGINAL |
   | `pmma.jpg` | 15417 | 21058 | ORIGINAL |
   | `resina-provisional.jpg` | 13984 | 15472 | ORIGINAL |
   | `diseno-de-sonrisa.jpg` | 28127 | 46062 | ORIGINAL |
   | `mock-up.jpg` | 15011 | 20580 | ORIGINAL |
   | `guarda.jpg` | 19700 | 28404 | ORIGINAL |
   | `Otros-Alineadores.jpg` | 51313 | 27402 | webp |
   | `guia.jpg` | 22778 | 29260 | ORIGINAL |
   | `nuevo-producto/page-resina-hibrida.jpg` | 164324 | 71428 | webp (misma carpeta) |
   | `n-img-video-1..6.jpg` + `n-img-video.jpg` (7 posters) | 11–19K c/u | 3.6–8.7K c/u | webp |
   | `n_logo_blanco_novacad.png` | 7828 | 4714 | webp |
   | `logo_vevi_dental.png` | 8606 | 4846 | webp |
   | Iconos `n-icono-fb/insta/tiktok/wa`, `n-2-icono-*`, `favicon`, `webclip`, `icono_persona`, `Icono-experiencia-clinica` | — | menor | webp |
   | `n-icono-cnc.png`, `n-icono-diamante-teeth.png`, `n-logo-novacad.png`, `estrellas.png` | — | mayor | ORIGINAL |

   Solo las variantes ganadoras entran en los pasos 2–3 y 7. Verificación: esta tabla manda; si un archivo cambia en disco, re-mediar antes de migrar.
2. **Hero: subtítulo SEO + imagen prioritaria.** Añadir bajo el subtítulo existente un subtítulo visible con keywords+geo (*"Laboratorio dental CAD/CAM en Ecatepec, Estado de México — prótesis para odontólogos de CDMX y Edomex"*); migrar `bg-[url(...)]` a `<Image priority fetchPriority="high">` con el mismo encuadre **usando la variante más liviana del paso 1** y replicando el `object-position` responsive (`right` en móvil, `center` en desktop). Verificación: el H1 original intacto, LCP con `fetchpriority="high"` en el HTML, verificación visual contra captura actual.
2. **Metadata con geo + OG absolutas.** Title/description del home con Ecatepec/CDMX/Edomex; `images/bg-...` → `https://novacad.com.mx/images/...` en OG y Twitter. Verificación: `<head>` renderizado con canonical + OG absolutos.
3. **JSON-LD local enriquecido en `app/page.tsx`.** Añadir `telephone`, dirección completa, `geo`, `openingHoursSpecification` (lun–vie 9–18), `sameAs` (FB/IG/TikTok), `areaServed`. Verificación: Rich Results Test sin errores.
4. **Sitemap estable + robots limpio.** `lastModified` estable por URL en `app/sitemap.ts`; quitar `host:` de `app/robots.ts`. Verificación: dos builds seguidos emiten el mismo `lastmod`; `curl /robots.txt` sin campo `host`.
5. **Alts de `About.tsx`.** Diferenciar los dos `alt` duplicados (interior vs equipo). Verificación: `grep` sin alts idénticos en imágenes distintas.
6. **FAQ: `data/faqs.ts` + `components/Faq.tsx` + `FAQPage` JSON-LD.** Sección nueva antes de `Contact` con `id="faq"`, 6–8 Q&A redactadas durante la implementación; refuerzo de copy local acotado a: línea de ubicación en `About`, NAP visible en `Contact`, intro de `Services` (sin reescribir secciones). **Compuerta:** el usuario aprueba las Q&A y los textos en la revisión del diff antes del merge. Verificación: Rich Results Test valida `FAQPage`; `npm run lint` + `npm run build` en verde.
7. **Videos: carga optimizada sin cambiar hosting.** Verificar primero el comportamiento actual de `VideoPlaylist.tsx` (si ya usa `preload="metadata"` + `poster`, este paso se reduce a documentarlo y se salta el cambio); si falta, añadir `preload`, `poster` (variante más liviana del paso 1) y lazy. Verificación: la página Procedimientos no descarga `.mp4` al cargar (DevTools Network).
8. **Guía operativa GSC/GBP (pasos manuales del usuario, documentados al implementar).** Baseline PageSpeed/CWV antes y después; solicitar indexación en orden: `/`, zirconia, e-max, diseño de sonrisa, `/videos`; checklist GBP (NAP idéntico, categorías, servicios con enlace a `/servicios/[slug]`, fotos, 5–10 reseñas, publicaciones). Keywords base a medir cada 2 semanas: *laboratorio dental Ecatepec*, *prótesis de zirconia CDMX*, *prótesis E-max Estado de México*, *diseño de sonrisa Ecatepec*, *guardas oclusales laboratorio dental*. Verificación: GSC marca solicitudes como recibidas.

## Acceptance criteria

- [ ] El H1 (*"Innovación Digital / Sonrisa Natural"*) sigue intacto y hay un subtítulo visible con "laboratorio dental" + "Ecatepec".
- [ ] La portada del Hero se sirve con `<Image priority>` y `fetchpriority="high"` en el HTML.
- [ ] El title/description del home mencionan Ecatepec/CDMX/Edomex y todas las OG/Twitter images son URLs absolutas.
- [ ] El JSON-LD del home incluye `telephone` +525662682487, dirección completa de Ecatepec, `geo` 19.5939938/-99.0385493, horarios lun–vie 9–18 y los 3 `sameAs`.
- [ ] Rich Results Test valida `Organization` y `FAQPage` sin errores.
- [ ] Dos builds consecutivos generan el mismo `lastmod` en `sitemap.xml` y `robots.txt` no contiene `host:`.
- [ ] Cada `src`/`image:loc` apunta a la variante ganadora de la tabla del paso 1; ningún archivo ORIGINAL fue sustituido por un webp más pesado.
- [ ] `AGENTS.md` documenta la convención de actualizar `lastModified` al cambiar contenido.
- [ ] Baseline PageSpeed/CWV registrado antes y después de los cambios.
- [ ] La sección FAQ existe en el home con 6–8 Q&A en español y su `FAQPage` JSON-LD.
- [ ] Los videos no descargan `.mp4` al cargar la página (solo `poster` + `metadata`).
- [ ] `npm run lint` pasa y `npm run build` compila con `✓ Compiled successfully`.
- [ ] La guía GSC/GBP queda documentada con el orden de indexación y la tabla de 5 keywords base.

## Decisions

- **Sí:** H1 intacto + subtítulo SEO visible. El H1 es marca/diseño aprobado; el subtítulo aporta keywords sin romper nada.
- **No:** reescribir el H1 con keywords. Más señal SEO pero rompe el diseño que el usuario ya aprobó.
- **Sí:** FAQ en el home antes de Contacto, redactada por el asistente. Una sola ubicación indexable, opta a rich results y captura long-tail B2B.
- **No:** FAQ en fichas de servicio. Dispersa el esfuerzo y duplica mantenimiento por servicio.
- **Sí:** videos auto-hospedados + optimización de carga. Sin migración, sin riesgo de romper `video-sitemap.xml` ni URLs ya enviadas a GSC.
- **No:** migrar a YouTube en este spec. Mejor CWV y descubrimiento, pero cambia hosting, URLs de contenido y estrategia; va en su propia spec si se decide.
- **Sí:** NAP/horarios/redes como datos fijos del spec (los pasó el usuario el 2026-10-12). Evita placeholders que luego se olvidan. URL de Facebook con `#` final: se limpia al implementar.
- **Sí:** `Organization` enriquecida, no `ProfessionalService`/`Dentist`. NOVACAD es laboratorio B2B sin atención al público; `Dentist` sería engañoso y el cambio de tipo no justifica rehacer el grafo (decisión grilling 2026-10-12).
- **Sí:** Q&A redactadas durante la implementación con compuerta de aprobación del usuario en el diff (decisión grilling 2026-10-12). Congelarlas antes habría retrasado el spec; el riesgo clínico se cubre con la compuerta.
- **Sí:** migración WebP condicional por peso, no masiva (decisión grilling 2026-10-12, auditada mismo día). La primera conversión pesaba más que los JPG; tras la reconversión del usuario, el webp gana en ~30 archivos y pierde en 12 (servicios: zirconia, emax, pmma, resina-provisional, diseno-de-sonrisa, mock-up, guarda, guia; más 4 iconos). Esos 12 conservan el original.
- **No:** re-compresión de WebP a calidad ~75–80 en este spec. Va en su propia spec si la auditoría del paso 1 muestra que vale la pena.
- **Sí:** `lastModified` estable. `new Date()` por build enseña a Google a ignorar el `lastmod` y desperdicia presupuesto de rastreo.
- **Sí:** guía GSC/GBP dentro del spec aunque sean pasos manuales. La indexación no se completa solo con código; sin la guía el spec quedaría cojo.
- **No:** ejecutar backlinks ni tocar el GBP desde el spec. Son acciones del dueño del negocio, el spec solo las documenta.

## Risks

| Risk | Mitigation |
|---|---|
| Google tarda 4–12 semanas en indexar todo aunque el código esté perfecto | Expectativa documentada + tabla de keywords quincenal; la Fase D pide indexación manual de las URLs clave |
| Subtítulo SEO suena a relleno de keywords y degrada el diseño | Redacción natural en una línea, mismo estilo tipográfico del Hero; el usuario lo aprueba en revisión |
| Cambiar el Hero a `<Image>` altera el encuadre actual del fondo | Mismo `src`, `object-cover` y punto focal equivalente; verificación visual contra captura actual |
| Respuestas FAQ con imprecisiones clínicas | El usuario (dominio dental) las corrige al revisar; el spec lleva Q&A propuestas, no finales |
| `sameAs` con URL de Facebook con `#` al final | Limpiar el sufragio `#` al implementar; validar las 3 URLs responden 200 |

## What is **not** in this spec

- Migración de videos a YouTube, blog o páginas nuevas, `sitemap-index.xml`, cambios en los sitemaps de video/imagen, `ImageObject` JSON-LD, rediseño del Hero, campañas de pago y ejecución de backlinks. Cada uno, si se necesita, va en su propia spec.
