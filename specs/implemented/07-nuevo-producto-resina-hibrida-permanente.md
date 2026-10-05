# SPEC 07 — Nueva sección Nuevo producto con detalle Resina híbrida permanente

> **Status:** Implemented
> **Depends on:** SPEC 03
> **Date:** 2026-10-02
> **Objective:** Agregar la sección "Nuevo producto" en `components/Services.tsx` con card de un solo item que enlaza a la nueva página `/servicios/resina-hibrida-permanente` con el contenido de `screenshots/propuesta-nueva-pagina.png` usando el template de detalle existente.

## Scope

**In:**

- Nueva categoría `nuevo-producto` con un único item `resina-hibrida-permanente` en `data/services.ts` (título, `href`, imagen aportada por el usuario, `alt`, `intro`, `categories`, `tags`, `idealForTitle`, `idealFor`, `featuresTitle`, `features`, `metaTitle`, `metaDescription`).
- Render de la sección "NUEVO PRODUCTO" en `components/Services.tsx` con el mismo `ServiceCategoryCard` de las otras 4 cards (carrusel de 1 imagen + link subrayado `Resina Híbrida - Prótesis Permanentes` según `screenshots/propuesta-slider.jpg`).
- Nueva ruta estática `/servicios/resina-hibrida-permanente` generada automáticamente por el template existente `app/servicios/[slug]/page.tsx` (barra azul `[Regresar]`, 2 CTAs, categorías/etiquetas, lista ideal-para, `CARACTERÍSTICAS`, `DETALLES DE CONTACTO`, `Footer`, `JsonLd` `Service`+`BreadcrumbList`).
- Eliminación de `data/new-product.ts` (datos duplicados/rotos con slugs `zirconia`/`e-max` colisionados) y de su import en `Services.tsx`; corrección del `id` duplicado `servicios-titulo` (dos `h2` con el mismo `id` hoy en `Services.tsx:8` y `:22`).
- Imagen aportada por el usuario en ruta fija `public/images/resina-hibrida-permanente.jpg` (card + cabecera del detalle, como en SPEC 03); hasta entregarla se usa placeholder con el mismo nombre.
- Herencia automática de SEO: `generateStaticParams`, `generateMetadata`, `app/sitemap.ts:8` e `ItemList` en `app/page.tsx:47` leen solo `serviceCategories`, por lo que el slug nuevo entra sin tocar esos archivos.

**Out of scope (for future specs):**

- Banner custom a ancho completo distinto de `ServiceCategoryCard` (descartado en decisiones).
- Transcripción del banner oscuro del slider (textos "Resina 3D de alta tecnología", "52% de cargas cerámicas", "Nuevo Material de Trabajo") como contenido de página; solo se usa como referencia visual.
- Segunda imagen separada banner-vs-detalle; si el usuario entrega dos fotos se referencian sin cambiar el diseño.
- Redirects legacy, cambios en CTAs (`wa.me` / Drive), contacto, tokens `brand-*`, `next.config.ts` o nuevas dependencias.

## Data model

Esta feature extiende estructuras existentes y elimina un archivo divergente.

```ts
// data/services.ts — nueva categoría (fuente única, elimina data/new-product.ts)
export const serviceCategories: ServiceCategory[] = [
  /* ...4 categorías existentes sin cambios... */,
  {
    slug: "nuevo-producto",
    title: "Nuevo producto",
    items: [
      {
        slug: "resina-hibrida-permanente",
        title: "Resina Híbrida - Prótesis Permanentes",
        href: "/servicios/resina-hibrida-permanente",
        image: "/images/resina-hibrida-permanente.jpg", // aportada por el usuario
        alt: "Prótesis permanente de resina híbrida Bio Crown Diamond",
        intro: [
          "Bio Crown Diamond es una resina de alta tecnología para impresión 3D dental, desarrollada para la fabricación de restauraciones permanentes con excelente resistencia y biocompatibilidad.",
          "Diseñada para restauraciones permanentes, con apariencia similar a la dentición natural.",
          "Permite obtener resultados funcionales y naturales mediante un flujo de trabajo completamente digital.",
        ],
        categories: ["Prótesis Dental Permanente", "Resina Híbrida"],
        tags: ["Resina híbrida permanente", "Bio Crown Diamond", "prótesis permanente impresa 3D"],
        idealForTitle: "Se utiliza principalmente en:",
        idealFor: [
          "Coronas unitarias definitivas",
          "Inlays, onlays y carillas",
          "Incrustaciones",
          "Prótesis sobre implantes",
          "Núcleos para prótesis estratificadas",
        ],
        featuresTitle: "CARACTERÍSTICAS",
        features: [
          "Resistencia a la flexión de 143 MPa",
          "Máxima estética y naturalidad",
        ],
        metaTitle: "Resina Híbrida Permanente | NOVACAD Laboratorio Dental",
        metaDescription:
          "Resina híbrida Bio Crown Diamond para impresión 3D: restauraciones permanentes biocompatibles de 143 MPa con estética natural y flujo digital.",
      },
    ],
  },
];
```

Convenciones:

- `slug`/`href` únicos: `resina-hibrida-permanente` no colisiona con `resina-hibrida` (provisional).
- `categories`/`tags` corregidos a resina permanente; la captura traía literales de Zirconia por arrastre y se corrigen dejando constancia aquí.
- `image` reutiliza el asset de la card como cabecera del detalle (patrón SPEC 03); `alt` descriptivo nuevo.
- Se elimina `data/new-product.ts` con sus tipos duplicados `ServiceItem`/`ServiceCategory`; solo vive el de `data/services.ts:1`.

## Implementation plan

1. **Extender `data/services.ts` con la categoría `nuevo-producto`.** Añadir el bloque del data model con el copy literal de la captura y `categories`/`tags` corregidos. Verificación: `npx tsc --noEmit` pasa.
2. **Eliminar `data/new-product.ts`.** Borrar el archivo y confirmar que ningún import restante lo referencia. Verificación: `grep new-product` sin resultados salvo el spec.
3. **Reescribir el bloque NUEVO PRODUCTO en `components/Services.tsx`.** Quitar el import de `new-product`, renderizar la nueva categoría desde `serviceCategories` (find por `slug === "nuevo-producto"` o último elemento), y dar `id` único al segundo `h2` (ej. `nuevo-producto-titulo`). Verificación: `npm run dev` muestra 5 cards (4 + 1) y el link apunta a `/servicios/resina-hibrida-permanente`.
4. **Colocar la imagen aportada.** Guardar la foto del usuario como `public/images/resina-hibrida-permanente.jpg`; hasta recibirla usar placeholder con el mismo nombre y el `alt` del data model. Verificación: card y `/servicios/resina-hibrida-permanente` cargan sin 404 de `next/image`.
5. **Verificación técnica final.** Ejecutar `npm run lint`, `npm run build`; confirmar 10 rutas `/servicios/*` como `Static` (9 + la nueva), sitemap y JSON-LD la incluyen sin tocar código. Verificación: `✓ Compiled successfully`, 0 errores de tipos.

## Acceptance criteria

- [ ] `data/services.ts` contiene la categoría `nuevo-producto` con el item `resina-hibrida-permanente` y todos los campos del data model; `data/new-product.ts` ya no existe.
- [ ] `components/Services.tsx` no importa `new-product`, muestra la card "Nuevo producto" con `ServiceCategoryCard` y su link navega a `/servicios/resina-hibrida-permanente`.
- [ ] No hay `id` duplicado: los dos `h2` de la sección tienen `id` distintos.
- [ ] `/servicios/resina-hibrida-permanente` renderiza con el template existente (barra `[Regresar]`, título, 3 párrafos intro, 2 CTAs, categorías/etiquetas corregidas, lista de 5 usos, `CARACTERÍSTICAS` con 2 bullets, `DETALLES DE CONTACTO`, `Footer`).
- [ ] La imagen `public/images/resina-hibrida-permanente.jpg` carga en card y detalle sin 404 y con el `alt` descriptivo.
- [ ] `npm run build` lista 10 rutas `/servicios/*` como `Static` y compila con `✓ Compiled successfully`; `npm run lint` pasa.
- [ ] Navegación desde `/#servicios` a la nueva página y regreso con `[Regresar]` preserva anclas; slug inexistente sigue dando 404.

## Decisions

- **Sí:** slug `resina-hibrida-permanente`. Evita colisión con `resina-hibrida` provisional y es descriptivo; `bio-crown-diamond` se descarta por romper la convención de títulos por material/uso.
- **Sí:** transcribir intro/listas/features literal y corregir solo `categories`/`tags`. La captura trae etiquetas de Zirconia por arrastre; copiarlas tal cual contaminaría SEO y filtros.
- **Sí:** `ServiceCategoryCard` de 1 item para la nueva sección. Reutiliza diseño, a11y y responsive existentes; banner custom a ancho completo se descarta por romper la retícula de 4 cards.
- **Sí:** rutas fijas + placeholder (`/images/resina-hibrida-permanente.jpg`). El usuario sustituye el archivo sin cambiar código; rutas exactas provistas después se aceptan como alias.
- **Sí:** unificar en `data/services.ts` y borrar `data/new-product.ts`. El archivo separado duplica tipos y traía slugs colisionados; unificar hace que sitemap, `generateStaticParams`, `generateMetadata` y `ItemList` hereden la página gratis.
- **No:** incluir textos del banner del slider ("52% cargas cerámicas", "Nuevo Material de Trabajo") en el detalle. Son claims del banner, no de la ficha; si se quieren, van como dato nuevo aportado por el usuario.
- **Decisión rápida sin repregunta:** spec redactado directo tras tus 5 respuestas (quick definition registrada a petición del flujo).

## Risks

| Risk | Mitigation |
|---|---|
| Foto del usuario llega con otro nombre/formato o después del código | Ruta fija + placeholder con mismo nombre y `width/height` explícitos; sustituir archivo no cambia código |
| Card de 1 item muestra flechas de carrusel inútiles | `ServiceCategoryCard` con 1 item cicla sobre sí mismo; se acepta como estado inicial, ocultar flechas condicionalmente es ajuste menor dentro del paso 3 |
| Copy final del usuario difiere de la transcripción de la captura | Corrección es solo dato en `data/services.ts`, sin tocar diseño ni template |

## What is **not** in this spec

- Banner a ancho completo, segunda imagen banner-vs-detalle, claims del banner como contenido, redirects legacy, cambios en CTAs/contacto/tokens/config o nuevas dependencias. Cada uno, si se necesita, va en su propia spec.
