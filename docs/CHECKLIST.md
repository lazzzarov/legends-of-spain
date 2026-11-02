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

## Phase 2 — Visual foundation

- [ ] 2.1 Refine tokens and type scale; contrast table · P0
- [ ] 2.2 Parchment ground + burnt-edge frame (texture ≤ 30 KB) · P0
- [ ] 2.3 Complete SVG ornament set (corners, drop cap component) · P0
- [ ] 2.4 Home cover to mockup fidelity · P0
- [ ] 2.5 LegendCard to mockup fidelity (portrait slot, value seal) · P0
- [ ] 2.6 Story primitives: Chapter, ReadMore, VerificationBadge, Figure+Credit, PullQuote · P0
- [ ] 2.7 "Why We Tell These Stories" copy approved by the author · P0
- [ ] 2.8 Credits page styling · P1
- [ ] 2.9 Page-turn view transition polish; reduced-motion check · P1
- [ ] 2.10 Responsive QA at 360 / 768 / 1280 · P0
- [ ] 2.11 Placeholder entries for all 14 legends, so the gallery is complete during development · P1

## Phase 3 — First complete legend (Elcano)

- [ ] 3.1 Content YAML from the research file (draft, placeholders where unsourced) · P0
- [ ] 3.2 HeroIntro with portrait + credit · P0
- [ ] 3.3 FactsNotebook · P0
- [ ] 3.4 Legend or History? + The Other Side components · P0
- [ ] 3.5 Portrait rights check and media record · P0
- [ ] 3.6 VideoPlayer (YouTube nocookie / file, captions, transcript, AI badge, hidden unless published) · P0
- [ ] 3.7 Video production brief (`production/juan-sebastian-elcano/video-brief.md`) · P1
- [ ] 3.8 ComicViewer + comic script and character sheet · P0
- [ ] 3.9 Movie section styling · P0
- [ ] 3.10 Places to visit (verified only) · P2
- [ ] 3.11 Sources list with back-links from claims · P0
- [ ] 3.12 Per-page OG image + JSON-LD (Person, Article) · P0
- [ ] 3.13 Author review → `reviewed` · P0

## Phase 4 — Interactive features

- [ ] 4.1 Gallery filters (category, century, value), synced to the URL · P1
- [ ] 4.2 Comic: swipe, keys, expand, notes, focus management · P0
- [ ] 4.3 Chapter mini table of contents + progress bar · P1
- [ ] 4.4 Scroll reveals (CSS + IntersectionObserver) · P2
- [ ] 4.5 Accessible historical-note popovers · P1
- [ ] 4.6 Related and next legend navigation · P1

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
