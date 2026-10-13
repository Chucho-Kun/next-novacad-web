# SPEC 12 — Animación scroll-reveal sutil en secciones del home

> **Status:** Approved
> **Depends on:** (ninguna)
> **Date:** 2026-10-13
> **Objective:** Añadir animación fadeIn + subida leve (24px) al entrar en viewport a las 9 secciones del home bajo el Hero, una sola vez por sección y sin dependencias nuevas.

## Por qué existe este spec

El home (`app/page.tsx`) muestra todo el contenido en scroll sin transición de entrada. Se quiere una aparición progresiva ligada al scroll del usuario, sutil y profesional, sin romper el carácter server component de `app/page.tsx`, sin afectar SEO/LCP del Hero y sin añadir peso de librerías.

## Scope

**In:**

- Nuevo `components/Reveal.tsx` (`"use client"`): wrapper con IntersectionObserver (`threshold: 0`, `rootMargin: "0px 0px -15% 0px"`) que aplica `opacity 0 + translateY(24px) → visible`, 600ms `ease-out`, una sola vez (`unobserve` al revelar).
- Envolver en `app/page.tsx` exactamente 9 secciones: `WhyChoose`, `About`, `Services`, `Gestiona`, `ComoEmpacar`, `Procedimientos`, `Testimonials`, `Faq`, `Contact`. `Header`, `FloatingContact`, `Hero` y `Footer` quedan intactos.
- Script inline en `app/layout.tsx` que añade la clase `js` a `<html>`; estilos en `app/globals.css`: el estado oculto vive solo bajo el selector `.js .reveal` (sin JS no hay clase y todo queda visible), `.reveal-visible` muestra el contenido. Sin bloque nuevo de `prefers-reduced-motion`: la regla global existente (`globals.css:101-114`) ya anula transiciones.
- Las secciones visibles en el viewport inicial (p. ej. `WhyChoose` bajo el Hero) se revelan al montar: es el comportamiento esperado, no un fallo.

**Out of scope (for future specs):**

- Animar `Hero`, `Header`, `FloatingContact` o `Footer`.
- Animación por elementos internos (títulos/cards/imágenes con stagger).
- Aplicar en `/servicios/[slug]`, `/videos` o `/videos/[id]`.
- Librería externa (`motion`, `framer-motion`, `gsap`, `aos`).
- Cambios visuales, copy, layout, SEO, sitemaps o `data/*`.
- Parámetros configurables por sección (distancia/duración distintas por bloque).

## Data model

Esta feature no introduce nuevas estructuras de datos. Reutiliza la composición existente de `app/page.tsx`.

```tsx
// components/Reveal.tsx — props (ilustrativo, no código final)
type RevealProps = {
  children: React.ReactNode;
  className?: string; // default: "", se fusiona sin sobreescribir .reveal/.reveal-visible
  // Valores fijos, sin props configurables en este spec:
  // opacity 0→1, translateY 24px→0, 600ms ease-out,
  // IntersectionObserver { threshold: 0, rootMargin: "0px 0px -15% 0px" }, once
};
```

Convenciones:

- `app/page.tsx` sigue siendo server component; solo `Reveal.tsx` es `"use client"` (sería el 6º, hoy hay 5 según `AGENTS.md`).
- El estado oculto nunca se renderiza en el SSR: el CSS lo aplica solo bajo `.js .reveal`, y la clase `js` la pone un script inline en `app/layout.tsx`. Sin JS no hay ocultamiento posible.
- `threshold: 0` + `rootMargin` bottom del −15% en vez de ratio 0.15: dispara cuando el borde superior entra al 85% del viewport y funciona con secciones de cualquier altura (ver grilling 2026-10-13).
- Sin persistencia entre sesiones; el estado revelado vive solo en memoria/DOM.

## Implementation plan

1. **Crear `components/Reveal.tsx`.** Skeleton client con IntersectionObserver (`threshold: 0`, `rootMargin: "0px 0px -15% 0px"`), `unobserve` tras revelar, sin clase oculta en el SSR (el ocultamiento lo gobierna `.js .reveal`). Verificación: `npx tsc --noEmit` pasa.
2. **Script `js` en `app/layout.tsx` + clases en `app/globals.css`.** Script inline que añade `js` a `<html>`; `.js .reveal` (opacity 0, translateY 24px, transition 600ms ease-out) + `.reveal-visible` (opacity 1, none). Sin bloque nuevo de `prefers-reduced-motion` (la regla global existente lo cubre). Verificación: con JS desactivado no existe la clase `js` y todo es visible; inspección en DevTools sin regresión de `.site-container` ni `scroll-margin`.
3. **Envolver las 9 secciones en `app/page.tsx`.** Un `<Reveal>` por sección, sin mover los `id` de anclas (viven en el `<section>` interno de cada componente) ni props internas. Verificación: `npm run lint` pasa, `app/page.tsx` sigue sin `"use client"`.
4. **Verificación manual + build.** Scroll lento de arriba a abajo (cada sección hace fade+subida una vez, las visibles al cargar se revelan al montar), scroll arriba/abajo no re-anima, `prefers-reduced-motion` muestra directo, con JS desactivado todo visible. `npm run lint` + `npm run build` en verde.

## Acceptance criteria

- [ ] Las 9 secciones (WhyChoose → Contact) hacen fadeIn + subida leve al entrar en viewport; Hero/Header/FloatingContact/Footer no se animan.
- [ ] La animación ocurre una sola vez por sección; re-entrar no la repite.
- [ ] La transición computada es exactamente 600ms `ease-out` y el desplazamiento exactamente 24px (valores fijos en CSS, verificables en DevTools).
- [ ] El wrapper Reveal no altera el flujo del layout: solo `opacity`/`transform`, sin márgenes, paddings ni cambios de tamaño que desplacen el resto del contenido.
- [ ] Con `prefers-reduced-motion: reduce` el contenido aparece directo sin animación (vía la regla global existente de `globals.css:101-114`).
- [ ] Con JS desactivado todo el contenido es visible (`<html>` no tiene la clase `js`, luego `.js .reveal` no aplica).
- [ ] `app/page.tsx` sigue siendo server component (sin `"use client"`).
- [ ] No hay dependencias nuevas en `package.json`.
- [ ] `npm run lint` pasa y `npm run build` compila con `✓ Compiled successfully`.

## Decisions

- **Sí:** componente `Reveal` propio con IntersectionObserver. Sin peso extra, control total, patrón ya conocido en el repo (client aislado).
- **No:** librería `motion`/`framer-motion`. Más API pero peso y mantenimiento injustificados para un fade+subida.
- **No:** CSS `animation-timeline: view()`. Sin JS pero soporte irregular en Safari/Firefox; IO es más seguro hoy.
- **Sí:** solo home `/`. Alcance mínimo; servicios/videos quedan para su propia spec si se quiere.
- **Sí:** Hero excluido. Es above-the-fold y su LCP ya está optimizado (SPEC 11); animarlo degradaría la primera pintura.
- **Sí:** sección completa, no elementos internos. Un wrapper por sección = diff mínimo, sin tocar 9 componentes internos.
- **Sí:** una sola vez. Re-animar a cada entrada distrae y cuesta rendimiento.
- **Sí:** `prefers-reduced-motion` + visible-sin-JS. Accesibilidad y SEO por encima del efecto.
- **Sí:** clase `js` vía script inline en `app/layout.tsx` como mecanismo no-JS (grilling 2026-10-13). El SSR nunca emite estado oculto; el CSS oculta solo bajo `.js .reveal`. Descarta el mounted-state por su flash visible→oculto→visible.
- **Sí:** `threshold: 0` + `rootMargin "0px 0px -15% 0px"` en vez de threshold 0.15 (grilling 2026-10-13). Un ratio fijo puede no alcanzarse nunca en secciones más altas que el viewport (Services en móvil) y dejarlas invisibles; el disparo por borde superior funciona con cualquier altura.
- **Sí:** sección completa aceptando el tradeoff en secciones largas (grilling 2026-10-13). Services se revela una vez al asomar su borde superior; el stagger interno, si se quiere, va en su propia spec.
- **Sí:** Footer excluido (grilling 2026-10-13). El voto "todas menos Hero/Header" lo mencionaba como incluido, pero se resolvió dejarlo intacto: el fade al final de página aporta poco y suele verse raro.
- **Sí:** secciones en viewport inicial se revelan al montar (grilling 2026-10-13). WhyChoose animará su entrada al cargar; declarado esperado para que no se reporte como fallo.
- **Sí:** criterios exactos en vez de aproximados (grilling 2026-10-13). 600ms/24px fijos verificables en DevTools; el "sin CLS" vago se sustituye por el criterio estructural de no alterar el flujo.
- **Definición rápida con clarificación completa.** Fase 2 hecha en dos bloques; no se omitió.

## Risks

| Risk | Mitigation |
|---|---|
| `opacity:0` inicial deja contenido invisible si IO nunca dispara | El ocultamiento vive solo bajo `.js .reveal` y el observer usa `threshold: 0` (dispara al primer píxel); el criterio sin-JS lo cubre |
| Envolver secciones rompe anclas `[id]` o `scroll-margin` | No se mueven los `id`; los estilos de `globals.css:82` se conservan |
| CLS por el translateY | 24px con `ease-out` + `will-change` acotado; verificación visual de scroll |
| Hidratación parpadea (contenido visible → oculto → visible) | Clase inicial aplicada desde el primer render client; sin cambio de layout |

## What is **not** in this spec

- Animar Hero/Header/FloatingContact/Footer, stagger interno, otras rutas, librerías externas, parámetros por sección, cambios de diseño/copy/SEO. Cada uno, si se necesita, va en su propia spec.
