# Video brief — Juan Sebastián Elcano: "The Long Way Home"

**Status:** updated after the research pass (see `research.md`). Verify the remaining ⚠️ items before generating footage.
**Target:** 60 seconds (45–90 acceptable) · 16:9 master, 9:16 cut for social · English voiceover, burned-in captions on the social cut, WebVTT captions for the site.
**Tool:** Higgsfield (check its current terms on output ownership and redistribution before publishing).
**On-screen disclosure (required, first 3 seconds and end card):** "AI-generated historical dramatization."

## Narrative hook

A commander is dead, the expedition has fallen apart, and a ship's master who was never meant to lead must choose how to get a battered ship home: back the way they came, or west through a rival empire's waters.

## Historical setting

- **When:** 1519–1522 (the main arc is 1521–1522).
- **Where:** Mactan (Philippines), the Indian Ocean, the Cape of Good Hope, the Atlantic, Sanlúcar de Barrameda (mouth of the Guadalquivir, Spain).
- **What:** the Magellan expedition, completed by Elcano in command of the _Victoria_.

## Structure and scenes

| #   | Time    | Scene                      | Visual                                                             | Voiceover outline                                                                                                                              |
| --- | ------- | -------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 0–6 s   | Disclosure + hook          | Dark sea at night; a single lantern on a carrack's deck            | "In 1521, an expedition sent to reach the Spice Islands was falling apart."                                                                    |
| 2   | 6–14 s  | Mactan, 1521               | Distant shoreline, smoke; no depiction of Magellan's death itself  | "Its commander, Ferdinand Magellan, had been killed at Mactan. Command passed from hand to hand."                                              |
| 3   | 14–22 s | Elcano takes command       | A man in plain mariner's clothing studying a chart by lamplight    | "The man who emerged in command of the _Victoria_ had sailed as a ship's master — not a captain."                                              |
| 4   | 22–32 s | Tidore, December 1521      | Two ships off a volcanic island; one heeled over for repairs       | "At Tidore the Trinidad was leaking. The Victoria would go home alone — west, across the Indian Ocean, through waters controlled by Portugal." |
| 5   | 32–44 s | The Cape and Cape Verde    | Weeks of gales off a rocky cape; an anchor cable cut at Cape Verde | "For weeks gales held them off the Cape. At Cape Verde the Portuguese seized a boat's crew, and Elcano sailed on without them."                |
| 6   | 44–54 s | Sanlúcar, 6 September 1522 | Dawn, a river mouth, the battered ship with a handful of men       | "On 6 September 1522 the _Victoria_ reached Sanlúcar. Sixty men had left the Moluccas. Eighteen came home."                                    |
| 7   | 54–60 s | Legacy + end card          | The ship's wake fading into a map of the globe; title card         | "Magellan began it. Elcano finished it. Dozens of sailors made it possible." · End card: _Legends of Spain_ + disclosure                       |

## Key characters

- **Juan Sebastián Elcano** (born c. 1487, Getaria). Basque mariner, master of the _Concepción_, later in command of the _Victoria_. No portrait from life exists (Fundación Elkano), so his look is an interpretation. Keep it consistent with the comic character sheet.
- **Ferdinand Magellan:** referenced only. Do not depict his death graphically.
- **Crew:** multinational (European, Asian and African sailors). Show the diversity of the crew; avoid a single-nation look.

## Visual references

- 16th-century nautical charts (rhumb lines, compass roses) for transitions.
- Carrack/nao silhouettes ⚠️ (check the _Victoria_'s ship type and rig against Museo Naval material).
- Light: lantern-lit interiors, grey Atlantic, a golden dawn for the arrival.
- Palette matched to the site: umber, sepia, parchment, muted burgundy accents.

## Historical accuracy considerations

- Numbers allowed in voiceover (sourced in the legend file): 60 left the Moluccas, 18 reached Sanlúcar. Do not give a single figure for the 1519 crew; sources range from 234 to 285.
- The crew included Asian men the sources describe as enslaved; do not erase them from crowd scenes.
- Do not invent dialogue. Voiceover only, in the third person.
- Do not show Magellan's death in detail or invent a scene of it.
- Credit is shared: the closing line must not make Elcano the voyage's sole author (Magellan and Faleiro planned it; see the legend's "Legend or History?").
- The Portuguese route is "controlled by Portugal" — do not show invented sea battles.
- ⚠️ Costume: 1520s Iberian mariner's clothing; no anachronistic tricorns, uniforms or later naval dress.

## Deliverables

- [ ] 60 s 16:9 master (H.264, 1080p) and 9:16 social cut
- [ ] Poster frame (1280×720) → `src/assets/legends/juan-sebastian-elcano/video-poster.jpg`
- [ ] Captions `public/media/juan-sebastian-elcano/video.en.vtt`
- [ ] Transcript text → `video.transcript` in the legend file
- [ ] Upload to YouTube (unlisted until launch) → `video.src` = 11-character id, `video.status: published`
