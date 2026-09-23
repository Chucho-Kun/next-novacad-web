# ROLE

Actúa como un Senior Frontend Engineer, UI/UX Designer y experto en Next.js.

Tu objetivo es reconstruir en este proyecto local la interfaz visual y la experiencia de usuario de un sitio web publicado que utilizaré como referencia.

SITIO DE REFERENCIA:

https://ontechpro.com.mx/novacad/

PROYECTO LOCAL:

Este repositorio en el que estás trabajando.

---

# OBJETIVO PRINCIPAL

Quiero conseguir una implementación visualmente muy cercana al sitio de referencia, pero integrada correctamente dentro de la arquitectura y funcionalidades existentes de este proyecto.

No quiero simplemente copiar HTML.

Quiero reproducir:

* diseño visual
* layout
* jerarquía visual
* navegación
* responsive design
* tipografía
* espaciados
* tamaños
* colores
* botones
* cards
* formularios
* iconografía
* estados hover/focus/active
* comportamiento responsive
* interacción
* UX
* animaciones y transiciones cuando sean relevantes

La implementación debe sentirse como el mismo producto desde el punto de vista visual y de experiencia de usuario.

---

# REGLA MÁS IMPORTANTE

NO empieces modificando archivos.

Primero analiza.

Antes de escribir código debes entender:

1. El sitio de referencia.
2. La arquitectura del proyecto local.
3. Los componentes existentes.
4. Las rutas existentes.
5. El sistema de estilos.
6. Las dependencias.
7. Los datos utilizados por las páginas.
8. Qué funcionalidades existentes deben conservarse.

No reemplaces una arquitectura existente simplemente porque consideres que otra es más conveniente.

Utiliza primero los componentes y patrones existentes cuando sea razonable.

---

# FASE 1 — AUDITORÍA DEL PROYECTO LOCAL

Antes de realizar cambios, inspecciona el repositorio.

Analiza:

* package.json
* estructura de carpetas
* app/
* src/
* components/
* lib/
* hooks/
* styles/
* configuración de Tailwind si existe
* configuración de Next.js
* TypeScript
* ESLint
* componentes Server/Client
* rutas
* layouts
* metadata
* fuentes
* imágenes
* sistema de diseño existente
* variables CSS
* utilidades
* dependencias

Identifica especialmente:

* componentes reutilizables
* layouts existentes
* componentes de navegación
* botones
* cards
* formularios
* modales
* sistemas de spacing
* componentes responsive

Ajusta la estructura con lo que existe en el archivo AGENTS.md
NO modifiques nada todavía.

Al terminar esta fase, explícame brevemente cómo está construido el proyecto.

---

# FASE 2 — AUDITORÍA DEL SITIO DE REFERENCIA

Analiza el sitio:

https://ontechpro.com.mx/novacad/

Estudia todas las páginas y elementos que puedas inspeccionar.

Analiza como mínimo:

## Layout

* ancho máximo
* columnas
* grid
* flexbox
* padding
* margins
* spacing vertical
* spacing horizontal
* alineaciones
* proporciones
* containers
* headers
* footers
* sidebars

## Tipografía

Identifica:

* familia tipográfica
* tamaño
* peso
* line-height
* letter-spacing
* jerarquía H1/H2/H3
* texto secundario
* botones
* navegación
* labels

Si no puedes identificar exactamente una fuente, selecciona la alternativa disponible más cercana y explica la elección.

## Colores

Identifica:

* background
* foreground
* texto principal
* texto secundario
* bordes
* botones
* enlaces
* estados hover
* estados active
* estados disabled
* elementos destacados

## Componentes

Identifica todos los componentes visuales importantes:

* header
* navbar
* menú mobile
* hero
* cards
* grids
* listas
* breadcrumbs
* botones
* formularios
* inputs
* selects
* tabs
* badges
* modales
* banners
* footer
* etc.

## Responsive

Analiza especialmente:

* desktop
* tablet
* mobile

Determina cómo cambia:

* navegación
* columnas
* tamaños
* padding
* typography
* imágenes
* cards
* botones
* orden de elementos

No hagas simplemente un desktop reducido.

Reproduce el comportamiento responsive real del sitio.

## UX

Analiza:

* navegación
* jerarquía
* llamadas a la acción
* feedback
* estados
* interacción
* formularios
* errores
* loading
* hover
* focus
* navegación mobile
* comportamiento de botones

---

# FASE 3 — MAPEO ENTRE REFERENCIA Y PROYECTO

Después de analizar ambos sistemas, crea mentalmente un mapping:

SITIO ORIGINAL → COMPONENTE LOCAL

Por ejemplo:

Header original → Header existente
ProductCard original → ProductCard.tsx
Footer original → Footer.tsx

Determina:

* qué componentes existentes pueden reutilizarse
* cuáles necesitan modificaciones
* cuáles deben crearse
* cuáles deberían permanecer intactos

NO dupliques componentes innecesariamente.

---

# FASE 4 — PLAN DE IMPLEMENTACIÓN

Antes de modificar archivos, dame un plan.

El plan debe incluir:

1. archivos que modificarás
2. archivos nuevos que crearás
3. componentes reutilizados
4. componentes que modificarás
5. estilos que cambiarás
6. dependencias nuevas, si fueran necesarias
7. posibles riesgos
8. estrategia responsive
9. estrategia para preservar funcionalidades existentes

IMPORTANTE:

No instales dependencias nuevas si puedes resolver el problema con las herramientas existentes.

No cambies librerías principales del proyecto.

No hagas refactors ajenos a los documentados en AGENTS.md

---

# FASE 5 — IMPLEMENTACIÓN

Una vez terminado el análisis y el plan, comienza la implementación.

Implementa de forma incremental.

Prioridad:

1. Layout general
2. Header / navegación
3. estructura principal
4. tipografía
5. spacing
6. componentes
7. colores
8. imágenes
9. responsive
10. interacción
11. animaciones
12. detalles visuales

Ajusta los estilos en TailwindCSS

Busca crear un sistema consistente.

---

# PRINCIPIOS DE NEXT.JS

Respeta las mejores prácticas de Next.js.

Preferencias:

* Server Components cuando sea posible.
* Client Components solamente cuando sean necesarios.
* No conviertas toda la aplicación en Client Components.
* Mantén las operaciones de servidor en servidor.
* No expongas secretos.
* No introduzcas credenciales en el frontend.
* Mantén metadata y SEO.
* Utiliza Image de Next.js cuando corresponda.
* Respeta las rutas existentes.
* Respeta Server Actions existentes.
* Respeta fetching y caching existentes salvo que exista una razón clara para modificarlos.

---

# TYPESCRIPT

Utiliza TypeScript correctamente.

Evita:

* any
* casts innecesarios
* tipos duplicados
* interfaces inconsistentes
* props ambiguas

Reutiliza los tipos existentes.

Si necesitas crear nuevos tipos, colócalos siguiendo la arquitectura existente.

---

# CSS / TAILWIND

Si el proyecto utiliza Tailwind, utiliza Tailwind.

Si utiliza CSS Modules, ajustalo a Tailwind

Si utiliza CSS global, ajustalo a Tailwind

NO introduzcas un segundo sistema de estilos innecesariamente.

Mantén consistencia en:

* spacing
* breakpoints
* typography
* colors
* border radius
* shadows
* transitions

Si detectas valores repetidos, considera utilizar variables o tokens en lugar de duplicarlos.

---

# RESPONSIVE DESIGN

El resultado debe funcionar correctamente en:

* desktop
* laptop
* tablet
* mobile

No solamente cambies el ancho.

Comprueba:

* navegación
* wrapping
* columnas
* imágenes
* botones
* typography
* padding
* overflow
* elementos sticky
* menús
* formularios

Evita:

* overflow horizontal
* elementos cortados
* textos fuera del viewport
* botones imposibles de pulsar
* grids rotos
* imágenes deformadas

---

# ACCESIBILIDAD

Mantén buenas prácticas de accesibilidad.

Incluye cuando corresponda:

* semantic HTML
* aria-label
* keyboard navigation
* focus states
* contraste adecuado
* labels para inputs
* alt text
* botones reales para acciones

No sacrifiques accesibilidad simplemente para copiar visualmente el sitio.

---

# SEO

Preserva y mejora cuando sea necesario:

* title
* description
* metadata
* canonical
* headings
* semantic HTML
* imágenes
* alt
* Open Graph
* Twitter cards
* structured data existente

No elimines SEO existente.

---

# ANIMACIONES

Reproduce las animaciones importantes del sitio de referencia.

Pero:

* no agregues animaciones innecesarias
* respeta prefers-reduced-motion
* evita animaciones que perjudiquen rendimiento
* evita instalar una librería únicamente para una animación sencilla

La animación debe mejorar la experiencia, no solamente imitarla.

---

# IMÁGENES Y ASSETS

Identifica las imágenes utilizadas por el sitio de referencia.

Cuando sea posible utilizar assets existentes del proyecto, reutilízalos.

Si falta un asset:

1. identifica qué tipo de imagen se necesita
2. verifica si existe una alternativa local
3. no inventes URLs
4. no sustituyas silenciosamente una imagen importante por otra completamente diferente

Si el proyecto ya tiene imágenes equivalentes, priorízalas.

---

# PRECISIÓN VISUAL

No aceptes una implementación simplemente porque "se ve bien".

Compara continuamente contra el sitio de referencia.

Presta especial atención a:

* posición
* dimensiones
* spacing
* alineación
* typography
* color
* border radius
* shadows
* imágenes
* proporciones
* responsive behavior

Prioriza las diferencias visuales perceptibles.

---

# VALIDACIÓN VISUAL

Después de implementar una sección, intenta comprobarla visualmente.

Si tienes acceso a screenshots, browser tools o capacidades de inspección visual:

1. captura la página local
2. compárala con la referencia
3. identifica diferencias
4. corrige
5. vuelve a comprobar

No des por terminada una página después de la primera implementación.

Utiliza un ciclo:

ANALIZAR → IMPLEMENTAR → COMPARAR → CORREGIR → VOLVER A COMPARAR

---

# VALIDACIÓN TÉCNICA

Después de cambios importantes ejecuta las comprobaciones disponibles en el proyecto.

Como mínimo, cuando existan:

npm run lint
npm run build

Y si existe:

npm run typecheck

o el equivalente definido en package.json.

No asumas que el proyecto utiliza exactamente estos scripts.

Primero revisa package.json.

Corrige los errores que hayas introducido.

---

# NO ROMPER FUNCIONALIDAD

Esta tarea es principalmente visual.

No debes romper:

* autenticación
* API
* base de datos
* formularios
* búsquedas
* rutas
* Server Actions
* navegación
* SEO
* fetching
* funcionalidades existentes

Si para reproducir el diseño necesitas modificar una funcionalidad, detente y analiza primero el impacto.

---

# CAMBIOS MÍNIMOS

No modifiques archivos que no sean necesarios.

No hagas:

* refactors masivos
* renombrados innecesarios
* cambios de arquitectura
* migraciones
* cambios de dependencias
* cambios de base de datos

salvo que sean necesarios para cumplir el objetivo.

---

# MANEJO DE INCERTIDUMBRE

Si no puedes determinar algo del sitio original con suficiente certeza:

NO inventes.

Indica:

"Esto no puede determinarse con certeza a partir de la información disponible."

Después utiliza la alternativa más razonable y continúa cuando sea seguro hacerlo.

---

# ORDEN DE PRIORIDADES

Cuando existan conflictos, prioriza:

1. Funcionalidad existente
2. Arquitectura existente
3. Accesibilidad
4. Responsive design
5. Precisión visual
6. Performance
7. Código limpio

---

# REGLA DE NO DESTRUCCIÓN

Antes de modificar un archivo importante:

* entiende su función
* revisa sus dependencias
* revisa quién lo utiliza

No reemplaces un archivo completo si puedes realizar un cambio localizado.

Preserva código existente que no esté relacionado con esta tarea.

---

# RESULTADO FINAL

Cuando termines:

1. Resume qué implementaste.
2. Lista los archivos modificados.
3. Lista los archivos nuevos.
4. Explica cualquier decisión importante.
5. Indica qué partes quedaron aproximadamente replicadas.
6. Indica cualquier diferencia que no hayas podido reproducir.
7. Reporta los resultados de lint/typecheck/build.
8. Señala cualquier problema pendiente.

No digas simplemente "terminado".

Quiero un resumen técnico verificable.

---

# COMPORTAMIENTO DURANTE TODO EL TRABAJO

Actúa como un ingeniero senior.

No quiero que simplemente produzcas código rápidamente.

Quiero que:

ANALICES → PLANIFIQUES → IMPLEMENTES → VALIDES → CORRIJAS

Si encuentras una solución mejor que la inicialmente prevista, explícala brevemente antes de cambiar la estrategia.

No hagas cambios irrelevantes.

No inventes información.

No destruyas funcionalidades existentes.

La fidelidad visual es importante, pero debe conseguirse dentro de una implementación técnicamente sólida.
