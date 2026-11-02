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
- [ ] 2.7 "Why We Tell These Stories" copy approved by the author · P0 · **waiting on you**
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
- [ ] 3.13 Research pass on Elcano (survivor numbers, distances, primary sources consulted directly), then author review → `reviewed` · P0 · **waiting on you**

## Phase 4 — Interactive features ✅

- [x] 4.1 Gallery filters (kind, century, value) as radio-chip groups on `/legends/`, synced to the URL, live result count, clear button; home value chips link to filtered views; hidden without JS (all legends shown) · P1
- [x] 4.2 Comic: native swipe, arrow/Home/End keys, "Enlarge" modal dialog for finished illustrations (Esc closes, focus returns), historical notes · P0
- [x] 4.3 Current-section highlight in the side contents, reading-progress bar, sticky "In this chapter" menu on small screens · P1
- [x] 4.4 Scroll reveals (opacity/transform only); off for reduced motion; never hidden without JS (3 s safety fallback) · P2
- [x] 4.5 Source previews on hover/focus of citation markers (tooltip, `aria-describedby`, Esc to close) · P1
- [x] 4.6 Related legends section (from each legend's `related` list) + next chapter · P1
- [x] 4.7 Search deferred until 12+ published legends (decision unchanged) · P2

## Phase 5 — Remaining legends

- [ ] 5.x For each of the 13 remaining legends: content → media rights → briefs → review · P0

## Phase 6 — QA and launch

- [ ] 6.1 Full e2e suite · P0
- [ ] 6.2 Accessibility audit (axe + keyboard + NVDA) · P0
- [ ] 6.3 Lighthouse budget · P0
- [ ] 6.4 Source link checker in CI · P1
- [ ] 6.5 Asset license audit + generated CREDITS · P0
- [ ] 6.6 SEO validation (sitemap, OG, structured data) · P0
- [ ] 6.7 Make the repo public, enable Pages (Source: GitHub Actions), first deploy · P0

## Phase 7 — Optional (only if approved)

Maps, animated routes, timelines, search, more languages, poster gallery, social formats.
