# SPEC 06 — Fichas Cómo empacar desde datos con diseño propuesta

> **Status:** Implemented
> **Depends on:** SPEC 02
> **Date:** 2026-10-02
> **Objective:** Reemplazar los 5 SVG de `components/ComoEmpacar.tsx` por fichas con diseño de `screenshots/propuesta-ficha.png` alimentadas desde `data/como-empacar.ts` con imagen aportada por el usuario.

## Scope

**In:**

- Nuevo `data/como-empacar.ts` con tipo `ComoEmpacarStep` y arreglo de 5 pasos migrados desde el texto visible de los SVG actuales.
- Reescritura de `components/ComoEmpacar.tsx` como Server Component que renderiza `ol > li` de fichas: barra lateral azul, círculo `bg-brand-deep` solapado con `next/image` del icono blanco, número fantasma `01–05` por índice, título, párrafos, lista `ul` de bullets opcional y nota al pie con divisor opcional.
- Grid responsive `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` con última fila centrada, sobre fondo `bg-brand-soft` y título `Cómo empacar` existentes.
- Iconos como imágenes que provee el usuario en `public/images/como-empacar/` (ruta + `alt` por ficha en los datos); círculo y número construidos en CSS, no dentro de la imagen.
- Borrado de `public/images/n-img-como-empacar-1.svg` … `-5.svg` y de toda referencia a ellos.

**Out of scope (for future specs):**

- Transcribir o redactar textos nuevos más allá de migrar lo visible en los 5 SVG; si el usuario entrega copy nuevo va como dato, sin cambiar el diseño.
- Carrusel, animaciones scroll-reveal, hover 3D o filtros.
- Nuevas fuentes, nuevas dependencias o cambios en `app/globals.css` / tokens `brand-*`.
- Cambios en SEO, JSON-LD, sitemap o `#como-empacar` como ancla.
- Optimización o generación de las imágenes aportadas (solo se referencian y se les da `width/height` + `alt`).

## Data model

```ts
// data/como-empacar.ts
export type ComoEmpacarStep = {
  id: string;            // ej: "desinfectar"
  title: string;         // ej: "Desinfectar todos los materiales"
  body: string[];        // párrafos, ej: ["incluidos en la caja y envolver..."]
  bullets?: string[];    // ej: ["Coronas sueltas.", "Puentes.", ...]
  note?: string;         // nota bajo divisor, ej: "Preferentemente arcadas completas."
  icon: string;          // ej: "/images/como-empacar/paso-1-icono.png"
  iconAlt: string;       // ej: "Icono de desinfección de materiales"
};

export const comoEmpacarSteps: ComoEmpacarStep[] = [/* 5 items */];
```

Convenciones:

- Fuente única: `comoEmpacarSteps`; `ComoEmpacar.tsx` no hardcodea textos.
- `icon` apunta a `public/images/como-empacar/` aportada por el usuario; hasta entregarla se usan placeholders con el mismo nombre y `alt` descriptivo.
- `bullets` y `note` opcionales permiten los 3 formatos de la propuesta sin ramas de diseño distintas.
- Número `01–05` se deriva del índice (`String(i+1).padStart(2,"0")`), no se guarda en datos.

## Implementation plan

1. **Crear `data/como-empacar.ts`.** Definir `ComoEmpacarStep` y volcar los 5 pasos con el texto visible de los SVG actuales (`title/body/bullets?/note?/icon/iconAlt`). Verificación: `npx tsc --noEmit` tipa y el import no rompe el build.
2. **Reescribir `components/ComoEmpacar.tsx`.** Mantener `section#como-empacar` + `h2` + `ol/li` con `aria-label`; mapear `comoEmpacarSteps` a la ficha propuesta (barra, círculo + `Image`, fantasma, título, párrafos, `ul` condicional, divisor + nota condicional). Verificación: `npm run dev` muestra 5 fichas con datos del TS.
3. **Aplicar grid responsive y pulido visual.** `grid gap` + `pt` para el solape, `rounded-2xl bg-white border shadow-sm`, `focus-visible` heredado. Sin `"use client"`. Verificación: mobile 1 col, `md` 2 col, `lg` 3 col con fila 2 centrada; sin overflow horizontal.
4. **Conectar imágenes definitivas y borrar SVG viejos.** Sustituir placeholders por los archivos entregados en `public/images/como-empacar/` y eliminar `n-img-como-empacar-1..5.svg`. Verificación: `grep -r n-img-como-empacar` sin resultados y `next/image` sin 404.
5. **Verificación técnica y visual final.** Ejecutar `npm run lint`, `npm run build`; comparar lado a lado con `screenshots/propuesta-ficha.png` (barra, círculo, fantasma, tipografía, divisor). Verificación: `✓ Compiled successfully`, 0 errores de tipos.

## Acceptance criteria

- [ ] `data/como-empacar.ts` existe con 5 items tipados (`title/body/icon/iconAlt` obligatorios, `bullets/note` opcionales).
- [ ] `components/ComoEmpacar.tsx` no referencia ningún `n-img-como-empacar-*.svg` y renderiza las 5 fichas desde los datos con `ol/li`.
- [ ] Cada ficha muestra círculo `bg-brand-deep` solapado con icono `next/image`, número fantasma `01–05` arriba-derecha y barra lateral azul.
- [ ] Fichas sin `bullets` no renderizan `ul`; fichas sin `note` no renderizan divisor.
- [ ] Layout es 1 col móvil, 2 col `md`, 3 col `lg` con las 2 últimas centradas y sin scroll horizontal.
- [ ] Los 5 `.svg` viejos están borrados y no hay referencias rotas ni 404 de imágenes.
- [ ] Sección conserva `id="como-empacar"`, título y `aria-label` de pasos; sigue siendo Server Component.
- [ ] `npm run lint` pasa y `npm run build` compila con `✓ Compiled successfully`.

## Decisions

- **Sí:** `data/*.ts` tipado en vez de `.json` puro. Sigue `why-choose.ts` / `procedures.ts` / `services.ts`, da tipado y no añade fetch.
- **No:** `.json` suelto o `public/*.json` con fetch. Rompe la convención del repo y añade estado de carga innecesario.
- **Sí:** imágenes aportadas por el usuario + círculo en CSS. Separa contenido (tu PNG/SVG blanco) de cromo (círculo/numero) y permite cambiar iconos sin rediseñar.
- **No:** imagen completa con círculo incluido ni icono `lucide`. Lo primero impide reutilizar el círculo; lo segundo contradice que tú provees la imagen.
- **Sí:** schema flexible (`body[]` + `bullets?` + `note?`). Cubre los 3 formatos de la propuesta sin forzar bullets en todas.
- **No:** schema rígido solo `title+text`. No representa la ficha 02 (bullets) ni la 03 (nota con divisor).
- **Sí:** grid responsive centrado. Recomendado frente a mantener filas fijas `3+2` con anchos `vw`.
- **No:** conservar anchos `w-[25vw]`/`w-[80vw]` actuales ni carrusel móvil. Lo primero no escala a fichas de texto; lo segundo añade JS sin pedirlo.
- **Sí:** borrar los 5 SVG. Evita assets huérfanos y confusión.
- **No:** conservarlos. Quedarían muertos en `public/`.
- **Sí:** mantener `ol/li` numerado. Preserva accesibilidad y SEO de pasos ordenados.

## Risks

| Risk | Mitigation |
|---|---|
| Texto real de los SVG no legible al transcribir | Paso 1 transcribe lo visible y el usuario valida copy en review del spec `Draft`; corrección es solo dato, sin tocar diseño |
| Imágenes definitivas llegan después con otro tamaño/formato | Rutas fijas en `public/images/como-empacar/` + `width/height` explícitos en `next/image`; sustituir archivo no cambia código |
| 5 fichas en grid 3 col dejan fila de 2 desbalanceada | Centrar última fila con `justify-center` / `col-start`; verificado en paso 5 en `lg` |
| Título largo (ficha 03) rompe altura uniforme | Alturas naturales por tarjeta, sin truncar; grid tolera desnivel; no usar `line-clamp` |

## What is **not** in this spec

- Copy nuevo más allá de la migración, carrusel o animaciones, nuevas fuentes o dependencias, cambios en `globals.css`/tokens, SEO/JSON-LD/sitemap, ni optimización de imágenes. Cada uno, si se necesita, va en su propia spec.
