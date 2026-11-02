# Legends of Spain

**Legends worthy of a thousand films.** An open-source, illustrated storybook about Spanish explorers, commanders and pioneers. Each story can be read in two minutes and is sourced to the archive.

Every legend gets one chapter: a cinematic hook, a five-part story, key facts, a comic, a film pitch, the documented controversies ("The Other Side of the Story") and its sources. Every claim is labelled _Verified_, _Disputed_, _Legend_ or _Dramatization_, and every AI-generated image is marked as such.

> **Status:** early development (Phase 1 of 7). See [docs/CHECKLIST.md](docs/CHECKLIST.md).

## Quick start

Requirements: Node 24 (see `.nvmrc`) and npm.

```bash
npm install
npm run dev          # http://localhost:4321/legends-of-spain/ (drafts visible)
```

| Command           | What it does                                                          |
| ----------------- | --------------------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload; shows placeholder and draft legends       |
| `npm run build`   | Type-check, validate all content against the schema, build to `dist/` |
| `npm run preview` | Serve the production build locally                                    |
| `npm test`        | Unit tests (content schema, helpers)                                  |
| `npm run e2e`     | End-to-end and accessibility tests (Playwright + axe)                 |
| `npm run format`  | Format with Prettier                                                  |

Before the first `npm run e2e`, install the test browser once: `npx playwright install chromium`.

## How it works

- **Astro** generates one static HTML page per legend, so links, refreshes and social previews work on GitHub Pages without a server. **React** is used only for interactive pieces (comic viewer, filters).
- **Tailwind CSS v4** with design tokens in `src/styles/global.css`. Fonts are self-hosted.
- **Content is data.** Each legend is a single YAML file in `src/content/legends/`, validated at build time by `src/lib/schema.ts`. The build **fails** if a fact has no source, a reference points nowhere, or an AI image is used as a portrait.
- **Review gate.** Production builds show only legends with `review.status: reviewed` or `published`. Placeholders and drafts appear in `npm run dev`, or with `PUBLIC_SHOW_DRAFTS=true`.

```
src/
  content/legends/<slug>.yaml   one file per legend (the filename is the URL)
  content.config.ts             registers the collection
  lib/schema.ts                 the content contract
  components/                   layout, ornaments, gallery, story, media
  layouts/  pages/  styles/
tests/unit  tests/e2e           Vitest and Playwright
docs/                           spec, checklist, content guide, research
production/<slug>/              video briefs and comic scripts (not shipped)
```

## Adding a legend

Copy `src/content/legends/example-legend.yaml` to `<slug>.yaml`, fill it in, and run `npm test`. See [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) and [CONTRIBUTING.md](CONTRIBUTING.md).

## Deployment

Pushing to `main` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml` at `https://lazzzarov.github.io/legends-of-spain/`. The deploy is skipped while the repository is private. Once it is public, set **Settings → Pages → Source: GitHub Actions**.

## Licenses

- Code: [MIT](LICENSE)
- Written content: [CC BY-SA 4.0](LICENSE-CONTENT)
- Media: each asset keeps its own license, listed on the site's Credits page.
