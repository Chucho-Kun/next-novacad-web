# AGENTS.md - next-novacad-web

## Comandos
- Instalar deps: `npm install` (lockfile `package-lock.json` — usar `npm`, no `pnpm`/`yarn`)
- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build` (genera `.next/`)
- Start prod: `npm run start`
- Lint: `npm run lint` (ESLint 9 flat config en `eslint.config.mjs` con `eslint-config-next/core-web-vitals` + `typescript`)
- No hay runner de tests configurado — no existe `test` script ni `jest`/`vitest` instalado.

## Arquitectura
- Next.js 16.3.6 + React 19.2.8 + TypeScript 5 + Tailwind CSS 4.
- App Router sin `src/` dir: entrypoints en `app/layout.tsx` (fuentes Geist via `next/font/google`) y `app/page.tsx` que compone la One Single Page. No existe `pages/` ni `src/`.
- Alias: `@/*` → `./*` (`tsconfig.json:21`). Importar como `@/components/*`, `@/data/*`, `@/lib/*`.
- `next.config.ts` vacío — añadir opciones ahí. `next-env.d.ts` es generado, no editar.
- `public/` contiene assets estáticos (`public/images/` para galería); `.next/` y `out/` son build artifacts (ignorados en `.gitignore`).
- Capas: `app/` (rutas), `components/` (8 secciones), `data/` (contenido estático), `lib/` (`utils.ts` con helper `cn`).

## Tailwind v4 - particularidad
- No hay `tailwind.config.js/ts`. Configuración vía CSS en `app/globals.css:1` con `@import "tailwindcss";` y bloque `@theme inline`.
- Plugin PostCSS es `@tailwindcss/postcss` en `postcss.config.mjs:3`, no `tailwindcss` directo. Si migras o añades config, respeta este setup.

## Verificación
- Orden de verificación: `npm run lint` → `npm run build` → `tsc --noEmit` (implícito en `build` via `noEmit:true` en `tsconfig.json:9`).
- No hay CI ni hooks pre-commit configurados. No hay `.github/workflows`.
- Entorno verificado: Node `v22.14.0` + npm `11.4.1`. Usar esa versión para evitar drift de `lockfileVersion: 3`.

## Convenciones
- Estilo ESLint hereda `next/core-web-vitals` + `next/typescript`; ignora `.next/**`, `out/**`, `build/**`, `next-env.d.ts` (`eslint.config.mjs:9`).
- Mantener `app/page.tsx` como server component por defecto; usar `"use client"` solo donde sea necesario.
- Archivos generados `/.next/types/` incluidos en `tsconfig.json:29` — no eliminar del `include`.

## Estructura de archivos
- Este proyecto deberá guardar los archivos creados basandose en la siguiente estructura de una One Single Page

next-novacad-web/
│
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Gallery.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
│
├── data/
│   ├── services.ts
│   └── testimonials.ts
│
├── public/
│   └── images/
│
├── lib/
│   └── utils.ts
│
├── package.json
├── tsconfig.json
└── next.config.ts