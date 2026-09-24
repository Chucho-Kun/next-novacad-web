# AGENTS.md - next-novacad-web

## Commands
- Install: `npm install` (uses `package-lock.json` — do not switch to pnpm/yarn)
- Dev: `npm run dev` → http://localhost:3000 (`dev:webpack` is same as `dev`)
- Build: `npm run build` (outputs `.next/`) — runs typecheck via `noEmit:true`
- Start: `npm run start`
- Lint: `npm run lint` (ESLint 9 flat config — `eslint.config.mjs:1` with `eslint-config-next/core-web-vitals` + `typescript`)
- No test runner configured — no `test` script, no jest/vitest

## Architecture
- Next.js 16.3.6 + React 19.2.8 + TypeScript 5 + Tailwind CSS 4. App Router without `src/` or `pages/`.
- Entrypoints: `app/layout.tsx:1` (Montserrat via `next/font/google` + local `agencyb.ttf` at `app/fonts/agencyb.ttf:1`, `metadataBase` = `https://ontechpro.com.mx/novacad/`) and `app/page.tsx:1` (single-page composition).
- Page order in `app/page.tsx:14`: `Header` → `FloatingContact` → `Hero` → `WhyChoose` → `About` → `Services` → `Gestiona` → `ComoEmpacar` → `Procedimientos` → `Testimonials` → `Contact` → `Footer`.
- Path alias: `@/*` → `./*` (`tsconfig.json:21`); import as `@/components/*`, `@/data/*`, `@/lib/*`.
- Data layer: `data/services.ts`, `data/testimonials.ts`, `data/procedures.ts`, `data/why-choose.ts` — static content, no API.
- `lib/utils.ts:1` exports `cn()` (`clsx` + `tailwind-merge`).
- `components/` has 18 files; only interactive ones are `"use client"` (`ContactForm`, `MobileNav`, `ServiceCategoryCard`, `TestimonialCarousel`, `VideoPlaylist`) — keep `app/page.tsx` as server component.
- `public/images/` holds gallery/static assets; `screenshots/` is reference only; `specs/` holds spec workflow (`specs/.spec-config.yml:6` → `AutoCreateBranch: true`).

## Tailwind v4
- No `tailwind.config.*`. Theme in `app/globals.css:1` via `@import "tailwindcss"` + `@theme inline` (brand colors `--novacad-*`, fonts `--font-montserrat`/`--font-agency`, breakpoints `xs:30rem`, `lg:62rem`, `2xl:120rem`).
- PostCSS plugin is `@tailwindcss/postcss` in `postcss.config.mjs:3`, not `tailwindcss` directly.

## Verification
- Order: `npm run lint` → `npm run build` (`tsc --noEmit` is implicit).
- No CI (`/.github` absent) and no pre-commit hooks — run lint+build manually.
- Pinned env: Node `v22.14.0` + npm `11.4.1` (`lockfileVersion: 3`); mismatch causes lockfile drift.

## Conventions
- ESLint ignores `.next/**`, `out/**`, `build/**`, `next-env.d.ts` (`eslint.config.mjs:9`). Do not lint generated output.
- `next.config.ts` is empty — add options there. Never edit `next-env.d.ts` or `.next/types/**` (included in `tsconfig.json:29`).
- `app/globals.css:80` defines `.site-container` (`min(80vw,1536px)`, `90vw` on mobile) and `[id]{scroll-margin-top:8rem}` for anchor offsets — reuse, don't reinvent.
- No `opencode.json` / `.opencode/` config present — no custom instruction loading.
