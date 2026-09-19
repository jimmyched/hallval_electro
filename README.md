# Albea concept storefront

A bilingual French/English presentation website for an open foot-sleeve concept with four electrode positions. Built with Next.js 15, React 19, next-intl and Tailwind CSS 4. This repository is a **demo**, not a live store.

## Run locally

```sh
npm install
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000/en or http://127.0.0.1:3000/fr.

```sh
npm run lint
npx tsc --noEmit
npm run build
npm start -- --hostname 127.0.0.1
```

## Routes

Every route exists under `/en` and `/fr`:

- `/`: main landing page
- `/product/albea`: concept gallery, size options, demo bag
- `/for/early-signs`: early foot changes
- `/for/family-history`: inherited concerns
- `/for/active-living`: walking, running and an active lifestyle
- `/for/on-your-feet`: people with standing occupations
- `/for/lifelong-movement`: active older adults
- `/science`: anatomy, evidence and its limits
- `/about-preview`: clear explanation of demo content and data behavior

The five `/for/` campaign pages are direct-access landing pages. No directory or link to them is exposed in the storefront navigation. Each contains audience-specific copy, cited evidence, product explanation, illustrative testimonial, inline demo preorder panel and FAQs.

## Demo behavior

The Shopify adapter is explicitly disabled in `lib/shopify/index.ts`, even if credentials exist in the environment. Mock carts live in server memory and survive development hot reloads but not a server restart; a browser cookie identifies each cart. Checkout only shows a local completion notice. Form details are never persisted or transmitted. The €150 price, EU sizes and product imagery are illustrative.

Language switching preserves the current route. Navigation, FAQs, electrode selection, gallery, sizing, quantities, bag removal and demo preorder completion are interactive. The bag uses a native modal dialog for focus containment and Escape handling. Search indexing is disabled for this presentation build.

## Editing

- Bilingual shared content: `lib/content.ts`
- Direct-access campaign content: `lib/campaigns.ts`
- Educational facts and language-specific sources: `lib/research.ts`
- Campaign preview URLs: `docs/campaign-pages.md`
- Product/bag translations: `messages/en.json`, `messages/fr.json`
- Site styling: `app/globals.css`
- Generated artwork: `public/images/`
- Research, evidence boundaries and persona rationale: `docs/audience-research.md`
- Image generation prompts and provenance: `docs/image-prompts.md`

For an isolated production preview while development is running, use `ALBEA_BUILD_DIR=.next-build npm run build`, then `ALBEA_BUILD_DIR=.next-build npm start -- --hostname 127.0.0.1 --port 3001`.

Clinical claims, final electrode placement, technical specifications, founder details, pricing and regulatory status need product-team validation before a public launch. No actual launch or deployment has been performed.
