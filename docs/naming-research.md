# Naming research

The direct-access review is served at `/research/naming.html`. It is not linked from the storefront or a sitemap.

The page contains the complete research as of 9 October 2026: 101 names, audience analysis, earlier decisions, the Apricot Vale × Dayable exploration, Dayable’s French/international review, the founders’ Napsnap, Klavek and Soluen proposals, and 14 candidates around the word “simple” (13 new names plus Unfussy revisited). The Explorations section retains both the Simple round and the earlier Apricot Vale × Dayable crossover. The full interface and research are available in French and English; new visitors start in French. Candidate names remain unchanged. Domain prices and trademark observations retain their original dates and limitations.

Both the HTML document and its embedded review include `noindex, nofollow, noarchive` metadata. Next.js also sends an `X-Robots-Tag` header for `/research/*`. Do not block this path in robots.txt: crawlers need to fetch it to read the noindex instruction. This is an unlisted public page, not access control. The repository and its source are public too.

## Shortlist behavior

The existing export includes its own browser-storage bridge. Language choice, shortlist edits, comparison choices and current view persist in the same browser at the same URL. They do not synchronize between people or devices and do not migrate automatically from the localhost version. Removing a name from the shortlist never deletes its research history.

## Updating the review

Export the latest complete naming review, then run:

```sh
python3 scripts/import-naming-research.py /path/to/audience-to-name-preview.html
npm run lint
npm run build
```

Commit the changed `public/research/naming.html`. The importer preserves the complete review and its storage bridge, removes local absolute source-file paths, and adds the indexing metadata. No Codex account is required to use the published page.

After deployment, verify that `/research/naming.html` returns 200 with `X-Robots-Tag: noindex, nofollow, noarchive`, and that the research tabs, French/English switch and shortlist controls work. Language switching must preserve a saved shortlist, including an empty one. The Napsnap review appends to its original history; it must not create a duplicate record or erase the earlier assessment.

## Simple exploration

The 9 October Simple round groups names by sound, daily routine and attitude. Its audience rationale, US/French pronunciation hypotheses, source links and suggested buyer test are available in both languages. Quotes cover .com, .net, .shop, .life and .fr for all 14 names, with .co, .org and .io for the nine developed options: 97 exact-domain lookups in total. Registrar purchase offers and registry observations remain distinct; no name is presented as trademark-cleared.

Unfussy remains one record. Its earlier history, reasoning and dated domain quotes are retained before the new assessment. No candidate is automatically added to or removed from a visitor’s shortlist. The original 88 records and the original shortlist seed are preserved.
