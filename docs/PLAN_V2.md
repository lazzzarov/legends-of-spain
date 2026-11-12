# V2 plan: timeline, story mode and videos

Status: **proposed, waiting for approval** (12 November 2026). Nothing here is built yet.

V1 is live with 14 reviewed legends. V2 adds four things:

1. A timeline, so readers see who came first.
2. A presentation ("story") mode that plays a legend like a short film.
3. A video script for every legend.
4. The AI-generated videos themselves, produced with Higgsfield.

The content rules do not change: no invented history, dialogue or numbers; every AI image is labelled; nothing AI-made is presented as an authentic portrait.

## Decisions needed before building

| #   | Decision                           | Recommendation                                                                                                                  |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| D1  | Look of the videos                 | "Painted chronicle": animated oil painting and engraving, not photoreal. It matches the site and can't be mistaken for footage. |
| D2  | Short silent loops hosted on Pages | Allow them (new). The approved rule is "video on YouTube"; that stays for the full films. Loops are 6–8 s, muted, under 1.5 MB. |
| D3  | Pilot first                        | Make Elcano's video end to end, measure the credits it uses, then decide how many of the other 13 to produce.                   |
| D4  | Narrator                           | One voice for all 14 films, English, calm documentary tone. Picked from Higgsfield's voice list during the pilot.               |
| D5  | YouTube channel                    | You create the channel and upload (Claude cannot sign in or create accounts). Claude prepares title, description and captions.  |

## Phase 7 — Timeline

**Goal:** one glance shows the order of the 14 lives and their defining moments, 1480–1836.

- **Data:** add `keyEvent: { year, label, source }` to each legend file (for example Elcano: 1522, "The Victoria returns to Sanlúcar"). The year and label come from the legend's existing "moment" chapter, so no new research. Birth and death years are already in the files.
- **Page `/timeline/`:**
  - Desktop: a horizontal chronicle. Each legend is a bar from birth to death with a wax-seal marker at the key event. Century rules run behind. Bars are grouped in lanes so overlapping lives (Cortés, Elcano, Leyva, Pizarro) read clearly.
  - Mobile: the same data as a vertical line, one legend per stop.
  - Each bar links to the legend. Hover or focus shows portrait, dates and the one-line event.
  - The existing kind and value filters work here too.
- **Home page:** a compact strip ("Fourteen lives, three and a half centuries") that links to the full timeline.
- **Legend page:** a small "where this sits" strip above the next-chapter link, with the neighbours before and after.
- **Accessibility:** the timeline is an ordered list in the markup, readable without CSS or JavaScript; markers are links with full text labels; no information by colour alone.
- **Tests:** unit test for the lane and scale maths; e2e for order, links, keyboard use, axe, and no horizontal page overflow at 375 px.
- **Not included:** background events (reigns, wars). They need their own sources; they can be a later addition.

Effort: small. No dependencies on the other phases.

## Phase 8 — Story mode (presentation)

**Reference:** renzopayero.dev `?build=present`. What it does: the page plays itself as a guided tour. A bar fixed at the bottom shows step dots, the current step's name, a progress line, and Pause and Skip buttons. Sections animate in one after another.

**Our version:** any legend can be played as a two-minute illustrated story, and the whole book can be played in timeline order.

- **Entry points:** a "Play the story" button on each legend page; "Play the book" on the home page and the timeline; the URL `?mode=story` so a link can open straight into it.
- **Slides, built from content that already exists:**
  1. Title card: portrait, name, dates, tagline.
  2. Five chapter slides (The Beginning → The Legacy), one idea per slide, with the credibility label.
  3. "The moment" as a full-bleed pull quote or date.
  4. Three facts, one at a time, numbers counting up.
  5. Legend or history: the myth, then the verdict.
  6. The other side.
  7. End card: sources count, "Read the full chapter", next legend.
- **Control bar:** step dots, step title, progress line, Play/Pause, Previous/Next, Exit. Keyboard: Space pauses, arrows move, Esc exits. Swipe on touch.
- **Motion:** slow push-in on the portrait (Ken Burns), text that sets line by line, a drawn ink line between slides, the compass rose as the loading mark. Transform and opacity only.
- **When the videos exist:** each slide takes its matching shot as a muted background loop, and the title card can play the full film. Story mode works without them.
- **Accessibility:**
  - Never starts by itself. It starts only on a button press or an explicit `?mode=story` link.
  - With reduced motion, slides change only when the reader presses Next, with no animation.
  - Timing follows text length, and Pause is always visible (WCAG 2.2.2).
  - Focus is managed like a dialog; a live region announces each slide title; the full page stays one keypress away.
- **Engineering:** one vanilla script, like the rest of the site (still no React needed). Slides are generated at build time from the legend file, so every legend gets story mode with no extra writing.
- **Tests:** e2e for play, pause, keys, exit, deep link, reduced motion, and axe on an open slide.

Effort: medium. Independent of the videos; improves when they arrive.

## Phase 9 — Video scripts

**Goal:** a reviewed script for all 14 films. Elcano's brief exists and becomes the template.

- **File:** `production/<slug>/video-script.md` (Elcano's `video-brief.md` is upgraded to the same format).
- **Format (60 s, 7 beats):**
  - Hook line (first 6 s).
  - Beat table: time, scene, voiceover line, **source id for every line**, on-screen text.
  - Voiceover total 130–150 words, third person, no invented dialogue.
  - "Do not show" list (for example no graphic deaths, no invented battles, no anachronistic dress).
  - Numbers allowed in voiceover, each already sourced in the legend file.
  - Closing line that shares credit, plus the other side in at least one beat.
  - Disclosure: "AI-generated historical dramatization" in the first 3 s and on the end card.
- **Shot list per beat:** subject, setting, period detail, camera move, light, and the still that anchors it. This is what Phase 10 turns into prompts.
- **Character sheet per legend:** age at the events, clothing of the period and rank, what is documented about appearance and what is interpretation. Where a real portrait exists it guides the likeness; the output is still labelled as an AI interpretation.
- **Check:** a script that verifies every voiceover line cites a source id that exists in the legend file.
- **Your review:** you approve each script before any credits are spent on it.

Effort: medium (14 scripts). Can run in parallel with Phases 7 and 8.

## Phase 10 — Video production with Higgsfield

### Resources found

Your Higgsfield account is connected: **Plus plan, about 718 credits** (checked 12 November 2026).

| Need                     | Higgsfield resource                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Character consistency    | `character-sheet` workflow (multi-view sheet per legend), reused as a reference in every shot                      |
| Keyframe stills          | Image models (Nano Banana Pro for the 4K render, Seedream for small corrections)                                   |
| Animation, main choice   | **Seedance 2.5**, reference mode: start frame + up to 30 reference images, 4–30 s, 1080p, 480p draft then finalize |
| Animation, second choice | **Kling 4.0**: ordered keyframes (start, middle, end), 3–30 s, 1080p                                               |
| Narration                | Text-to-speech with one locked voice (`narration` workflow fits lines to fixed time windows)                       |
| Music and sound          | Audio generation: a period-flavoured score bed and sea, wind, crowd ambience                                       |
| Assembly                 | `video-montage` workflow: join clips, lay voice and music, burn captions for the social cut                        |
| Vertical cut             | `reframe` tool, 16:9 → 9:16                                                                                        |
| Finishing                | Video upscale if a shot needs it                                                                                   |

Higgsfield also has a one-shot `faceless-video` workflow with a History type. It is faster, but it gives less control per shot, and historical accuracy needs shot-by-shot checking, so the plan uses the manual pipeline. It remains a fallback.

Still to confirm in the pilot: credits per second for each model (the catalogue doesn't list prices; every job is quoted before it runs), and Higgsfield's current terms on ownership and redistribution of outputs.

### Pipeline per film

1. **Style bible (once, shared by all 14):** 4–6 reference images that fix the look: palette from the site (umber, sepia, parchment, burgundy), visible brushwork, engraved linework, candle and sea light, film grain.
2. **Character sheet** from the script's description, checked against the period.
3. **Seven keyframe stills**, 16:9, one per beat. You and Claude check each for anachronisms before animating: cheaper to fix a still than a clip.
4. **Animate** each still for 6–9 s, silent, as a 480p draft. Review, then finalize the keepers at 1080p. Budget two takes per shot.
5. **Narration** in the locked voice, timed to the beats.
6. **Score and ambience**, mixed under the voice.
7. **Assemble:** disclosure card (3 s), seven shots, end card. Export the 16:9 master, the 9:16 cut, a poster frame, WebVTT captions and the transcript.
8. **Cut site assets from the same footage:** a 6–8 s muted hero loop and the per-slide loops for story mode.
9. **You review the film**, upload it to YouTube, and send the video id.
10. **Publish:** fill `video` in the legend file (the site already has the player, the AI label, captions and transcript support). The credits page lists the tool and date.

### How the prompts are built

Every prompt has the same five parts, in this order, so all 14 films look like one series:

```
[STYLE]    Animated oil painting in the manner of a 16th-century Spanish chronicle,
           visible brushwork, engraved linework in the shadows, muted umber, sepia
           and parchment palette with burgundy accents, soft film grain. Not photoreal.
[SUBJECT]  <who, age, clothing and gear from the character sheet>
[SETTING]  <place, year, weather, time of day, period details from the script>
[CAMERA]   <one move only: slow push-in / lateral track / crane up / locked-off>
[EXCLUDE]  No text, no modern objects, no anachronistic uniforms or tricorns,
           no gore, no flags or heraldry unless specified.
```

Worked example, Elcano beat 6 (Sanlúcar, 6 September 1522):

- **Still:** "[STYLE] A battered three-masted nao with patched, salt-stained sails enters a wide river mouth at dawn; a handful of gaunt sailors in worn 1520s Iberian mariner's clothing stand at the rail, among them a bearded Basque master in a plain dark doublet (reference: Elcano character sheet). Low golden light on grey water, sandbanks and reed beds, distant whitewashed town. Wide shot, ship small against the sky. [EXCLUDE]"
- **Motion:** "Start from the still. The ship glides slowly left to right, sails barely filling, water streaming from the pumps. Gulls cross the frame. Slow push-in toward the men at the rail. Gentle swell, no cuts. 8 seconds."
- **Voiceover:** "On 6 September 1522 the Victoria reached Sanlúcar. Sixty men had left the Moluccas. Eighteen came home." (sources: `rah-elcano`, `pigafetta-stanley`)
- **Checks before approval:** ship type and rig, crew count on deck is small, no invented flags, crew not shown as a single nationality.

### What makes the page wow

- **Living hero:** on each legend page the portrait frame becomes a slow, silent painted loop of the legend's defining moment. The real historical portrait stays beside it with its credit, so the two are never confused. The loop carries an "AI-generated dramatization" label.
- **Story mode with footage:** each slide plays its own shot behind the text.
- **Home page:** the cover cycles through the 14 hero loops in timeline order.
- **Timeline:** hovering a legend plays two seconds of its loop.
- **Performance rules:** poster image first; loops load only when visible and only on connections that allow it; never on reduced motion or data-saver; each loop under 1.5 MB (AV1/WebM with an H.264 fallback); the page must keep its Lighthouse scores.

### Budget and order

- **Pilot (Elcano):** full pipeline once. Record credits per still, per clip second, per voice minute. Expect roughly 7 stills, 14 draft clips, 7 finals, one narration, one score.
- **After the pilot:** with the measured cost, choose: all 14 now, a first batch of 4–5 (for example Elcano, Lezo, Balmis, Cortés, Orellana), or top up credits. Legends without a film keep working exactly as today, because video sections stay hidden until published.
- **Every paid step is quoted first** and runs only with your go-ahead.

## Suggested order

1. **Now, in parallel:** Phase 7 (timeline) and Phase 9 (scripts, starting with Elcano's upgrade).
2. **Then:** Phase 8 (story mode), built on the timeline order.
3. **Pilot:** Phase 10 for Elcano, wired into the hero and story mode.
4. **Decide the batch** from the pilot's cost and result, then produce the rest.

## Risks

- **Accuracy drift in generated footage** (wrong ships, armour, flags). Handled by the stills-first review and the "do not show" lists.
- **Likeness:** AI faces can look authoritative. Handled by the painted style, the label on every asset, and keeping the real portrait next to it.
- **Credits:** 718 credits may not cover 14 films. Handled by the pilot and batching.
- **Page weight:** loops can hurt mobile speed. Handled by the performance rules and Lighthouse checks in CI.
- **Tool terms:** confirm Higgsfield's output licence before anything is published.
