# Content guide

How to write a legend. The schema in `src/lib/schema.ts` is the authority; this guide explains the intent.

## One file per legend

`src/content/legends/<slug>.yaml`. The slug is the URL (`/legends/<slug>/`), in lowercase-kebab-case, for example `juan-sebastian-elcano`. Start from `docs/templates/legend.template.yaml`.

## The 2-minute path

| Field             | Length           | Purpose                                                             |
| ----------------- | ---------------- | ------------------------------------------------------------------- |
| `tagline`         | 1 sentence       | Makes a stranger want to read on                                    |
| `hook`            | 40–70 words      | A documented moment of tension. Never an invented scene.            |
| `chapters`        | 5 × 50–100 words | `beginning`, `challenge`, `odds`, `moment`, `legacy`, in that order |
| `chapters[].more` | optional         | Longer text shown under "Read more"                                 |

## Credibility labels (`status`)

- `verified`: supported by primary sources or scholarly consensus.
- `disputed`: sources or historians disagree. Say how, and give ranges for numbers.
- `legend`: a popular story the record doesn't support (or only partly supports).
- `dramatization`: creative interpretation, such as film pitches and invented comic dialogue.

## Sources

Listed once per legend under `sources`, each with a kebab-case `id`. Chapters, facts, myths, places, movie moments and comic panels reference those ids. Prefer primary records (AGI, AGS, AHN, PARES), then institutions (RAH, BNE, Museo Naval), then scholarship.

## Media

Every image is an entry in `media` with `kind`:

- `historical`: a period artwork. Set `posthumous: true` when it was made after the person's lifetime.
- `original-illustration`: made for this project.
- `ai-generated`: made with an AI tool. Never allowed as the `portrait`.
- `photograph`.

Record `license` and `attribution` for every entry. Leave out `file` until the asset exists; the site then shows a labelled placeholder.

## Video and comic

Both are optional. A video appears only when `status: published`, which requires `provider`, `src` and `transcript`. Comic dialogue is either a `quotation` with a `source`, or marked `dramatized`.

## Review

`review.status` moves through `placeholder → draft → sourced → reviewed → published`. Only `reviewed` and `published` legends appear in production.
