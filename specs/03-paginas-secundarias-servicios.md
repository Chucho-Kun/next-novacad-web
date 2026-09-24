# SPEC 03 — Páginas secundarias de servicios con template único

> **Status:** Approved
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-09-24
> **Objective:** Generar las 9 páginas secundarias de servicios vinculadas desde la home con el mismo diseño de las páginas de referencia (protesis-fija-zirconia.html y similares) usando un template único en rutas limpias `/servicios/[slug]`.

## Scope

**In:**

- 9 rutas estáticas en `app/servicios/[slug]/page.tsx` con `generateStaticParams` para los slugs: `zirconia`, `e-max`, `pmma`, `resina-hibrida`, `diseno-de-sonrisa`, `mock-up`, `alineadores`, `guardas-oclusales`, `guias-quirurgicas` (sin `reparacion-dental`).
- Template único de detalle compartido por las 9 páginas, replicando el diseño observado en `https://ontechpro.com.mx/novacad/protesis-fija-zirconia.html`, `protesis-fija-e-max.html` y `protesis-provisionales-pmma.html`: barra superior azul `#223a87` con enlace `[Regresar]` a `/`, título `Zirconia`/`E-Max`/`PMMA` etc, 2 párrafos intro, 2 CTAs (`Agenda una cita` → `https://wa.me/message/WGEHL6GIRQIVL1?src=qr` y `Orden de trabajo` → `https://drive.google.com/file/d/1TmrkULEnk59rYrwj4g8cKrSS9s8Q4UzE/view`), bloque `Categorías` / `Etiquetas`, lista `Gracias a su ... ideal para:` / `Se utiliza principalmente en:` / `Es ideal para:`, bloque `CARACTERÍSTICAS` con bullets, y bloque `DETALLES DE CONTACTO` con `novacad.social@gmail.com` y `Cerezo 77A Boulevares Impala, 55040`.
- Layout responsive del template: desktop 2 columnas (imagen a la izquierda ~40-45%, contenido a la derecha), mobile stacked (imagen arriba, contenido debajo), mismos breakpoints del home (`xs:30rem`, `lg:62rem`, `2xl:120rem`) y anchos de contenido `80vw`/`90vw` en `app/globals.css:80`.
- Reutilización de la imagen de card de `public/images/` como imagen de cabecera del detalle (ej. `zirconia.jpg`, `emax.jpg`, `pmma.jpg`, etc) sin descargar assets nuevos; render con `next/image` y `alt` descriptivo existente en `data/services.ts:6`.
- Extensión de `data/services.ts` como fuente única de verdad (añadir campos de detalle sin crear archivo separado), para que `components/Services.tsx:15` y `ServiceCategoryCard` sigan funcionando sin cambios.
- Preservación de navegación existente: `ServiceCategoryCard` mantiene `href: "/servicios/[slug]"` y las anclas de la home (`#inicio`, `#quienes-somos`, `#servicios`, `#galeria`, `#contacto`) no se rompen.
- Header de la home no se incluye en el detalle; el detalle muestra solo barra azul `[Regresar]` + `Footer` (según decisión explícita del usuario). `Footer` se reutiliza sin duplicar.
- `generateMetadata` por slug (title/description derivados de datos extendidos) y `notFound()` para slug inexistente.
- Extracción literal del copy de las 9 URLs de referencia; corrección solo de typos evidentes sin cambiar significado (ej. `E-Maxdental` → `E-Max dental` si aparece pegado).

**Out of scope (for future specs):**

- Redirects 301 desde URLs legacy `.html` (`protesis-fija-zirconia.html` etc) — explícitamente descartado, solo rutas limpias.
- Décima página `reparacion-dental` — no existe en referencia auditada, queda fuera.
- Backend de formulario, CMS editable, feed vivo Instagram/TikTok, sitemap dinámico, JSON-LD, OG images generadas más allá de `generateMetadata` básico.
- Nuevas dependencias, cambios en `package.json`, `next.config.ts`, `tsconfig.json` o sistema de estilos.
- Galería integrada en el detalle o playlist de videos — corresponde a la home, no al detalle.

## Data model

Esta feature extiende estructuras existentes; no reutiliza solo el modelo previo sin cambios.

```ts
// data/services.ts — extensión (fuente única para home y detalle)
export type ServiceItem = {
  slug: string;              // ej: "zirconia"
  title: string;             // ej: "Zirconia"
  href: string;              // ej: "/servicios/zirconia"
  image: string;             // ej: "/images/zirconia.jpg" — reutilizada en detalle
  alt: string;               // ej: "Prótesis dental de zirconia"
  // --- nuevos campos para detalle ---
  intro: string[];           // 2 párrafos (ej: "La zirconia es un material cerámico..." )
  categories: string[];      // ej: ["Prótesis Dental Fija", "Zirconia dental"]
  tags: string[];            // ej: ["Zirconia dental", "corona de zirconia", "Puente de zirconia"]
  idealForTitle: string;     // ej: "Gracias a su resistencia mecánica, la zirconia es ideal para:"
  idealFor: string[];        // ej: ["Coronas", "Puentes", "Incrustaciones", "Prótesis sobre implantes"]
  featuresTitle: string;     // "CARACTERÍSTICAS"
  features: string[];        // ej: ["Resistencia de 1400 MPa", "Sistema CAD/CAM", "Libre de metal"]
  metaTitle: string;         // ej: "Zirconia | NOVACAD Laboratorio Dental"
  metaDescription: string;   // ej: "Restauraciones de zirconia de alta resistencia..."
};

export type ServiceCategory = {
  slug: string;
  title: string;
  items: ServiceItem[];
};

// slugs válidos — 9 estáticos
export const validSlugs = [
  "zirconia", "e-max", "pmma", "resina-hibrida",
  "diseno-de-sonrisa", "mock-up", "alineadores",
  "guardas-oclusales", "guias-quirurgicas"
] as const;
```

Convenciones:
- `href` siempre `/servicios/[slug]`; no usar `.html`.
- `image` reutiliza asset existente en `public/images/`; no hotlinks.
- `generateStaticParams()` itera `serviceCategories.flatMap(c => c.items)` para derivar slugs; build falla si falta un slug.
- Campos `idealForTitle` y `featuresTitle` permiten variación por servicio (ej. E-Max usa "Se utiliza principalmente en:", PMMA usa "Es ideal para:") sin forzar texto único.
- Si el fetch de alguna de las 9 URLs falla o la imagen no existe, se usa placeholder documentado y se deja `intro`/`features` con contenido mínimo verificado, sin inventar URLs.

## Implementation plan

1. **Extraer contenido literal de las 9 URLs de referencia.** Hacer `fetch` de `protesis-fija-zirconia.html`, `protesis-fija-e-max.html`, `protesis-provisionales-pmma.html` y las 6 restantes (resina-hibrida, diseno-de-sonrisa, mock-up, alineadores, guardas-oclusales, guias-quirurgicas) y capturar: título, 2 párrafos intro, categorías/etiquetas, lista ideal-para, características y contacto. Guardar notas en spec o comentario en `data/services.ts`. Verificación: tabla con 9 filas completada, sin inventar copy.
2. **Extender `data/services.ts`.** Añadir a cada `ServiceItem` los campos `intro`, `categories`, `tags`, `idealForTitle`, `idealFor`, `featuresTitle`, `features`, `metaTitle`, `metaDescription` con los literales extraídos. Mantener `slug`, `title`, `href`, `image`, `alt` existentes para no romper `Services.tsx`. Verificación: `npx tsc --noEmit` sin errores y `npm run build` sigue listando `○ /`.
3. **Crear template de detalle `app/servicios/[slug]/page.tsx`.** Implementar como Server Component: `generateStaticParams()` desde `serviceCategories`, `generateMetadata({params})` leyendo `metaTitle/metaDescription`, `find` por slug con `notFound()` si no existe, layout con barra superior azul `bg-brand-deep` + `<Link href=\"/\">Regresar</Link>`, grid 2 columnas (`lg:grid-cols-[45%_1fr]` o similar) con `next/image` a la izquierda y contenido a la derecha, 2 CTAs con `target=\"_blank\" rel=\"noopener noreferrer\"`, secciones `Categorías`/`Etiquetas` en texto pequeño, lista `idealFor`, bloque `CARACTERÍSTICAS` y `DETALLES DE CONTACTO`, y `<Footer />` al final (sin `<Header />`). Respetar `app/globals.css:32` `scroll-behavior` y `app/globals.css:76` `scroll-margin-top` si se añaden anclas internas. Verificación: `npm run dev` renderiza `/servicios/zirconia` con barra Regresar funcional.
4. **Pulir responsive y accesibilidad del template.** Ajustar widths a `w-[90vw] lg:w-[80vw]` como en `components/About.tsx:6`, tipografía `text-[30px] lg:text-[28px]` y botones `min-h-[44px]` para touch targets, `alt` descriptivo en imagen, foco visible. Probar 375/768/991/1440/1920 sin overflow. Verificación: sin scroll horizontal y `npm run lint` sin errores.
5. **Verificar wiring desde la home y 404.** Confirmar que `ServiceCategoryCard` sigue enlazando a `/servicios/[slug]` y que navegar desde `/#servicios` a un detalle y volver con `Regresar` no rompe anclas. Probar slug inexistente `/servicios/inexistente` devuelve 404. Verificación: clicks manuales + `npm run build` lista `○ /servicios/[slug]` para los 9 slugs como `Static`.
6. **Verificación técnica final.** Ejecutar `npm run lint`, `npm run build`, `npx tsc --noEmit`; revisar que `public/images/` no requiera assets nuevos y que no hay hotlinks a `ontechpro.com.mx`. Verificación: `✓ Compiled successfully`, 9 rutas estáticas listadas, 0 warnings de hydration.

## Acceptance criteria

- [ ] `app/servicios/[slug]/page.tsx` existe y exporta `generateStaticParams()` que genera exactamente 9 rutas: `zirconia`, `e-max`, `pmma`, `resina-hibrida`, `diseno-de-sonrisa`, `mock-up`, `alineadores`, `guardas-oclusales`, `guias-quirurgicas` (no `reparacion-dental`).
- [ ] Cada una de las 9 páginas renderiza con barra superior azul con `[Regresar]` que navega a `/`, sin `Header` completo, y con `Footer` al pie.
- [ ] Layout de cada detalle: desktop 2 columnas (imagen + contenido), mobile stacked, sin overflow en 375/768/991/1440/1920, usando `next/image` con la imagen reutilizada de `public/images/` (`zirconia.jpg`, `emax.jpg`, `pmma.jpg`, etc).
- [ ] Cada página muestra literales extraídos de la referencia: título, 2 párrafos intro, 2 CTAs (`https://wa.me/message/WGEHL6GIRQIVL1?src=qr` y `https://drive.google.com/file/d/1TmrkULEnk59rYrwj4g8cKrSS9s8Q4UzE/view` con `target=\"_blank\"`), categorías, etiquetas, lista `idealFor` y bloque `CARACTERÍSTICAS`.
- [ ] `data/services.ts` es la fuente única: contiene los 9 `ServiceItem` con los nuevos campos `intro`, `categories`, `tags`, `idealFor`, `features`, `metaTitle`, `metaDescription`; `Services.tsx` y `ServiceCategoryCard` en la home siguen funcionando sin cambios.
- [ ] `generateMetadata` genera `title` y `description` por slug desde `data/services.ts`; slug inexistente responde 404 vía `notFound()`.
- [ ] Navegación desde la home: cada card en `/#servicios` enlaza a `/servicios/[slug]` correcto; el regreso a `/` preserva anclas.
- [ ] No hay redirects legacy `.html` ni hotlinks a `ontechpro.com.mx`; todos los assets son locales en `public/images/`.
- [ ] `npm run lint` pasa sin errores, `npm run build` compila con `✓ Compiled successfully` y lista 9 rutas `/servicios/*` como `○ (Static)`, `npx tsc --noEmit` pasa.

## Decisions

- **Sí:** 9 páginas sin `reparacion-dental`. Coincide con referencia auditada y SPEC 02; evita crear página sin fuente.
- **No:** incluir `reparacion-dental` con contenido inventado. Rompería regla de no inventar URLs/copy.
- **Sí:** solo rutas limpias `/servicios/[slug]`. Decisión explícita del usuario; simplifica routing y evita config de redirects en `next.config.ts`.
- **No:** redirects 301 desde `.html` legacy. Va en spec futura si se necesita SEO de migración; no bloquea esta entrega.
- **Sí:** extraer copy literal de las 9 URLs. Garantiza fidelidad 1:1; typos evidentes se corrigen sin cambiar significado.
- **No:** contenido curado externo o placeholder genérico. Perdería fidelidad y obligaría a esperar entrega del usuario.
- **Sí:** extender `data/services.ts` como fuente única. Evita drift entre home y detalle; `generateStaticParams` y `Services.tsx` comparten la misma verdad.
- **No:** archivo separado `service-details.ts` o JSON externo. Duplicaría slugs y riesgo de desincronización.
- **Sí:** reutilizar imagen de card para el detalle. Asset ya existe en `public/images/` y coincide con referencia; evita descarga nueva.
- **No:** descargar imágenes distintas por detalle sin evidencia de URL distinta.
- **Sí:** template único compartido. Estructura idéntica observada en Zirconia/E-Max/PMMA (barra + imagen + CTAs + categorías + lista + características + contacto).
- **No:** variaciones por categoría. Añade complejidad sin respaldo en referencia.
- **Sí:** detalle con solo barra azul `[Regresar]` + `Footer`, sin `Header` completo. Decisión explícita del usuario y coincide con HTML de referencia.
- **No:** incluir `Header` con nav a anclas en el detalle. Rompería expectativa de página secundaria aislada y duplica navegación.

## Risks

| Risk | Mitigation |
|---|---|
| Alguna de las 6 URLs restantes no responde o cambia estructura HTML | Documentar la URL exacta intentada, usar el copy ya capturado en `screenshots/sections/` como fallback y dejar bloque con texto mínimo verificado + TODO explícito en spec, sin inventar beneficios |
| Imagen de detalle distinta a la de card pero no identificada | Reutilizar la de card y documentar en `data/services.ts` comentario `// reused from card`; si aparece asset distinto, añadirlo a `public/images/` sin hotlink |
| Drift de copy por corrección de typos | Corregir solo uniones evidentes (`E-Maxdental` → `E-Max dental`) y mantener frase original en comentario para auditoría |
| `generateStaticParams` desincronizado si se edita `data/services.ts` | Fuente única `serviceCategories.flatMap` usada en home y detalle; build falla si slug no existe, detecta el error temprano |

## What is **not** in this spec

- Redirects legacy `.html` 1:1, décima página `reparacion-dental`, backend/CMS, sitemap/JSON-LD avanzado, feed Instagram/TikTok vivo, nuevas dependencias, galería o playlist de videos en el detalle. Cada uno, si se necesita, va en su propia spec.
