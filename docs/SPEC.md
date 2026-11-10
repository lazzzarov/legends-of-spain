# Legends of Spain — approved specification (Phase 0)

Approved 2026-11-02. Changes to anything here are proposed first, never made silently.

## Product

An open-source, illustrated storybook of Spanish explorers, commanders and pioneers (c. 1480–1836). Each legend can be read in about two minutes, with optional depth. Core message: _Spain has produced extraordinary individuals whose stories deserve to be told — truthfully._ Success test: a visitor with no interest in history is hooked within 30 seconds and opens a second legend.

## Decisions

| Topic     | Decision                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------- |
| Name      | **Legends of Spain**                                                                              |
| Stack     | Astro (static) + React islands + TypeScript + Tailwind v4                                         |
| Hosting   | GitHub Pages at `lazzzarov.github.io/legends-of-spain/`. No custom domain.                        |
| Repo      | `lazzzarov/legends-of-spain`, public since V1 (10 Nov 2026)                                       |
| Language  | English first; UI strings and routes ready for more languages later                               |
| Roster    | The 14 figures in `docs/research/20261102_deep-research.md`; Elcano is the first template legend  |
| Research  | Not now: build first, fill in content later. Unknowns stay as labelled placeholders.              |
| Video     | YouTube (nocookie) embeds; self-hosted file supported. Hidden until published.                    |
| Comic     | Hidden until produced. Panels from an AI image tool with character sheets; labelled AI-generated. |
| Licenses  | MIT (code), CC BY-SA 4.0 (text), per-asset media licenses                                         |
| Analytics | None in V1                                                                                        |
| Search    | Deferred until 12+ legends are published (Pagefind)                                               |

## Creative direction

A 16th-century chronicle printed today. Palette tokens: parchment `#F3E9D2`, cream `#FAF4E6`, caramel `#C08A4D`, sepia `#8B5A2B`, burnt `#5A3A22`, umber `#3B2416`, ink `#231F1C`, gold `#B8954A` (ornament only), burgundy `#6E1F2A`. Typefaces: IM Fell English / SC for display, Source Serif 4 for body, Inter for UI. Ornaments used sparingly; texture only at page edges; body text always on flat cream. Motion: native view transitions and gentle reveals, all turned off under reduced motion. Approved mockup: https://claude.ai/artifact/BdCGdabB54SzhSsahesn2N

## Architecture

Routes: `/`, `/legends/`, `/legends/<slug>/`, `/why/`, `/credits/`, 404.

Story page order: intro → 5 chapters → video* → key facts → comic* → why this deserves a movie → legend or history? → the other side of the story → places* → sources → next legend. (* hidden when empty)

## Content model

See `src/lib/schema.ts` and `docs/CONTENT_GUIDE.md`. Each legend is one YAML file, with its sources and media registry inside it, which keeps contributions to a single file. Build-time guarantees: every fact, myth, place and movie moment cites at least one source; references must resolve; chapters must come in story order; quotations need a source; an AI image can't be a portrait; production shows only `reviewed`/`published` legends.

## Quality bar (V1)

WCAG 2.2 AA; Lighthouse mobile ≥ 90 performance, 100 accessibility and SEO; under 60 KB of JavaScript on story pages; deep links work after refresh; reduced motion respected.
