# Implementation checklist

P0 = must, P1 = should, P2 = nice to have.

## Phase 0 — Scope and creative direction ✅

- [x] 0.1 Decisions approved (see SPEC.md) · P0
- [x] 0.2 Style tile and page mockups approved · P1
- [x] 0.3 V1 roster locked (14 legends; Elcano first) · P0
- [x] 0.4 Spec and checklist committed to `docs/` · P0

## Phase 1 — Foundation ✅

- [x] 1.1 Git repo, `.gitignore`, `.editorconfig`, `.gitattributes`, `.nvmrc` · P0
- [x] 1.2 Astro 7 + TypeScript strict + React + Tailwind v4 + sitemap · P0 · ✓ `npm run build`
- [x] 1.3 Scripts: dev, build, preview, check, test, e2e, format · P0
- [x] 1.4 Base path `/legends-of-spain/` + `withBase()` helper · P0 · ✓ unit tested
- [x] 1.5 Content schema with build-time credibility rules + `example-legend` template · P0 · ✓ 11 schema tests
- [x] 1.6 Base layout, header/nav, footer, skip link, all routes, styled 404 · P0 · ✓ e2e
- [x] 1.7 Vitest + Playwright (desktop + mobile) + axe · P0 · ✓ 19 unit, 28 e2e
- [x] 1.8 Private GitHub repo, CI workflow, Pages deploy workflow (skipped while private) · P0
- [x] 1.9 README, CONTRIBUTING, CONTENT_GUIDE, MIT + CC BY-SA licenses, issue templates · P0
- [ ] 1.10 Rename local folder `spanish-heros` → `legends-of-spain` (manual, when no tools are open) · P2

## Phase 2 — Visual foundation (all but 2.7 done)

- [x] 2.1 Tokens, type scale, contrast table (`docs/DESIGN_TOKENS.md`) · P0
- [x] 2.2 Parchment ground with inline grain (~0.3 KB) + burnt-edge vignette on ≥ 768px · P0
- [x] 2.3 Ornaments: corners, small divider, CSS drop cap (`.dropcap`) · P0
- [x] 2.4 Home cover, values band, promise section to mockup fidelity · P0
- [x] 2.5 LegendCard: portrait slot, value ribbon (replaced the seal, which overflowed on long values) · P0
- [x] 2.6 Story primitives: Chapter, ReadMore, VerificationBadge, Citations, Portrait + credit, MediaKindLabel, PullQuote, ChapterNav, SectionHeading · P0
- [x] 2.7 "Why We Tell These Stories" copy approved by the author · P0
- [x] 2.8 Credits page: lists only produced media; AI policy with live labels · P1
- [x] 2.9 Page-turn view transition (slide + fade); disabled under reduced motion · P1
- [x] 2.10 Responsive QA at 300 / 375 / 1280 in the browser; no horizontal overflow at 375 · P0
- [x] 2.11 Placeholder entries for all 14 legends (book order = chronological); template moved to `docs/templates/` · P1

## Phase 3 — First complete legend (Elcano) (built; content waits on research and review)

- [x] 3.1 Elcano content written from the research dossier as a **draft** (5 chapters of 53–68 words, 3 facts, 1 myth, film pitch, 8 comic captions, 2 places) · P0
- [x] 3.2 Story intro with portrait + credit (built in Phase 2) · P0
- [x] 3.3 FactsNotebook component · P0
- [x] 3.4 LegendOrHistory + OtherSide components · P0
- [ ] 3.5 Portrait rights check and media record · P0 · **deferred: research not started (by decision)**
- [x] 3.6 VideoPlayer: click-to-load youtube-nocookie facade or native video + WebVTT; AI label, transcript, no autoplay; hidden unless published · P0
- [x] 3.7 Video production brief (`production/juan-sebastian-elcano/video-brief.md`) · P1
- [x] 3.8 ComicViewer (scroll-snap strip, works without JS, native swipe) + comic script and character sheet · P0
- [x] 3.9 MovieSection component · P0
- [x] 3.10 Places to visit (documented connections only) · P2
- [x] 3.11 Sources list with "Cited in" back-links to every claim · P0
- [x] 3.12 Build-time OG image per legend (satori + sharp, site fonts) + JSON-LD (Article about a Person; WebSite on home) · P0
- [x] 3.13a Dev-only styleguide page with test fixtures for video and comic states · P1
- [x] 3.13 Research pass on Elcano and author review → `reviewed` (2026-11-10) · P0

## Phase 4 — Interactive features ✅

- [x] 4.1 Gallery filters (kind, century, value) as radio-chip groups on `/legends/`, synced to the URL, live result count, clear button; home value chips link to filtered views; hidden without JS (all legends shown) · P1
- [x] 4.2 Comic: native swipe, arrow/Home/End keys, "Enlarge" modal dialog for finished illustrations (Esc closes, focus returns), historical notes · P0
- [x] 4.3 Current-section highlight in the side contents, reading-progress bar, sticky "In this chapter" menu on small screens · P1
- [x] 4.4 Scroll reveals (opacity/transform only); off for reduced motion; never hidden without JS (3 s safety fallback) · P2
- [x] 4.5 Source previews on hover/focus of citation markers (tooltip, `aria-describedby`, Esc to close) · P1
- [x] 4.6 Related legends section (from each legend's `related` list) + next chapter · P1
- [x] 4.7 Search deferred until 12+ published legends (decision unchanged) · P2

## Phase 5 — Remaining legends

- [x] 5.1 Research pass on all 14 legends (Elcano upgraded from draft): full chapters, sourced facts, myths, other side, film pitch, places, 8 comic captions each; `review.status: sourced` · P0
- [x] 5.2 Research note per legend in `production/<slug>/research.md` (claim → source table, disputes, open questions, portrait candidates) · P0
- [x] 5.3 Link check: 84 unique URLs, 80 return 200; 4 block bots (Britannica, Prado ×2, Europe PMC) and need a manual look · P1
- [x] 5.4 Tests decoupled from live content (fixture-based unit tests; e2e expectations read from the legend files); unreviewed legends get `noindex` · P1
- [x] 5.5 Portrait images: 12 downloaded 2026-11-03 (licences confirmed via the Commons and Wellcome APIs), resized to ≤1000 px in `src/assets/legends/<slug>/portrait.jpg`; Bazán inscription and Cortés page checked; Fadrique cropped from Maíno; Bobadilla and Sarmiento have no verified likeness · P0
- [x] 5.5a Espoz y Mina and Blas de Lezo photographs: rights not confirmed; editor chose to keep them (2026-11-10). Replace with the placeholder if a rights holder objects · P1
- [ ] 5.6 Video briefs and comic scripts for the 13 new legends (Elcano's exist) · P1
- [x] 5.7 Editorial review: all 14 approved 2026-11-10 → `reviewed` (log and open follow-ups in `docs/REVIEW.md`) · P0

## Phase 6 — QA and launch

- [x] 6.1 Full suite: 58 unit, 105 e2e (desktop + mobile), `astro check` clean, Prettier clean · P0
- [ ] 6.2 Accessibility audit · P0 — axe on every page incl. all 14 legends ✓, Lighthouse accessibility 100 ✓ (fixed heading order); manual keyboard + NVDA pass still to do
- [x] 6.3 Lighthouse (production build): desktop 100/100/100/100; mobile performance 83–90 (LCP 3.1–3.8 s on simulated slow 4G), CLS ≤ 0.09 after fixing the filter shift · P0
- [ ] 6.4 Source link checker in CI · P1
- [x] 6.5 Asset licence audit: all 12 portraits have file, licence, source and alt; internal caveats moved out of public credit lines into `notes`; credits page generated from content · P0
- [x] 6.6 SEO: sitemap lists all 18 pages, canonical + description + OG image on every page, JSON-LD on home and legends, no `noindex` in production, robots.txt points to sitemap · P0
- [x] 6.7 Repo made public, Pages enabled (Source: GitHub Actions), first deploy 2026-11-10: https://lazzzarov.github.io/legends-of-spain/ · P0

## Phase 7 — Optional (only if approved)

Maps, animated routes, timelines, search, more languages, poster gallery, social formats.
