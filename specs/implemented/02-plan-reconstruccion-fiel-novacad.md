# SPEC 02 - Plan de reconstrucción fiel de NOVACAD

> **Status:** Implemented
> **Depends on:** `specs/sol/master-prompt.md`  
> **Reference:** https://ontechpro.com.mx/novacad/  
> **Date:** 2026-09-23  
> **Source of truth:** sitio publicado y capturas locales  
> **Supersedes after approval:** decisiones visuales incompatibles de `specs/01-copia-novacad.md`

## Objective

Reconstruir la interfaz y experiencia de NOVACAD con alta fidelidad visual dentro de la arquitectura existente de Next.js, sin copiar el HTML de Webflow y sin introducir dependencias innecesarias.

La implementación debe conservar las prácticas actuales del proyecto: App Router, Server Components por defecto, TypeScript estricto, Tailwind CSS 4 y recursos locales.

## Decisions confirmed for this plan

- El sitio publicado y las capturas locales son la fuente principal de verdad.
- Se replicará el lenguaje visual real de NOVACAD, no una reinterpretación Geist/zinc.
- Se implementarán las nueve páginas de servicio publicadas y capturadas.
- No se añadirá una ruta de Reparación dental porque no existe en la referencia auditada.
- Galería permanecerá integrada visualmente en Procedimientos.
- No se instalarán dependencias nuevas salvo bloqueo técnico previamente aprobado.
- No se iniciará la implementación hasta que este documento cambie a estado `Approved`.

---

## Phase 1 - Local project audit

### Current architecture

- Next.js 16.3.6 con App Router.
- React 19.2.8 y TypeScript estricto.
- Tailwind CSS 4 configurado desde `app/globals.css` y `postcss.config.mjs`.
- Una sola ruta fuente: `/`.
- `app/page.tsx` compone ocho secciones como Server Components.
- No existen Client Components, APIs, Server Actions, autenticación, base de datos ni fetching remoto.
- No hay runner de tests configurado.
- Los scripts disponibles son `dev`, `build`, `start` y `lint`.

### Current page composition

1. `Header`
2. `Hero`
3. `About`
4. `Services`
5. `Gallery`
6. `Testimonials`
7. `Contact`
8. `Footer`

### Main findings

- El contenido actual corresponde a un estudio de arquitectura, no a NOVACAD.
- `public/images/` no contiene recursos visuales, aparte de `.gitkeep`.
- No existe navegación móvil.
- El formulario actual recarga la página y no envía datos útiles.
- Los enlaces sociales y datos de contacto son placeholders.
- No existen páginas de detalle de servicios en el código fuente.
- La metadata y el idioma siguen siendo los valores iniciales de Create Next App.
- Geist se carga desde `next/font`, pero `Arial` la reemplaza desde `app/globals.css`.
- Existe dark mode automático, aunque la referencia no presenta una variante oscura.
- `.next/` contiene rutas antiguas que no corresponden al código fuente y deberá regenerarse mediante un build limpio.

### Architecture to preserve

- App Router.
- `app/page.tsx` como Server Component.
- Alias `@/*`.
- TypeScript estricto.
- Tailwind CSS 4 sin `tailwind.config`.
- ESLint flat config.
- PostCSS con `@tailwindcss/postcss`.
- Estructura principal establecida por `AGENTS.md`.
- `lib/utils.ts` sin cambios, salvo una necesidad concreta.

---

## Phase 2 - Reference site audit

### Reference coverage

La auditoría incluyó:

- Home publicada.
- CSS generado por Webflow.
- 18 capturas desktop.
- 15 capturas mobile.
- Nueve páginas publicadas de servicios.
- Navegación, contenidos, CTAs, formulario, videos y enlaces externos.

### Visual system

| Element | Reference value |
|---|---|
| Body font | Montserrat |
| Hero font | AgencyB |
| Corporate blue | `#223a87` |
| Accent cyan | `#0089c0` |
| Main text | Aproximadamente `#333333` |
| Testimonials background | Aproximadamente `#f1f1f1` |
| Packaging background | Aproximadamente `#f8f8f8` |
| Desktop content width | Cerca de `80vw`, hasta aproximadamente 1500 px |
| Common radius | Entre 10 y 20 px |
| Header height | Aproximadamente `14vh` |
| Desktop hero height | Aproximadamente `70vh` |

La referencia no presenta modo oscuro.

### Real page order

1. Header.
2. Hero.
3. Por qué elegir NOVACAD.
4. Quiénes somos.
5. Servicios.
6. Gestiona tu trabajo.
7. Mándanos tu caso y Orden de trabajo.
8. Cómo empacar.
9. Procedimientos y Galería Instagram/TikTok.
10. Testimonios.
11. Contacto.
12. Derechos reservados.

### Header and navigation

- Desktop muestra logo a la izquierda y cinco enlaces a la derecha.
- Inicio se presenta como estado activo con fondo cian.
- En tablet y mobile aparece un menú desplegable vertical.
- Teléfono y WhatsApp son controles flotantes independientes, no elementos del header.
- No existe el CTA Cotizar del proyecto local actual.

### Hero

- Fondo fotográfico relacionado con tecnología CAD/CAM.
- Título centrado: Innovación Digital / Sonrisa Natural.
- Línea divisoria blanca.
- Subtítulo en dos líneas.
- CTA Lista de precios con fondo blanco.
- CTA Enviar trabajo con fondo azul.
- Mobile usa un recorte distinto de la misma composición.

### WhyChoose and About

- WhyChoose muestra tres iconos con labels, sin cards ni descripciones visibles.
- About usa texto e imagen en dos columnas en desktop.
- En mobile presenta título, imagen y texto en ese orden.
- El copy de About cambia ligeramente entre desktop y mobile; se conservará un único texto canónico con el mismo significado.

### Services

- Cuatro cards de categoría.
- Nueve servicios publicados distribuidos como 2 + 2 + 2 + 3.
- Cada card incluye slider de imágenes, título y enlaces subrayados.
- Desktop muestra cuatro columnas.
- Mobile muestra dos columnas.

Servicios publicados:

1. Zirconia.
2. E-Max.
3. PMMA.
4. Resina Híbrida.
5. Diseño de Sonrisa.
6. Mock up.
7. Alineadores.
8. Guardas Oclusales.
9. Guías Quirúrgicas.

### Intermediate sections

- Gestiona tu trabajo usa un banner fotográfico, una cápsula translúcida y el logo de Vevi Dental.
- Orden de trabajo aparece en una franja blanca independiente.
- Cómo empacar muestra cinco SVG distribuidos en filas de tres y dos.
- Procedimientos usa un video principal y una playlist lateral.
- En mobile la playlist se coloca debajo del reproductor.
- La Galería Instagram/TikTok forma parte del bloque de Procedimientos.

### Testimonials

- Nueve testimonios.
- Carrusel con tres cards visibles en desktop y dos en mobile.
- Cards grises con avatar, nombre, cinco estrellas y comentario.
- Sin flechas visibles; la paginación utiliza indicadores.

### Contact and footer

- Fondo azul corporativo continuo.
- Tres columnas en desktop: logo, datos y formulario.
- Una columna en mobile.
- Inputs blancos con radio moderado.
- Botón Enviar cian.
- Derechos reservados comparte la misma superficie azul.

### Service detail pages

- Barra superior azul con enlace Regresar.
- Imagen y contenido en dos columnas en desktop.
- Imagen seguida del contenido en mobile.
- Dos CTAs: Agenda una cita y Orden de trabajo.
- Categorías, etiquetas, casos de uso, beneficios o características y datos de contacto.
- No existe breadcrumb visual.

### Interactions identified

- Menú mobile abierto y cerrado.
- Estado activo de navegación.
- Sliders de imágenes de servicios.
- Playlist de videos seleccionable.
- Carrusel de testimonios.
- Controles nativos de video.
- Botones flotantes de teléfono y WhatsApp.
- Animaciones de entrada basadas en opacidad.

Los valores exactos de hover, focus, duración de animaciones y scroll-spy no pueden determinarse con certeza únicamente mediante las capturas.

---

## Phase 3 - Reference to local mapping

| Reference element | Local destination | Action |
|---|---|---|
| Desktop header | `components/Header.tsx` | Reuse and modify |
| Mobile navigation | `components/MobileNav.tsx` | Create |
| Floating phone and WhatsApp | `components/FloatingContact.tsx` | Create |
| Hero | `components/Hero.tsx` | Reuse and modify |
| Why choose NOVACAD | `components/WhyChoose.tsx` | Create |
| About | `components/About.tsx` | Reuse and modify |
| Service categories | `components/Services.tsx` | Reuse and modify |
| Category image slider | `components/ServiceCategoryCard.tsx` | Create |
| Gestiona tu trabajo | `components/Gestiona.tsx` | Create |
| Cómo empacar | `components/ComoEmpacar.tsx` | Create |
| Procedures section | `components/Procedimientos.tsx` | Create |
| Video selector | `components/VideoPlaylist.tsx` | Create |
| Instagram/TikTok gallery | `components/Gallery.tsx` | Reuse inside Procedures |
| Testimonials section | `components/Testimonials.tsx` | Reuse and modify |
| Testimonials carousel | `components/TestimonialCarousel.tsx` | Create |
| Contact section | `components/Contact.tsx` | Reuse and modify |
| Contact form | `components/ContactForm.tsx` | Create |
| Footer | `components/Footer.tsx` | Reuse and modify |
| Service detail template | `app/servicios/[slug]/page.tsx` | Create |

### Components that remain Server Components

- `app/page.tsx`.
- `Header.tsx` as wrapper.
- `Hero.tsx`.
- `WhyChoose.tsx`.
- `About.tsx`.
- `Services.tsx` as section wrapper.
- `Gestiona.tsx`.
- `ComoEmpacar.tsx`.
- `Procedimientos.tsx` as section wrapper.
- `Testimonials.tsx` as section wrapper.
- `Contact.tsx` as section wrapper.
- `Footer.tsx`.
- Service detail pages.

### Client boundaries

- `MobileNav.tsx` for open and close state.
- `ServiceCategoryCard.tsx` for image selection.
- `VideoPlaylist.tsx` for the active procedure.
- `TestimonialCarousel.tsx` for pagination and swipe behavior.
- `ContactForm.tsx` for validation and transparent fallback behavior.

---

## Phase 4 - Implementation plan

### Files to modify

- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `components/Header.tsx`
- `components/Hero.tsx`
- `components/About.tsx`
- `components/Services.tsx`
- `components/Gallery.tsx`
- `components/Testimonials.tsx`
- `components/Contact.tsx`
- `components/Footer.tsx`
- `data/services.ts`
- `data/testimonials.ts`
- `app/favicon.ico`, only if the original resource is available and verified

### Files to create

- `app/servicios/[slug]/page.tsx`
- `app/fonts/AGENCYB.TTF`
- `components/MobileNav.tsx`
- `components/FloatingContact.tsx`
- `components/WhyChoose.tsx`
- `components/ServiceCategoryCard.tsx`
- `components/Gestiona.tsx`
- `components/ComoEmpacar.tsx`
- `components/Procedimientos.tsx`
- `components/VideoPlaylist.tsx`
- `components/TestimonialCarousel.tsx`
- `components/ContactForm.tsx`
- `data/why-choose.ts`
- `data/procedures.ts`
- Verified assets under `public/images/`

### Files expected to remain unchanged

- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `postcss.config.mjs`
- `next-env.d.ts`
- `lib/utils.ts`

An expected-to-remain-unchanged file will only be modified if implementation reveals a concrete requirement. That change must be documented before it is made.

### Data strategy

`data/services.ts` will become the single source of truth for both the home cards and service detail routes.

Each service requires:

- Slug.
- Title.
- Category.
- Card image.
- Detail image.
- Introductory paragraphs.
- Categories and tags.
- Use cases.
- Section title such as Characteristics, Benefits or Advantages.
- Feature list.
- Metadata title and description.

`data/testimonials.ts` will contain the nine published testimonials.

`data/procedures.ts` will describe the active video, playlist entries, posters and accessible titles.

### Asset strategy

- Download images, SVG, font and accessible videos from known URLs in the reference.
- Verify HTTP status, MIME type, dimensions and non-empty file size.
- Store images and SVG under `public/images/`.
- Store procedure resources in a dedicated subdirectory below `public/images/` to preserve the project convention.
- Use `next/image` for raster images.
- Do not hotlink visual resources from the reference site.
- Do not invent URLs or silently replace major images.
- Use an explicit placeholder only when the original asset cannot be obtained, and document the difference.

### Typography strategy

- Replace Geist with Montserrat through `next/font/google`.
- Load AgencyB locally through `next/font/local`.
- Use AgencyB only for the Hero and any reference element that visibly uses the condensed display face.
- Use Montserrat for navigation, sections, cards, form and footer.
- Confirm font usage rights before production release.

### Styling strategy

- Keep Tailwind CSS 4 as the only styling system.
- Define brand colors and font variables in `app/globals.css` through the Tailwind v4 theme.
- Remove automatic dark mode because it does not exist in the reference.
- Preserve the reference proportions with approximately `80vw` desktop and `90vw` mobile content widths.
- Use moderate radii rather than the current generic `rounded-2xl` treatment.
- Reproduce shadows only where visible: hero text, CTAs, Gestiona capsule and packaging diagrams.
- Add visible keyboard focus without sacrificing visual fidelity.
- Add `scroll-margin-top` to anchor targets.

### Responsive strategy

The implementation will be mobile-first but will reproduce the observed Webflow transitions.

| Viewport | Expected behavior |
|---|---|
| Below 480 px | Compact hero, two-column services, stacked procedures and contact |
| 480 to 767 px | Mobile composition with larger text and spacing |
| 768 to 991 px | Tablet navigation, two-column layouts where supported |
| 992 px and above | Desktop header, four service cards and multi-column sections |
| 1440 to 1920 px | Wider content and larger typography without uncontrolled stretching |

Specific responsive requirements:

- No horizontal overflow.
- Mobile menu operable by keyboard and closable with Escape.
- Touch targets of at least 44 px.
- Hero uses responsive image positioning, not simple proportional scaling.
- Service cards remain two columns on narrow screens as in the reference, while preserving legibility.
- About changes content order on mobile.
- Procedure playlist moves below the video.
- Contact changes from three columns to one.
- Floating controls must not obscure interactive content.
- Images use stable aspect ratios and `object-fit` to prevent layout shift.

### Interaction strategy

- Implement navigation and sliders with React only.
- Do not add carousel or animation libraries.
- Use buttons with accessible names for all controls.
- Support keyboard navigation in menu, sliders and playlist.
- Pause autoplay behavior when the page is not visible, if autoplay is retained.
- Respect `prefers-reduced-motion`.
- Reproduce only confirmed and useful entry animations.

### Form strategy

No backend exists in the local project, and adding one is outside this plan.

The form will:

- Preserve the reference fields and visual design.
- Validate required name, email and message fields.
- Prevent an empty or invalid submission.
- Offer a transparent email or WhatsApp continuation.
- Avoid displaying a false success message when no server received the data.
- Remain isolated in `ContactForm.tsx` as a Client Component.

### SEO strategy

- Change document language to Spanish.
- Add the published NOVACAD title and description.
- Add Open Graph and Twitter metadata using a verified local image.
- Generate service metadata from `data/services.ts`.
- Keep one semantic H1 on the home and one H1 on each service page.
- Add useful alt text instead of reproducing the empty alt attributes from Webflow.

### Existing functionality preservation

- Keep the home at `/`.
- Preserve all section navigation through stable IDs.
- Keep external CTAs and social links unchanged unless verification shows they are invalid.
- Use `target="_blank"` with `rel="noopener noreferrer"` for external links.
- Keep the page mostly server-rendered.
- Do not introduce APIs, authentication, database changes or environment secrets.
- Do not modify unrelated code or configuration.

### Implementation sequence

1. Acquire and verify reference assets.
2. Define service, testimonial, why-choose and procedure data.
3. Configure fonts, metadata, theme tokens and global behavior.
4. Rebuild Header, MobileNav, FloatingContact and Hero.
5. Implement WhyChoose and About.
6. Implement Services and category image sliders.
7. Implement Gestiona and Cómo empacar.
8. Implement Procedimientos, video playlist and integrated Gallery.
9. Implement testimonials carousel.
10. Implement Contact, ContactForm and Footer.
11. Create the nine static service routes.
12. Add restrained animations and reduced-motion handling.
13. Perform visual comparison and corrections.
14. Run technical verification.

### Technical verification

Run in this order:

1. `npm run lint`
2. `npm run build`
3. `npx tsc --noEmit`

No automated test runner exists. Verification will also include:

- All internal links and anchors.
- All external CTAs.
- The nine service routes.
- Mobile menu keyboard behavior.
- Form validation and fallback.
- Video controls and fallback text.
- No missing local assets.
- No hydration warnings.
- No horizontal overflow.

### Visual verification

Compare the implementation with the local reference captures at:

- 375 px.
- 479 px.
- 768 px.
- 991 px.
- 1440 px.
- 1920 px.

Use the cycle:

`ANALYZE -> IMPLEMENT -> COMPARE -> CORRECT -> COMPARE AGAIN`

Priority of visual corrections:

1. Layout and proportions.
2. Header and navigation.
3. Hero composition.
4. Typography.
5. Section spacing.
6. Cards and media.
7. Color, radius and shadows.
8. Responsive behavior.
9. Interaction and animation.

---

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Missing or inaccessible assets | Visual mismatch | Verify every resource before component implementation |
| AgencyB license uncertainty | Production compliance | Confirm rights or approve a visually close replacement |
| Large procedure videos | Performance and bandwidth | Local posters, preload metadata and lazy loading |
| Original mobile layouts are dense | Readability issues | Match composition while protecting minimum touch and text sizes |
| Original floating controls obscure content | Mobile usability | Preserve position but add collision-safe spacing |
| Original form has no reliable backend | Lost submissions | Use explicit email or WhatsApp fallback without fake success |
| Content contains spelling inconsistencies | Content quality | Correct evident mistakes without changing meaning |
| Existing approved spec conflicts with reference | Scope ambiguity | This document becomes the active source only after approval |

---

## Acceptance criteria

- [ ] Home follows the audited section order.
- [ ] Visual identity uses Montserrat, AgencyB, corporate blue and cyan.
- [ ] Desktop and mobile compositions are recognizably faithful to the captures.
- [ ] Header navigation and mobile menu are functional and accessible.
- [ ] Floating phone and WhatsApp controls work without obscuring content.
- [ ] Services show four categories and nine published service links.
- [ ] Nine `/servicios/[slug]` routes are generated statically.
- [ ] Procedures provide one active player and a selectable playlist.
- [ ] Gallery remains integrated with Procedures.
- [ ] Nine testimonials are available through an accessible carousel.
- [ ] Contact details and external links match the published reference.
- [ ] The form validates input and clearly communicates its fallback behavior.
- [ ] Images and media use verified local assets.
- [ ] There is no dark mode or unrequested alternate theme.
- [ ] No unnecessary dependencies are added.
- [ ] No horizontal overflow occurs at audited viewport sizes.
- [ ] Keyboard focus is visible and interactive controls are semantic.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes and lists the nine static service routes.
- [ ] `npx tsc --noEmit` passes.

---

## Manual approval

Implementation is blocked until this section is completed manually.

- [ ] Scope reviewed.
- [ ] Nine service routes approved.
- [ ] High-fidelity visual direction approved.
- [ ] Local asset strategy approved.
- [ ] Frontend-only contact form fallback approved.
- [ ] Implementation authorized.

**Approval status:** Pending  
**Approved by:**  
**Approval date:**  
**Notes:**

To authorize implementation, change the document status to `Approved`, mark `Implementation authorized`, and complete the approval fields above.
