# SPEC 08 — Animación de deslizamiento en carrusel de ServiceCategoryCard

> **Status:** Implemented
> **Depends on:** SPEC 07
> **Date:** 2026-10-05
> **Objective:** Reemplazar el parpadeo actual del carrusel de `components/ServiceCategoryCard.tsx` por un deslizamiento horizontal CSS de ~300ms donde la foto saliente y la entrante se ven al mismo tiempo.

## Scope

**In:**

- Reescritura del viewport del carrusel en `components/ServiceCategoryCard.tsx` como pista deslizante (track `flex` con `transform: translateX(-index * 100%)` y `transition` CSS), de modo que al cambiar de foto la saliente y la entrante sean visibles simultáneamente.
- Comportamiento direccional estándar: flecha siguiente (`showNext`) desliza hacia la izquierda (la nueva entra desde la derecha); flecha anterior (`showPrevious`) desliza hacia la derecha (la nueva entra desde la izquierda).
- Duración ~300ms con `ease-out`, solo con CSS/Tailwind, sin nuevas dependencias.
- Respeto a `prefers-reduced-motion`: con reducción de movimiento activada el cambio es instantáneo, sin deslizamiento.
- Clics rápidos sin bloqueo: cada clic actualiza el índice y la transición sigue al último estado, sin deshabilitar botones ni encolar animaciones.
- Aplica a las dos variantes del mismo componente (`wide=false` y `wide=true`); sin cambios visuales en card, textos, links, tamaños ni proporciones (`aspect-10/7` / `aspect-812/300`).
- Preservar accesibilidad existente: `role="group"`, `aria-roledescription="carrusel"`, `aria-label` por categoría, botones con `aria-label` anterior/siguiente y `p` con `aria-live="polite"` del contador.

**Out of scope (for future specs):**

- Gestos táctiles (swipe), autoplay, paginación por puntos o miniaturas.
- Cambios en `data/services.ts`, `components/Services.tsx`, SEO, JSON-LD, sitemap, rutas o `app/globals.css` / tokens `brand-*`.
- Nuevas dependencias (framer-motion u otras) o cambios en `next.config.ts`.
- Rediseño de flechas, tamaños de card o tratamiento de imágenes.

## Data model

Esta feature no introduce datos nuevos; se declara explícitamente sin cambios de modelo.

- Sin cambios en `ServiceCategory` / `ServiceItem` de `data/services.ts`.
- Estado local existente `activeIndex` en `ServiceCategoryCard.tsx` se mantiene como fuente de verdad; la dirección se deriva del salto de índice (siguiente = izquierda, anterior = derecha, con wrap-around tratado como misma dirección del botón pulsado).

## Implementation plan

1. **Convertir el viewport en pista deslizante.** Renderizar todas las `category.items` como tiras (`flex`, cada slide `min-w-full`) dentro del contenedor `overflow-hidden` existente, con `transform: translateX(-activeIndex * 100%)` y `transition: transform ~300ms ease-out`; mantener `next/image` con `fill` + `object-cover` y `sizes` actuales por variante. Verificación: `npm run dev` muestra la primera foto y al pulsar flechas se ve el deslizamiento con ambas fotos en pantalla.
2. **Aplicar dirección según botón.** `showNext` avanza el índice (pista se mueve a la izquierda) y `showPrevious` retrocede (pista se mueve a la derecha), incluyendo el wrap-around (última → primera y primera → última) sin invertir la dirección del gesto. Verificación: pulsar siguiente siempre entra desde la derecha; pulsar anterior siempre entra desde la izquierda.
3. **Añadir `prefers-reduced-motion` y tolerancia a clics rápidos.** Con `motion-reduce:transition-none` (o media query equivalente) el cambio es instantáneo; no deshabilitar botones ni bloquear el índice durante la transición, la pista sigue al último `activeIndex`. Verificación: con reducción de movimiento activada no hay deslizamiento; clics rápidos sucesivos terminan en el índice correcto sin atascos.
4. **Verificación técnica y visual final.** Ejecutar `npm run lint`, `npm run build`; revisar en móvil y `lg` ambas variantes (normal y `wide` de nuevo producto) que no haya overflow horizontal, salto de altura ni parpadeo. Verificación: `✓ Compiled successfully`, 0 errores de tipos.

## Acceptance criteria

- [ ] Al pulsar la flecha siguiente la foto actual sale hacia la izquierda y la nueva entra desde la derecha, visibles ambas durante la transición.
- [ ] Al pulsar la flecha anterior el movimiento es espejo: la actual sale hacia la derecha y la nueva entra desde la izquierda.
- [ ] La transición dura ~300ms con easing suave y usa solo CSS/Tailwind, sin dependencias nuevas en `package.json`.
- [ ] Con `prefers-reduced-motion` activado el cambio de foto es instantáneo, sin deslizamiento.
- [ ] Clics rápidos sucesivos no bloquean los botones y terminan en el índice correcto.
- [ ] Las variantes normal y `wide` conservan tamaños, proporciones, textos, links y estilos de flechas; sin overflow horizontal ni salto de altura.
- [ ] Se conservan `role="group"`, `aria-roledescription`, `aria-label` de botones y el `aria-live` del contador `Imagen N de M`.
- [ ] `npm run lint` pasa y `npm run build` compila con `✓ Compiled successfully`.

## Decisions

- **Sí:** dirección estándar (siguiente sale a la izquierda). Frente al literal "todo se mueve a derecha" del pedido inicial, el estándar de carruseles comunica mejor el sentido de avance/retroceso y fue la opción elegida en la aclaración.
- **Sí:** solo CSS/Tailwind con pista `flex` + `translateX`. Sin costo de dependencia ni JS de animación; suficiente para un deslizamiento sencillo.
- **No:** framer-motion u otra librería. Sobredimensionado para una transición de ~300ms entre fotos estáticas.
- **Sí:** ~300ms `ease-out`. Equilibrio entre "se ve rápidamente el movimiento" y agilidad; 150ms apenas se percibe y 500ms se siente lento en uso repetido.
- **Sí:** respetar `prefers-reduced-motion` con cambio instantáneo. Accesibilidad sin costo de diseño.
- **No:** ignorar la preferencia de movimiento. Descartado por accesibilidad.
- **Sí:** clics rápidos sin bloqueo. Los botones siguen respondiendo y la transición sigue al último índice; bloquear 300ms se siente torpe.
- **No:** bloquear botones durante la animación ni encolar transiciones. Añade estado innecesario para una animación tan corta.

## Risks

| Risk | Mitigation |
|---|---|
| Wrap-around (última → primera) recorre toda la pista en sentido contrario al esperado si se anima el índice crudo | Animar en la dirección del botón pulsado; si el salto crudo cruza el borde, tratarlo como avance/retroceso de un paso en esa dirección |
| Clics muy rápidos dejan la transición a medio camino con el índice ya avanzado | La pista usa transición CSS sobre el índice actual, sin timers ni bloqueos; cada render apunta al último `activeIndex` y el navegador interpola desde la posición corriente |
| Diferencias de altura entre fotos provocan salto vertical durante el slide | Mantener `aspect-10/7` / `aspect-812/300` fijos y `object-cover` existentes; todas las slides ocupan el mismo viewport |
| `prefers-reduced-motion` no verificable a simple vista | Probar con la opción activada en el SO/navegador y confirmar cambio instantáneo; clase `motion-reduce:transition-none` |

## What is **not** in this spec

- Swipe táctil, autoplay, puntos/miniaturas, cambios de datos, SEO/JSON-LD/sitemap, nuevas dependencias, cambios en `Services.tsx`, `globals.css`/tokens o `next.config.ts`. Cada uno, si se necesita, va en su propia spec.
