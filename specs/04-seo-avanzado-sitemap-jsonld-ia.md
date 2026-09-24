# SPEC 04 — SEO avanzado: sitemap, JSON-LD y optimización para buscadores de IA

> **Status:** Implemented
> **Depends on:** SPEC 02, SPEC 03
> **Date:** 2026-09-24
> **Objective:** Implementar SEO técnico avanzado con sitemap y robots dinámicos, JSON-LD estructurado y optimización para buscadores de IA (llms.txt) sobre el dominio canónico `https://novacad.com.mx/`.

## Scope

**In:**

- Migración de dominio canónico de `https://ontechpro.com.mx/novacad/` a `https://novacad.com.mx/` en `app/layout.tsx:20` (`metadataBase`) y propagación a todos los artefactos SEO (sitemap, robots, canonical, OG, JSON-LD).
- `app/sitemap.ts` (Metadata Route de Next.js) que genera dinámicamente las 10 URLs canónicas: `/` + 9 `/servicios/[slug]` (`zirconia`, `e-max`, `pmma`, `resina-hibrida`, `diseno-de-sonrisa`, `mock-up`, `alineadores`, `guardas-oclusales`, `guias-quirurgicas`) derivadas de `data/services.ts` vía `serviceCategories.flatMap`. Cada entrada con `lastModified: new Date()` (fecha de build), `changeFrequency` (`weekly` para `/`, `monthly` para servicios) y `priority` (`1.0` home, `0.8` servicios). Sin anclas hash, sin sitemap-index.
- `app/robots.ts` (Metadata Route) que emite `User-agent: * / Allow: /` y `Sitemap: https://novacad.com.mx/sitemap.xml`. Sin `Disallow` adicionales; crawlers de IA (GPTBot, CCBot, etc.) permitidos.
- Canonical absoluto por página vía `alternates.canonical` en `app/layout.tsx:19` (home) y `generateMetadata` de `app/servicios/[slug]/page.tsx:1` (`https://novacad.com.mx/servicios/[slug]`). OG/Twitter base reutilizando `images/bg-logo-novacad-publish.jpg` (1200x630) ya declarado en `app/layout.tsx:30`; sin `og-image` dinámica por servicio.
- JSON-LD estructurado como `<script type="application/ld+json">` inyectado vía componente helper `components/JsonLd.tsx` (Server Component que serializa con `JSON.stringify`):
  - **Home (`app/layout.tsx` o `app/page.tsx`):** grafo con `Organization` (o `DentalLaboratory` si se valida tipo schema.org) con `name: "NOVACAD"`, `url: "https://novacad.com.mx/"`, `email: "novacad.social@gmail.com"`, `address: PostalAddress { streetAddress: "Cerezo 77A", addressLocality: "Boulevares Impala", postalCode: "55040" }`, `logo: "https://novacad.com.mx/images/bg-logo-novacad-publish.jpg"`, `sameAs: []` (vacío sin redes verificadas) + `WebSite` con `name`, `url`, `inLanguage: "es-MX"` + `ItemList` de 9 servicios (cada `ListItem` con `position`, `name`, `url` absoluta).
  - **Detalle (`app/servicios/[slug]/page.tsx`):** por slug `BreadcrumbList` (`Home → Servicios → [Servicio]`) + `Service` (o `MedicalProcedure`/`Product` si aplica) con `name`, `description` desde `metaDescription`, `url` canónica, `provider: Organization`, `areaServed: "MX"` y `image` absoluta del servicio.
- `public/llms.txt` (y copiado como `public/ai.txt` si se decide duplicar) en formato markdown para LLMs: encabezado `# NOVACAD`, párrafo intro (laboratorio CAD/CAM, innovación digital), lista de 9 servicios con título + 1 línea descriptiva desde `metaDescription` + URL absoluta, sección `## Contacto` con email y dirección, nota `Idioma: es-MX`. Contenido estático generado en build, accesible en `https://novacad.com.mx/llms.txt`.
- Preservación de arquitectura: sin nuevas dependencias en `package.json:12`, sin cambios en `next.config.ts:1`, `tsconfig.json` o sistema Tailwind v4. Todo como Metadata Routes nativas de Next.js 16.

**Out of scope (for future specs):**

- Redirects 301 desde URLs legacy `https://ontechpro.com.mx/novacad/*.html` o `/novacad/` — explícitamente descartado en este spec.
- `sitemap-index.xml`, `sitemap` por idioma, `hreflang`, o paginación de sitemap.
- Verificación GSC/Bing (`google-site-verification`, `msvalidate.01`), analytics, o `next.config.ts` headers.
- Schema adicional `FAQPage`, `Review`/`AggregateRating`, `Testimonial` o `VideoObject` para procedimientos.
- `og-image` dinámica por servicio (`app/servicios/[slug]/opengraph-image.tsx`) o generación de imágenes.
- Bloqueo de crawlers IA en `robots.ts` (`Disallow` para `GPTBot`/`CCBot`).
- CMS, i18n multi-idioma, o contenido vivo de Instagram/TikTok indexable.

## Data model

Esta feature no crea tablas ni persistencia; extiende metadatos SEO y añade artefactos estáticos. Estructuras concretas:

```ts
// app/sitemap.ts — retorno de MetadataRoute.Sitemap
type SitemapEntry = {
  url: string;              // ej: "https://novacad.com.mx/servicios/zirconia"
  lastModified: Date;       // new Date() al generar
  changeFrequency: "weekly" | "monthly";
  priority: number;         // 1.0 | 0.8
};

// app/robots.ts — retorno de MetadataRoute.Robots
type Robots = {
  rules: { userAgent: string; allow: string; disallow?: string }[];
  sitemap: string;          // "https://novacad.com.mx/sitemap.xml"
  host?: string;            // "https://novacad.com.mx"
};

// components/JsonLd.tsx — helper
type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };
// uso: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />

// JSON-LD grafos (esquemas abreviados)
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization", // o "DentalLaboratory" si se valida
  name: "NOVACAD",
  url: "https://novacad.com.mx/",
  email: "novacad.social@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cerezo 77A Boulevares Impala",
    postalCode: "55040",
    addressCountry: "MX",
  },
  logo: "https://novacad.com.mx/images/bg-logo-novacad-publish.jpg",
  sameAs: [] as string[],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NOVACAD | Laboratorio Dental CAD/CAM",
  url: "https://novacad.com.mx/",
  inLanguage: "es-MX",
};

// Por servicio (en app/servicios/[slug]/page.tsx)
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Zirconia", // desde ServiceItem.title
  description: "Restauraciones de zirconia...", // desde metaDescription
  url: "https://novacad.com.mx/servicios/zirconia",
  provider: { "@type": "Organization", name: "NOVACAD", url: "https://novacad.com.mx/" },
  areaServed: "MX",
  image: "https://novacad.com.mx/images/zirconia.jpg",
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://novacad.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Zirconia", item: "https://novacad.com.mx/servicios/zirconia" },
  ],
};

// public/llms.txt — formato (extracto)
`# NOVACAD
Laboratorio dental CAD/CAM. Innovación digital, sonrisa natural.
## Servicios
- [Zirconia](https://novacad.com.mx/servicios/zirconia): Restauraciones de zirconia de alta resistencia...
...
## Contacto
Email: novacad.social@gmail.com
Dirección: Cerezo 77A Boulevares Impala, 55040
Idioma: es-MX
`
```

Convenciones:
- Dominio canónico siempre `https://novacad.com.mx` sin trailing slash extra salvo `/` raíz; `metadataBase` es la fuente de verdad.
- `app/sitemap.ts` importa `serviceCategories` de `data/services.ts:24` y deriva slugs con `flatMap(c => c.items)`; build falla si falta un slug (mismo patrón que `generateStaticParams` en SPEC 03).
- JSON-LD se valida con Rich Results Test / Schema Validator; `JSON.stringify` sin pretty para evitar XSS, sin `__html` interpolado manualmente.
- `llms.txt` usa URLs absolutas y texto plano markdown; accesible también como `ai.txt` si se duplica (mismo contenido).

## Implementation plan

1. **Actualizar dominio canónico en `app/layout.tsx:20`.** Cambiar `metadataBase` de `https://ontechpro.com.mx/novacad/` a `https://novacad.com.mx/`, ajustar `openGraph.url` y `alternates.canonical: "https://novacad.com.mx/"` para la home. Verificación: `npm run build` y revisar `<link rel="canonical">` en HTML de `/`.
2. **Crear `app/sitemap.ts`.** Implementar `export default function sitemap(): MetadataRoute.Sitemap` que retorna 10 entradas (home + 9 servicios desde `data/services.ts`), con `lastModified: new Date()`, `changeFrequency` y `priority` según scope. Verificación: `npm run build` genera `sitemap.xml` y `curl http://localhost:3000/sitemap.xml` lista 10 `<url>`.
3. **Crear `app/robots.ts`.** Implementar `export default function robots(): MetadataRoute.Robots` con `rules: [{ userAgent: "*", allow: "/" }]` y `sitemap: "https://novacad.com.mx/sitemap.xml"` (+ `host`). Verificación: `curl http://localhost:3000/robots.txt` contiene `Sitemap: https://novacad.com.mx/sitemap.xml`.
4. **Crear helper `components/JsonLd.tsx`.** Server Component mínimo que recibe `data` y renderiza `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />` (con escape de `</script>` si aplica). Verificación: componente tipa correctamente y no introduce `use client`.
5. **Inyectar JSON-LD de home (Organization + WebSite + ItemList).** En `app/layout.tsx` o `app/page.tsx` (Server Component) renderizar `JsonLd` con los tres grafos. Datos desde constantes locales (sin fetch). Verificación: view-source de `/` contiene 3 bloques `application/ld+json` válidos (validar con `npx tsc --noEmit` y validator online).
6. **Extender `app/servicios/[slug]/page.tsx` con canonical y JSON-LD por servicio.** Añadir `alternates.canonical` en `generateMetadata` (`https://novacad.com.mx/servicios/[slug]`) y renderizar `BreadcrumbList` + `Service` vía `JsonLd` usando el `ServiceItem` encontrado (con `notFound()` si slug inválido). Reutilizar `metaTitle/metaDescription` e `image` absoluta. Verificación: `/servicios/zirconia` muestra canonical correcto y 2 bloques JSON-LD en source.
7. **Crear `public/llms.txt` (y opcional `public/ai.txt`).** Escribir markdown estático con intro, lista de 9 servicios con URL absoluta + descripción corta, contacto y nota es-MX. Verificación: `curl http://localhost:3000/llms.txt` retorna 200 y contiene las 9 URLs absolutas.
8. **Verificación técnica final.** Ejecutar `npm run lint`, `npm run build`, `npx tsc --noEmit`; inspeccionar que no hay sitemap-index, que `sitemap.xml` y `robots.txt` son rutas estáticas, que no hay hotlinks a `ontechpro.com.mx`, y que JSON-LD pasa validación de sintaxis (JSON.parse). Verificación: `✓ Compiled successfully`, `○ /sitemap.xml`, `○ /robots.txt` listados en build, 0 warnings de hydration.

## Acceptance criteria

- [ ] `app/layout.tsx:20` tiene `metadataBase: new URL("https://novacad.com.mx/")` y la home expone `alternates.canonical: "https://novacad.com.mx/"`.
- [ ] `app/sitemap.ts` existe, exporta `MetadataRoute.Sitemap` y genera exactamente 10 URLs: `https://novacad.com.mx/` + 9 `https://novacad.com.mx/servicios/[slug]` derivadas de `data/services.ts`, cada una con `lastModified` (Date), `changeFrequency` (weekly home / monthly servicios) y `priority` (1.0 / 0.8).
- [ ] `GET /sitemap.xml` retorna 200 con 10 `<url>` y `<loc>` absolutos bajo `https://novacad.com.mx`; no hay anclas hash ni sitemap-index.
- [ ] `app/robots.ts` existe y `GET /robots.txt` retorna `User-agent: *` `Allow: /` + `Sitemap: https://novacad.com.mx/sitemap.xml` sin `Disallow` extra y sin bloquear GPTBot/CCBot.
- [ ] Cada una de las 9 páginas de servicio expone `canonical` absoluto `https://novacad.com.mx/servicios/[slug]` vía `generateMetadata` y OG/Twitter reutilizando `images/bg-logo-novacad-publish.jpg`.
- [ ] La home (`/`) inyecta JSON-LD `Organization` (con `name: NOVACAD`, `email`, `address` Cerezo 77A..., `logo` absoluto), `WebSite` (`inLanguage: es-MX`) e `ItemList` de 9 servicios como bloques `application/ld+json` separados y JSON válido.
- [ ] Cada `/servicios/[slug]` inyecta `BreadcrumbList` (Inicio → Servicio) y `Service` (con `name`, `description` desde `metaDescription`, `url` canónica, `provider: NOVACAD`, `image` absoluta) como JSON-LD válido.
- [ ] `public/llms.txt` existe y `GET /llms.txt` retorna 200 con markdown que incluye: intro NOVACAD, lista de 9 servicios con título + URL absoluta + descripción corta, contacto (email y dirección) y nota `es-MX`.
- [ ] No hay `public/ai.txt` divergente o, si existe, es idéntico a `llms.txt`; no hay `sitemap-index.xml` ni redirects legacy en `next.config.ts`.
- [ ] `npm run lint` pasa sin errores, `npm run build` compila con `✓ Compiled successfully` y lista `○ /sitemap.xml` y `○ /robots.txt` como rutas estáticas, `npx tsc --noEmit` pasa.
- [ ] View-source de `/` y de `/servicios/zirconia` contiene bloques JSON-LD parseables con `JSON.parse` y sin `</script>` sin escapar; Rich Results Test no reporta errores de sintaxis.

## Decisions

- **Sí:** migrar `metadataBase` a `https://novacad.com.mx/` (raíz). Dominio confirmado por el usuario; evita contenido duplicado y alinea canonical/sitemap/robots con hosting real.
- **No:** mantener `https://ontechpro.com.mx/novacad/` como canónico o soportar ambos. Generaría duplicación y canonical conflictivo.
- **Sí:** `app/sitemap.ts` y `app/robots.ts` como Metadata Routes nativas de Next.js 16. Evita `public/sitemap.xml` estático manual y se integra con `metadataBase`.
- **No:** `public/sitemap.xml` estático o librería `next-sitemap`. Añade dependencia y drift con `data/services.ts`.
- **Sí:** 10 URLs canónicas (home + 9 servicios) derivadas de `data/services.ts`. Fuente única ya usada por `generateStaticParams` en SPEC 03; excluye anclas hash no indexables.
- **No:** incluir anclas `/#quienes-somos` etc. o `sitemap-index`. No aportan SEO y añaden complejidad.
- **Sí:** `lastModified: new Date()` + `changeFrequency`/`priority` diferenciados. Señal útil para crawlers sin requerir git history.
- **No:** fecha fija o sin `changeFrequency`. Fecha fija envejece; omitir `changeFrequency` pierde hint de frescura.
- **Sí:** JSON-LD con 4 grafos base (Organization + WebSite + ItemList en home, BreadcrumbList + Service en detalle). Cubre conocimiento de marca, navegación y servicios para Google y LLMs.
- **No:** FAQPage/Review/AggregateRating en este spec. Requiere contenido FAQ real y fuente de reseñas auditada; va en spec futura.
- **Sí:** helper `components/JsonLd.tsx` Server Component con `JSON.stringify`. Tipado, reutilizable, sin `use client`, evita duplicar `<script>` manual.
- **No:** inyectar JSON-LD con strings literales por página. Duplica y propenso a errores de escape.
- **Sí:** `public/llms.txt` completo con intro + 9 servicios + contacto es-MX (y `ai.txt` idéntico si se duplica). Estándar adoptado por Perplexity/ChatGPT/Gemini para descubrimiento.
- **No:** solo `llms.txt` mínimo con URLs. Pierde contexto semántico para IA.
- **Sí:** permitir todos los crawlers en `robots.ts` (incluidos IA). Maximiza visibilidad en buscadores tradicionales y de IA.
- **No:** bloquear GPTBot/CCBot. Contradice objetivo de optimización para IA.
- **Sí:** reutilizar OG image existente `bg-logo-novacad-publish.jpg` para todas las páginas. Asset ya verificado y evita generación dinámica.
- **No:** `opengraph-image.tsx` por servicio. Scope extra sin diseño aprobado.

## Risks

| Risk | Mitigation |
|---|---|
| `metadataBase` desalineado entre layout, sitemap y robots genera canonical/sitemap mismatch | Fuente única `https://novacad.com.mx/` en `app/layout.tsx:20`; sitemap y robots usan URLs absolutas hardcodeadas al mismo dominio; verificar con `grep -r novacad.com.mx` |
| `data/services.ts` añade o renombra un slug y sitemap queda desincronizado | `app/sitemap.ts` deriva slugs con `flatMap` igual que `generateStaticParams` en SPEC 03; build falla si import rompe, detecta temprano |
| JSON-LD inválido (coma trailing, `</script>` sin escapar) rompe parsing en Google/LLMs | Usar `JSON.stringify` en `JsonLd.tsx`, validar con `JSON.parse` en build y con Rich Results Test antes de merge |
| `llms.txt` no es descubierto porque Next.js no sirve `public/` en subpath | Servir en raíz `/llms.txt` vía `public/llms.txt`; verificar `curl /llms.txt` 200 y que `robots.ts` no lo bloquea |
| Duplicación con dominio viejo `ontechpro.com.mx/novacad/` causa contenido duplicado | Este spec no implementa redirects (out of scope) pero documenta que el canónico es `novacad.com.mx`; spec futura añade 301 si se necesita migración SEO |
| Organización marcada como `Organization` genérica en lugar de tipo dental específico | Usar `Organization` por defecto y documentar alternativa `DentalLaboratory`/`MedicalOrganization` como mejora sin romper validación |

## What is **not** in this spec

- Redirects 301 desde `ontechpro.com.mx/novacad/*.html`, `sitemap-index.xml`, `hreflang`, verificación GSC/Bing, analytics, `og-image` dinámica por servicio, schema `FAQPage`/`Review`/`VideoObject`, y bloqueo de crawlers IA. Cada uno, si se necesita, va en su propia spec.
