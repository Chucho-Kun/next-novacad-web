# AGENTS.md - next-novacad-web

## Commands
- Install: `npm install` (uses `package-lock.json` — do not switch to pnpm/yarn)
- Dev: `npm run dev` → http://localhost:3000
- Build: `npm run build` (outputs `.next/`)
- Start: `npm run start`
- Lint: `npm run lint` (ESLint 9 flat config, `eslint-config-next`)
- No test runner — no `test` script, no jest/vitest

## Verification
- Order: `npm run lint` → `npm run build` (build type-checks; fix type errors before finishing)
- No CI, no pre-commit hooks, no test runner — run lint+build manually

## Architecture
- Next.js 16.3.6 + React 19.2.8 + TypeScript 5 + Tailwind CSS 4. App Router, no `src/` or `pages/`.
- Routes: `/` (`app/page.tsx` section composition: `Header` → `FloatingContact` → `Hero` → `WhyChoose` → `About` → `Services` → `Gestiona` → `ComoEmpacar` → `Procedimientos` → `Testimonials` → `Faq` → `Contact` → `Footer`, plus `JsonLd` schema blocks) · `/servicios/[slug]` (`app/servicios/[slug]/page.tsx`, static via `generateStaticParams` from `data/services.ts`) · `/videos` + `/videos/[id]` (`app/videos/`) · `POST /api/contact` (`app/api/contact/route.ts`, `runtime = "nodejs"`) · `sitemap.ts` + `image-sitemap.xml/` + `video-sitemap.xml/` + `robots.ts` (robots lists all three sitemaps).
- Canonical domain `https://novacad.com.mx` is hard-coded in `app/layout.tsx` (`metadataBase`), `app/page.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/servicios/[slug]/page.tsx` — keep all in sync.
- Data layer: `data/services.ts` (drives home sections, sitemap, JSON-LD, `[slug]` pages — `slug`/`href` changes break URLs), `data/testimonials.ts`, `data/procedures.ts`, `data/why-choose.ts`, `data/videos.ts`, `data/images.ts`, `data/como-empacar.ts`, `data/faqs.ts` (drives `Faq` section + `FAQPage` JSON-LD on home). Static content, Spanish (`es-MX`).
- Sitemap `lastModified` convention (SPEC 11): `app/sitemap.ts` uses fixed per-group date constants (`HOME_LAST_MODIFIED`, `SERVICES_LAST_MODIFIED`; video URLs use each video's `uploadDate`). Never use `new Date()` per build. When content changes, update the constant of its group to the change date (home / servicios / videos) so Google keeps trusting `lastmod`.
- Path alias `@/*` → `./*`; `lib/utils.ts:4` exports `cn()` (`clsx` + `tailwind-merge`); `lib/validations/contact.ts:3` exports `contactSchema` shared by client form and API route.
- Only 5 `"use client"` components: `ContactForm`, `MobileNav`, `ServiceCategoryCard`, `TestimonialCarousel`, `VideoPlaylist`. `Gallery` is a presentational child of `VideoPlaylist`. Keep `app/page.tsx` a server component.
- `next.config.ts` is empty — add options there. Never edit `next-env.d.ts` or `.next/**` (both gitignored / generated).

## Contact form gotchas (`/api/contact`)
- Flow: `ContactForm.tsx:56` → `fetch("/api/contact", POST JSON {name,email,message,_gotcha})`. Zod-validated twice (client for inline errors, server returns 400 `{ok:false, issues}` mapped back to fields).
- Honeypot `_gotcha`: non-empty returns silent `200 {ok:true}` without sending mail — do not "fix" this.
- In-memory rate limit (`route.ts:6`): 5 req / 10 min per IP → `429` + `Retry-After`. Resets on redeploy; repeated manual testing will trip it.
- Env (`route.ts:72`): `RESEND_API_KEY` required (else 500 "Falta configuración"); `CONTACT_TO` defaults to `gameroapp@gmail.com`, `CONTACT_FROM` to `contacto@novacad.com.mx`. `.env*` is gitignored — never commit it. `CONTACT_FROM` domain must be verified in Resend or sends fail with a domain error message.
- Error fallback convention: user-facing errors always append `o escribe a novacad.social@gmail.com`.

## Tailwind v4 / styling
- No `tailwind.config.*`. Theme in `app/globals.css:13` via `@import "tailwindcss"` + `@theme inline` (brand colors `--novacad-*` used as `bg-brand-*`/`text-brand-*`, fonts `--font-montserrat`/`--font-agency`, breakpoints `xs:30rem`, `lg:62rem`, `2xl:120rem`).
- PostCSS plugin is `@tailwindcss/postcss` (`postcss.config.mjs:3`), not `tailwindcss` directly.
- Layout helpers in `app/globals.css:76`: `.site-container` (`min(80vw,1536px)`, `90vw` mobile) and `[id]{scroll-margin-top:8rem}` with per-section overrides (`#quienes-somos:15rem`, `#servicios:0`, `#galeria:0`) — reuse, don't reinvent.

## Conventions
- `specs/` holds numbered implementation-history `.md` files + `.spec-config.yml` — reference only, not live code. Active spec workflow lives in `openspec/` (`changes/` + `specs/`); project constraints for artifacts are in `openspec/config.yaml` — read it before proposing changes.
- Fonts: Montserrat via `next/font/google`, Agency via local `app/fonts/agencyb.ttf:13` (`weight:700` only).
- SEO pattern: per-page `generateMetadata` with canonical + OG/Twitter images + `JsonLd` component (`Organization`/`WebSite`/`ItemList`/`FAQPage` on home, `BreadcrumbList`/`Service` on `[slug]`).
- WebP rule (SPEC 11): images live under `/images/` as originals; winning `.webp` variants live in `/images/webp/` (except `nuevo-producto`, converted in place). Point `src`/`image:loc` at the `.webp` variant **only if it weighs less** — 8 service originals (zirconia, emax, pmma, resina-provisional, diseno-de-sonrisa, mock-up, guarda, guia) plus `n-icono-cnc`, `n-icono-diamante-teeth`, `n-logo-novacad`, `estrellas.png` keep their originals. If a file changes on disk, re-weigh before migrating.
- GTM: `<GoogleTagManager>` from `@next/third-parties/google` in `app/layout.tsx` (injects both head script + body noscript — never paste GTM snippets manually). Container ID comes from `NEXT_PUBLIC_GTM_ID`; if unset, GTM simply doesn't render.
