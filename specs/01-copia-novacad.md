# SPEC 01 — Copia sitio NOVACAD a estructura AGENTS.md con recursos locales

> **Status:** Approved
> **Depends on:** —
> **Date:** 2026-09-23
> **Objective:** Replicar la home de https://ontechpro.com.mx/novacad/ y sus 10 sub-páginas de servicios en la estructura One Single Page de AGENTS.md, descargando imágenes, SVG y videos a public/images y adaptando el diseño a Tailwind v4/Geist.

## Scope

**In:**

- Home one-page completa con contenido literal de https://ontechpro.com.mx/novacad/ en `app/page.tsx` compuesta por: Header (anclas `#inicio` `#quienes-somos` `#servicios` `#galeria` `#contacto`), Hero ("Innovación Digital / Sonrisa Natural" + CTAs "Lista de precios" `https://drive.google.com/file/d/1PPoYiu9yjx-gO9PaDCmsOGz6u8TraAFE/view` y "Enviar trabajo" `https://wa.me/message/WGEHL6GIRQIVL1?src=qr`), WhyChoose ("¿Por qué elegir NOVACAD?" con 3 ítems: Tecnología CAD/CAM, Materiales de alta calidad, Experiencia clínica y sus iconos), About ("¿Quiénes Somos?" con texto duplicado del original y foto `fotografia-lab-01.jpg`), Services (4 categorías con 10 sub-servicios), Gestiona tu trabajo (logo `logo_vevi_dental.png` + link `https://www.vevidental.com/novacad` y "Orden de trabajo" `https://drive.google.com/file/d/1TmrkULEnk59rYrwj4g8cKrSS9s8Q4UzE/view`), Como empacar (5 SVG `n-img-como-empacar-*.svg`), Procedimientos (6 videos con fallback "Tu navegador no soporta..."), Gallery (Instagram/TikTok placeholders), Testimonials (9 literales), Contact (logo `n_logo_blanco_novacad.png`, redes FB/IG/TikTok/WA, tel `56 6268 2487`, mail `novacad.social@gmail.com`, dirección `Cerezo 77A, Boulevares Impala, 55040, Ecatepec de Morelos, Méx`, form "Escríbenos"), Footer (derechos 2026).
- 10 rutas estáticas bajo `app/servicios/[slug]/page.tsx` con `generateStaticParams`: `zirconia`, `e-max`, `pmma`, `resina-hibrida`, `diseno-de-sonrisa`, `mock-up`, `alineadores`, `guardas-oclusales`, `guias-quirurgicas`, `reparacion-dental`; cada una con imagen local, descripción y CTA WhatsApp.
- Descarga de recursos a `public/images/`: ~30 imágenes (`n-logo-novacad.png`, `n-2-icono-telefono.png`, `n-2-icono-waf.png`, `n-icono-cnc.png`, `n-icono-diamante-teeth.png`, `Icono-experiencia-clinica.jpg`, `fotografia-lab-01.jpg`, `zirconia.jpg`, `emax.jpg`, `pmma.jpg`, `resina-provisional.jpg`, `n-protesis-removible.jpg`, `diseno-de-sonrisa.jpg`, `mock-up.jpg`, `n-protesis-CAD-CAM.jpg`, `Otros-Alineadores.jpg`, `guarda.jpg`, `guia.jpg`, `n-reparacion-dental.jpg`, `n-protesis-fija.jpg`, `logo_vevi_dental.png`, `icono_persona.png`, `estrellas.png`, `n_logo_blanco_novacad.png`, `n-icono-fb.png`, `n-icono-insta.png`, `n-icono-tiktok.png`, `n-icono-wa.png`), 5 SVG de empaque, y videos/posters de Procedimientos si accesibles (si no, placeholder).
- Refactor de datos: `data/services.ts` a `ServiceCategory[]` con subitems, `data/testimonials.ts` a 9 testimonios reales, nuevo `data/why-choose.ts` o inline para los 3 motivos.
- Componentes según `AGENTS.md:42`: actualizar `Header.tsx`, `Hero.tsx`, `About.tsx`, `Services.tsx`, `Gallery.tsx`, `Testimonials.tsx`, `Contact.tsx`, `Footer.tsx` y crear `WhyChoose.tsx`, `Gestiona.tsx`, `ComoEmpacar.tsx`, `Procedimientos.tsx` (todos bajo `components/`).
- Alias `@/* → ./*` (`tsconfig.json:21`) y Tailwind v4 sin `tailwind.config` (`app/globals.css:1` + `postcss.config.mjs:3` con `@tailwindcss/postcss`).

**Out of scope (para futuras specs):**

- Backend real del form (API route, SMTP, base de datos o Formspree).
- CMS o panel para editar servicios/testimonios dinámicamente.
- SEO avanzado (sitemap dinámico, JSON-LD, OG images generadas) más allá de `metadata` básica en `app/layout.tsx`.
- Integración viva con API de Instagram/TikTok.
- Redirects 1:1 de URLs legacy `.html` (`protesis-fija-zirconia.html`) — se cubre con rutas limpias `/servicios/*`; redirects se harán en otra spec si se requieren.
- Animaciones complejas, carruseles JS o librerías extra (framer-motion, swiper).

## Data model

```ts
// data/services.ts
export type ServiceItem = {
  slug: string;           // ej: "zirconia"
  title: string;          // ej: "Zirconia"
  href: string;           // ej: "/servicios/zirconia"
  image: string;          // ej: "/images/zirconia.jpg"
  categorySlug: string;   // ej: "protesis-fija"
};

export type ServiceCategory = {
  slug: string;           // ej: "protesis-fija"
  title: string;          // ej: "Prótesis fijas"
  description: string;
  items: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  { slug: "protesis-fija", title: "Prótesis fijas", description: "...", items: [
    { slug: "zirconia", title: "Zirconia", href: "/servicios/zirconia", image: "/images/zirconia.jpg", categorySlug: "protesis-fija" },
    { slug: "e-max", title: "E-Max", href: "/servicios/e-max", image: "/images/emax.jpg", categorySlug: "protesis-fija" },
  ]},
  { slug: "protesis-provisional", title: "Prótesis Provisional", description: "...", items: [
    { slug: "pmma", title: "PMMA", href: "/servicios/pmma", image: "/images/pmma.jpg", categorySlug: "protesis-provisional" },
    { slug: "resina-hibrida", title: "Resina Híbrida", href: "/servicios/resina-hibrida", image: "/images/resina-provisional.jpg", categorySlug: "protesis-provisional" },
  ]},
  { slug: "diseno-cad-cam", title: "Diseño CAD CAM", description: "...", items: [
    { slug: "diseno-de-sonrisa", title: "Diseño de Sonrisa", href: "/servicios/diseno-de-sonrisa", image: "/images/diseno-de-sonrisa.jpg", categorySlug: "diseno-cad-cam" },
    { slug: "mock-up", title: "Mock up", href: "/servicios/mock-up", image: "/images/mock-up.jpg", categorySlug: "diseno-cad-cam" },
  ]},
  { slug: "otros", title: "Otros", description: "...", items: [
    { slug: "alineadores", title: "Alineadores", href: "/servicios/alineadores", image: "/images/Otros-Alineadores.jpg", categorySlug: "otros" },
    { slug: "guardas-oclusales", title: "Guardas", href: "/servicios/guardas-oclusales", image: "/images/guarda.jpg", categorySlug: "otros" },
    { slug: "guias-quirurgicas", title: "Guías quirúrgicas", href: "/servicios/guias-quirurgicas", image: "/images/guia.jpg", categorySlug: "otros" },
    { slug: "reparacion-dental", title: "Reparación", href: "/servicios/reparacion-dental", image: "/images/n-reparacion-dental.jpg", categorySlug: "otros" },
  ]},
];

// data/testimonials.ts
export type Testimonial = {
  id: string;
  name: string;           // ej: "Silvia Reséndiz"
  role?: string;
  content: string;        // texto literal del sitio
  rating: 5;
  avatar: string;         // "/images/icono_persona.png"
  stars: string;          // "/images/estrellas.png"
};

export const testimonials: Testimonial[] = [
  { id: "silvia-resendiz", name: "Silvia Reséndiz", content: "Muy buena atención y formalidad en recolección y entrega. Recomendable este laboratorio.", rating: 5, avatar: "/images/icono_persona.png", stars: "/images/estrellas.png" },
  // ... 8 más: Vianney Salazar, Alejandra Montes, Ale Ledesma, Juan Carlos Martínez, Romero Ruiz Paola, Eliana Ordoñez, Juan Ruiz, Ali Colin
];

// data/why-choose.ts (o inline en WhyChoose.tsx)
export type WhyItem = { title: string; icon: string; description: string };
export const whyChoose: WhyItem[] = [
  { title: "Tecnología CAD/CAM", icon: "/images/n-icono-cnc.png", description: "..." },
  { title: "Materiales de alta calidad", icon: "/images/n-icono-diamante-teeth.png", description: "..." },
  { title: "Experiencia clínica", icon: "/images/Icono-experiencia-clinica.jpg", description: "..." },
];
```

Esta feature introduce nuevas estructuras; no reutiliza solo el modelo previo de `services.ts`/`testimonials.ts` planos.

## Implementation plan

1. **Descargar recursos a `public/images/`.** Crear `scripts/download-novacad-assets.mjs` (Node fetch) que liste todas las URLs `https://ontechpro.com.mx/novacad/images/*` identificadas en el scrape y las guarde en `public/images/` preservando nombre; verificar HTTP 200 y tamaño >0, loguear faltantes con placeholder; ejecutar `node scripts/download-novacad-assets.mjs`. Quita `public/images/.gitkeep`. Verificación: `ls public/images | wc -l` >= 30 y `npm run build` sigue compilando.
2. **Modelar datos.** Reescribir `data/services.ts` a `ServiceCategory[]` con 4 categorías y 10 `ServiceItem` (slugs e imágenes locales), y `data/testimonials.ts` a 9 testimonios literales con nombres reales; crear `data/why-choose.ts`. Actualizar `lib/utils.ts` sin cambios. Verificación: `npx tsc --noEmit` sin errores y `npm run build` genera `○ /`.
3. **Actualizar Header y Hero.** `components/Header.tsx` → nav con `Inicio (#inicio)`, `Quiénes somos (#quienes-somos)`, `Servicios (#servicios)`, `Galería (#galeria)`, `Contacto (#contacto)` + iconos teléfono/WA; `components/Hero.tsx` → id `inicio`, textos "Innovación Digital / Sonrisa Natural", subtítulo, CTAs Drive y WhatsApp con `target="_blank"`. Verificación: `npm run dev` y scroll a anclas.
4. **Crear WhyChoose y actualizar About.** Crear `components/WhyChoose.tsx` (id `por-que-elegir`, 3 cards con icono local) y actualizar `components/About.tsx` (id `quienes-somos`, dos bloques de texto literales + `fotografia-lab-01.jpg` con `next/image`). Integrar ambos en `app/page.tsx` entre Hero y Services. Verificación: build OK, imágenes cargan desde `/images/...`.
5. **Refactor Services y nuevos bloques intermedios.** Reescribir `components/Services.tsx` (id `servicios`) para mapear `serviceCategories` → grids con `next/image` y links a `/servicios/[slug]`; crear `components/Gestiona.tsx` (Vevidental + Orden trabajo), `components/ComoEmpacar.tsx` (5 SVG en grid), `components/Procedimientos.tsx` (6 `<video>` con `poster` o div placeholder si src no disponible y texto fallback). Insertar en `app/page.tsx` en orden: Services → Gestiona → ComoEmpacar → Procedimientos. Verificación: `npm run build` OK, no hotlinks externos.
6. **Actualizar Gallery, Testimonials y Contact.** `components/Gallery.tsx` (id `galeria`) con placeholders Instagram/TikTok + grid de obras; `components/Testimonials.tsx` mapea 9 testimonios con avatar y estrellas; `components/Contact.tsx` (id `contacto`) con logo blanco, redes, tel/mail/dirección literales y form estático (`onSubmit` previene default, valida email, muestra "¡Gracias! Tu mensaje fue recibido." y ofrece `mailto:novacad.social@gmail.com` + botón WhatsApp). Verificación: form no recarga, links externos abren en nueva pestaña.
7. **Crear rutas de servicios.** Crear `app/servicios/[slug]/page.tsx` con `generateStaticParams()` leyendo `serviceCategories.flatMap(c => c.items)`, `generateMetadata` por slug, layout con breadcrumb, `next/image`, descripción y CTA WhatsApp; `app/servicios/page.tsx` opcional como índice. Enlazar desde `Services.tsx`. Verificación: `npm run build` lista `○ /servicios/[slug]` (10 rutas) como Static.
8. **Pulido y verificación final.** Actualizar `app/layout.tsx` metadata (`title: "NOVACAD | Laboratorio Dental CAD/CAM - Prótesis Precisas"`, `description` literal), revisar `app/globals.css` sin cambios Tailwind, ejecutar `npm run lint` (0 errores) y `npm run build` completo; probar responsive 375/768/1440 sin overflow y con `next/image` optimizada.

## Acceptance criteria

- [ ] `app/page.tsx` renderiza en orden: Header, Hero (`#inicio`), WhyChoose, About (`#quienes-somos`), Services (`#servicios` con 4 categorías y 10 subitems con imagen local y link a `/servicios/[slug]`), Gestiona (Vevidental + Orden trabajo), ComoEmpacar (5 SVG), Procedimientos (6 videos/posters con fallback), Gallery (`#galeria`), Testimonials (9), Contact (`#contacto`), Footer.
- [ ] `public/images/` contiene al menos 30 archivos locales (logos, `zirconia.jpg`, `emax.jpg`, `pmma.jpg`, `resina-provisional.jpg`, `diseno-de-sonrisa.jpg`, `mock-up.jpg`, `Otros-Alineadores.jpg`, `guarda.jpg`, `guia.jpg`, `n-reparacion-dental.jpg`, `fotografia-lab-01.jpg`, iconos, 5 SVG empaque) y ningún componente usa hotlink a `ontechpro.com.mx`.
- [ ] `data/services.ts` exporta `ServiceCategory[]` con slugs `zirconia`, `e-max`, `pmma`, `resina-hibrida`, `diseno-de-sonrisa`, `mock-up`, `alineadores`, `guardas-oclusales`, `guias-quirurgicas`, `reparacion-dental`; `data/testimonials.ts` contiene 9 nombres literales (Silvia Reséndiz, Vianney Salazar, Alejandra Montes, Ale Ledesma, Juan Carlos Martínez, Romero Ruiz Paola, Eliana Ordoñez, Juan Ruiz, Ali Colin) con `rating: 5`.
- [ ] Header nav con anclas `#inicio` `#quienes-somos` `#servicios` `#galeria` `#contacto` hace scroll a secciones con esos `id`; cada `ServiceItem` navega a `/servicios/[slug]` y las 10 rutas responden 200 como `○ (Static)` en `npm run build`.
- [ ] CTAs externos idénticos al original: Lista de precios `https://drive.google.com/file/d/1PPoYiu9yjx-gO9PaDCmsOGz6u8TraAFE/view`, Enviar trabajo/WhatsApp `https://wa.me/message/WGEHL6GIRQIVL1?src=qr`, Vevidental `https://www.vevidental.com/novacad`, Orden de trabajo `https://drive.google.com/file/d/1TmrkULEnk59rYrwj4g8cKrSS9s8Q4UzE/view`, redes `facebook.com/profile.php?id=61585583129527`, `instagram.com/novacadental`, `tiktok.com/@novacad.dental` abren con `target="_blank"`.
- [ ] Contact muestra tel `56 6268 2487`, mail `novacad.social@gmail.com`, dirección `Cerezo 77A, Boulevares Impala, 55040, Ecatepec de Morelos, Méx`; el form valida email, previene reload, muestra mensaje de éxito y no intenta POST a backend roto.
- [ ] `npm run lint` pasa sin errores y `npm run build` completa con `✓ Compiled successfully` y `○ /` + 10 rutas `/servicios/*`.
- [ ] Responsive sin overflow en 375px, 768px y 1440px; imágenes servidas vía `next/image` con `alt` descriptivo.

## Decisions

- **Sí:** descargar todo a `public/images/` local. Fits con `AGENTS.md:16` (`public/images/` para galería) y evita dependencia externa/CORS.
- **No:** mantener hotlinks a `ontechpro.com.mx/images/*`. Frágil y rompe build offline.
- **Sí:** reinterpretación moderna con Geist y zinc/rounded-2xl del scaffold actual. Coherente con `app/globals.css:1` Tailwind v4 y `app/layout.tsx` Geist; evita replicar CSS Webflow.
- **No:** clon pixel-perfect Webflow. Costo alto y no pedido; se preservan textos/contenido 1:1 en lugar de pixeles.
- **Sí:** `ServiceCategory` con subitems y rutas `/servicios/[slug]`. Cumple decisión explícita del usuario "Home + rutas de servicio" y respeta One Single Page (home sigue siendo single page, servicios son detalle).
- **No:** array plano de 4 servicios como stub previo. Perdería 10 sub-páginas requeridas.
- **Sí:** form estático con validación + mailto/WhatsApp. El original falla ("Oops! Something went wrong"), así se entrega UX inmediata sin backend.
- **No:** API route `/api/contact` con SMTP. Va en spec futura si se necesita persistencia.
- **Sí:** IDs limpios `#inicio` etc. Normaliza duplicados del original (`#n-servicios` usado para Galería) y mejora a11y.
- **No:** preservar IDs legacy `#n-inicio` y URLs `protesis-fija-zirconia.html`. Se documentan como out-of-scope para redirects futuros.

## Risks

| Risk | Mitigation |
|---|---|
| Imágenes/videos con bloqueo hotlink o 404 al descargar | Script loguea faltantes, crea placeholder `public/images/placeholder.svg` y documenta en `scripts/download-novacad-assets.mjs`; build no bloquea por imagen faltante |
| Videos de Procedimientos sin `src` directo (solo `<video>` vacío en scrape) | Usar poster local + fallback textual "Tu navegador no soporta la reproducción de videos." y card placeholder; no intentar scrapear streams protegidos |
| Drift visual percibido como "no es copia" por usar Tailwind vs Webflow | Mantener textos 1:1 y logos/colores blanco/negro originales; decisión documentada arriba |
| `generateStaticParams` desincronizado si se edita `data/services.ts` sin rebuild | Fuente única `serviceCategories` usada tanto por `Services.tsx` como por `app/servicios/[slug]/page.tsx`; build falla si slug no existe |

## What is **not** in this spec

- Backend de contacto, CMS editable, feed vivo Instagram/TikTok, SEO avanzado (sitemap/JSON-LD), redirects legacy `.html` 1:1, animaciones/carruseles con librerías extra. Cada uno, si se necesita, va en su propia spec.

