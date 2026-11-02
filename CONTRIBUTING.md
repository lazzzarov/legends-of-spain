# Contributing to Legends of Spain

Thank you for helping tell these stories well. Contributions of code, historical corrections, sources and illustrations are all welcome.

## Ground rules

1. **Never invent history.** No made-up events, dialogue, statistics or odds. If something isn't documented, it doesn't go in, or it is labelled _Legend_ or _Dramatization_.
2. **Every fact needs a source.** The build enforces this.
3. **Show the other side.** Controversies, human consequences and shared credit belong in the story.
4. **Respect image rights.** Being publicly accessible doesn't make an image free to reuse. Record its license, and be aware that Spanish law (LPI art. 128) can protect photographs of public-domain paintings for 25 years.
5. **Label AI.** AI-generated images are marked `kind: ai-generated` and can never be used as a portrait.

## Ways to help

- **Report a historical error:** open an issue with the _Historical correction_ template and include a source.
- **Suggest a legend:** use the _Suggest a legend_ template.
- **Improve content:** edit a legend's YAML file and open a pull request.
- **Code:** see the README for setup. Run `npm run build`, `npm test` and `npm run e2e` before opening a pull request.

## Pull requests

- Keep each pull request focused on one legend or one feature.
- Content changes: explain which sources support the change.
- New media: include creator, source URL, license and required attribution in the legend's `media` list.
- CI must pass.

## Content review

New or changed legends start at `review.status: draft` and appear only in development. The maintainer moves them to `reviewed` after checking the sources.
