# Demo validation

## Compact science schematic

- Replaced the original drawing with a vector medial-view schematic showing a simplified bone layer, the target muscle and three electrode pads with linked numbered callouts.
- Reduced vertical spacing and placed introductory text beside the title on desktop; retained stacked mobile layout.
- Verified French desktop/mobile rendering, English labels, keyboard activation of SVG controls and synchronized selection in the explanation list. Production build, lint and type checks passed.
- Screenshots: `science-refined-fr-desktop.png` and `science-refined-fr-mobile.png`.

## Lifestyle image update

- Moved the approved woman-reading photograph to the homepage hero in French and English.
- Added two matching male lifestyle images to the routine section, lifelong-movement persona and product gallery. Retained full seated poses and visible open sleeves in portrait placements.
- Visually checked the French desktop homepage, routine section, lifelong-movement page and both new gallery selections; checked the mobile hero crop and English language switch at 390px.
- Optimized production build, including lint and type checks, passed after the update. Screenshots use the `lifestyle-` filename prefix.

Checked in the visible Codex browser on 19 September 2026.

- English and French homepage and product page render with localized headings, navigation and controls.
- All five audience routes were opened in both languages (10 routes) at a 390px phone viewport. No horizontal overflow was found.
- Homepages were also checked at 320px; no horizontal overflow was found.
- Language switching keeps the current product/persona route.
- The mobile menu opens, links work and it closes after navigation.
- All three electrode controls are selectable; the active point and explanation highlight together.
- Demo shopping: selected M, added quantity 2, confirmed €300; decreased to 1 and confirmed €150; previewed checkout with an explicit no-order/no-payment notice; switched to French and removed the item.
- The bag closes with Escape and is a native modal dialog.
- Sign-up rejects an empty required email, accepts the fictitious demo@example.com with consent, shows the demo confirmation, and resets on request. Tested in both languages. No data submission occurs.
- FAQ expansion and the localized transparency page work.
- Page images were checked for broken loads.
- TypeScript validation, ESLint and the optimized production build passed. Fonts are bundled locally with their licenses, removing build-time Google Fonts access.

Screenshots are saved in `docs/screenshots/`. These cover the homepage, family-history journey, schematic and mobile layout. The image prompts and audience research are adjacent documents.

The demo uses in-memory carts; restarting the server resets them. This is intentional for the presentation. Final product specifications, pricing and clinical evidence remain outside the scope of this mock storefront.

## September 19, 2026 — four electrodes, science guide and campaign pages

- Production build completed successfully with lint and TypeScript checks.
- Audited 16 rendered routes (home, science, product and all five campaigns, in both languages): HTTP 200, one H1, no old three-electrode copy, no persona directory. Storefront pages expose no campaign links. Saved `docs/validation/route-audit.json`.
- Science-page external citations are French-language Ameli/INRS sources in French; English AAOS/NHS/CDC/PubMed sources in English.
- Browser-tested French-to-English science switch, all four interactive electrode controls (mouse and keyboard), campaign CTA to inline preorder, size M, quantity 2, bag total €300, and demo completion message. Removed test bag contents afterwards.
- Browser-tested mobile menu including preorder link and inspected science, campaign hero, purchase panel and schematic at 390×844. Returned viewport to desktop.
- Screenshots saved in `docs/screenshots/`: science-facts-fr, science-facts-fr-mobile, four-electrodes-fr, four-electrodes-fr-mobile, campaign-standing-fr, campaign-family-en-mobile, campaign-preorder-mobile, preorder-demo-fr, story-contrast-fr.
- Verified story dark-green background and alternating cream/sage sections. Full-width lifestyle hero retained.
- No live Shopify connection, real payment, reservation or external form submission. Testimonials remain explicitly illustrative. CRO structure is designed for conversion but has not been validated by an A/B test.

## Approved wrap imagery update

- Added the user's exact shared image as the lead product image and campaign introduction visual.
- Updated all application references to the old product/lifestyle design with matching slim-wrap assets; retained originals as unused source history.
- Built successfully with lint and type checks. Browser-checked the reference and isolated product gallery items, the fifth thumbnail, the desktop homepage hero, and the 390px mobile product gallery.
- Fixed mobile horizontal overflow introduced by the fifth thumbnail using a bounded five-column thumbnail grid and shrinkable product columns. Verified all five thumbnails and full reference image fit on screen.
- Screenshots: `approved-wrap-product-fr.png`, `approved-wrap-product-mobile.png`, `approved-wrap-home-fr.png`.

## Product-page feedback — September 19, 2026

- Updated purchase labels to “Ajouter au panier” / “Add to cart”; header preorder links remain unchanged.
- Reduced product-detail spacing and scoped section padding to the product page.
- Added a clearly illustrative 4.7/5 rating linked to three portrait reviews (5, 5, 4 stars), plus a local-only comment form with selectable rating and native required-field validation.
- Added original French-flag, leaf and 30-day return icons beneath the gallery. Proposed design/manufacturing, environmental and return commitments remain explicitly subject to launch confirmation.
- Replaced the rough foot paths with a professionally illustrated medial foot, retaining localized labels and all four accessible electrode controls. Prompt and asset provenance: anatomy-illustration.md.
- Production build, TypeScript and lint passed. Browser checks: French cart add/remove, keyboard selection of fourth electrode and matching list state, rating-to-review anchor, 4-star local comment submission and confirmation, English copy and mobile badge layout. Test comment cleared by navigation and test cart item removed.
- Screenshots: product-commitments-ratings-fr.png, product-commitments-mobile-en.png, foot-anatomy-updated-fr.png, product-reviews-fr.png.
