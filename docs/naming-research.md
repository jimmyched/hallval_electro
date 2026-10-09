# Naming research

The direct-access review is served at `/research/naming.html`. It is not linked from the storefront or a sitemap.

The page contains the complete research as of 9 October 2026: 88 names, audience analysis, earlier decisions, the Apricot Vale × Dayable exploration, Dayable’s French/international review, and the founders’ Napsnap, Klavek and Soluen proposals. The full interface and research are available in French and English; new visitors start in French. Candidate names remain unchanged. Domain prices and trademark observations retain their original dates and limitations.

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
