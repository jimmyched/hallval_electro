# Five brand previews

Review hubs: [French](https://albeahealth.vercel.app/fr/brands) · [English](https://albeahealth.vercel.app/en/brands).

| Identity | Website | Packaging and voice | Direction |
| --- | --- | --- | --- |
| Dayable | `/en?brand=dayable` | `/en/brands/dayable` | Warm ivory, apricot and aubergine; everyday capability |
| Soluen | `/en?brand=soluen` | `/en/brands/soluen` | Mineral ivory and deep teal; composed expertise |
| DearTempo | `/en?brand=deartempo` | `/en/brands/deartempo` | Oat, oxblood and terracotta; a personal rhythm |
| Good Measure | `/en?brand=good-measure` | `/en/brands/good-measure` | Chalk and cobalt; thoughtful practicality |
| Ordelan | `/en?brand=ordelan` | `/en/brands/ordelan` | Porcelain, midnight and celadon; human precision |

Replace `/en` with `/fr` for French. Each identity carries through the product, science, audience, about and demo checkout pages. The top comparison bar switches identity without changing the page. Language links retain the identity. Returning to the hub removes the selected identity; the original Albea demo and its theme previews remain available without a brand parameter.

## Creative scope

These are creative hypotheses for the same foot stimulation wrap. Each has its own hero composition, palette, wordmark treatment, geometry and tone. Shared product facts and evidence boundaries remain consistent. Packaging pages include the proposed construction, materials, graphic direction, audience rationale, watchout, voice rules and exact bilingual pack copy. Mockup lettering illustrates typographic character; the site uses bundled Inter and Fraunces fonts. Mockups are not production dielines, final specifications or proof of consumer preference.

Generated packaging assets are optimized WebP files in `public/images/brands`. Prompts and review notes are preserved in `brand-image-provenance.json`. No clinical results, certification marks, endorsements or trademark rights are implied. The prior naming research, screening history and browser shortlist storage at `/research/naming.html` are preserved.

## Behavior and maintenance

`lib/brands.ts` defines identities, safe editorial name substitution and URL helpers. `lib/brand-copy.ts` defines presentation copy. Middleware provides request-scoped server identity; `BrandProvider` keeps client identity and translations current during navigation. `BrandHero.tsx` contains the five compositions; `app/brands.css` scopes them to `html[data-brand]`. Comparison and packaging content is in `lib/brand-concepts.json`.

Prices and sizing are illustrative. Checkout remains a local demonstration: no payment or order is created, and entered contact details are not sent or saved. The mock cart behavior is unchanged. All presentation routes carry noindex/nofollow metadata; this is not access control.

Run `npm run lint`, `npm run test:brands`, `npm run test:themes` and `npm run build`. Browser checks cover switching identities, language continuity, sizing, quantities, bag, checkout, packaging and mobile layouts.
