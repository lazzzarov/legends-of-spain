# Video script — Juan Sebastián Elcano: "The Long Way Home"

- **Status:** draft, awaiting the editor's approval. No footage is generated before approval.
- **Length:** 60 s target (45–90 s allowed) · 16:9 master, 9:16 social cut.
- **Voice:** English, third person, one narrator for the whole series. No invented dialogue.
- **Look:** painted chronicle (animated oil painting and engraving, not photoreal). See `docs/PLAN_V2.md`.
- **Disclosure (required):** "AI-generated historical dramatization" on screen for the first 3 s and on the end card.

## Hook

A commander is dead and the expedition has fallen apart. A ship's master who was never meant to lead must bring one battered ship home through a rival empire's waters.

## Beats

Every voiceover line must cite source ids from the legend file.

| #   | Time    | Scene                      | Voiceover                                                                                                                                                               | Sources                           | On-screen text                           |
| --- | ------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ---------------------------------------- |
| 1   | 0–6 s   | Hook                       | In 1521, an expedition sent west to reach the Spice Islands was falling apart.                                                                                          | `rah-elcano`                      | AI-generated historical dramatization    |
| 2   | 6–15 s  | Mactan and after, 1521     | Its commander, Ferdinand Magellan, had been killed on Mactan. After a run of command changes, a ship's master named Juan Sebastián Elcano was captain of the Victoria.  | `rah-elcano`, `pigafetta-stanley` | Mactan · April 1521                      |
| 3   | 15–24 s | Tidore, December 1521      | At Tidore the other ship was leaking. The Victoria would go home alone: west, by the Portuguese route, without calling at any port. Sixty men went aboard.              | `rah-elcano`, `pigafetta-stanley` | Tidore, Moluccas · December 1521         |
| 4   | 24–33 s | The Cape of Good Hope      | For about nine weeks, gales held her off the Cape of Good Hope. Scurvy spread and the ship leaked. The crew begged him to put in at Mozambique. He refused.             | `rah-elcano`, `pigafetta-stanley` | Cape of Good Hope · 1522                 |
| 5   | 33–43 s | Cape Verde                 | Starving, they stopped at Portuguese Cape Verde, and found their calendar a day behind. When the Portuguese seized the boat's crew, Elcano cut the cable and left them. | `rah-elcano`, `pigafetta-stanley` | Cape Verde · July 1522                   |
| 6   | 43–52 s | Sanlúcar, 6 September 1522 | On 6 September 1522 the Victoria reached Sanlúcar. Eighteen men came home.                                                                                              | `rah-elcano`, `pigafetta-stanley` | Sanlúcar de Barrameda · 6 September 1522 |
| 7   | 52–60 s | Legacy and end card        | Magellan planned the voyage and died on it. Elcano finished it. They had sailed right round the world.                                                                  | `rah-elcano`                      | Legends of Spain · AI-generated          |

## Shot list

One still per beat; each still is checked before it is animated.

| #   | Still (subject and setting)                                                                                                                                 | Camera              | Light                          | Check before animating                                   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------ | -------------------------------------------------------- |
| 1   | Two small naos on a dark tropical sea at night, one lantern on a deck, no land in sight                                                                     | Slow push-in        | Moonless night, single lantern | Ship type and rig; no flags                              |
| 2   | A distant tropical shoreline with smoke rising, seen from a ship's rail; a mariner's hands on the rail in the foreground. Magellan's death is not shown     | Locked-off          | Hazy midday                    | No battle, no bodies                                     |
| 3   | Two naos off a steep volcanic island; one heeled over on the shore for repairs, the other loading sacks of cloves; Elcano on deck with a chart              | Lateral track       | Humid late afternoon           | Crew of several origins; no European town                |
| 4   | The Victoria alone in a grey gale off a rocky cape, sails reefed, men at the pumps                                                                          | Slow drift          | Storm grey, spray              | No second ship; no modern rigging                        |
| 5   | A ship's boat held at a quay by armed Portuguese guards; in the background the Victoria's anchor cable parts and her sails fill                             | Crane up            | Hard tropical sun              | 1520s Portuguese dress, no uniforms; no fighting         |
| 6   | The battered Victoria, sails patched, entering a wide river mouth at dawn; a handful of gaunt men at the rail; sandbanks, reeds, a distant whitewashed town | Slow push-in        | Golden dawn on grey water      | Few men on deck (eighteen came home); no crowd, no flags |
| 7   | The ship's wake dissolving into the rhumb lines of a 16th-century chart that shows a full circle of the globe                                               | Crane up, pull back | Parchment tones                | Chart style of the 1520s; no modern coastlines           |

## Character sheet

Use the same description in every prompt.

- **Elcano:** Basque mariner in his early thirties (1519–1522). Weathered face, short dark beard, dark hair under a plain dark wool cap. Loose linen shirt, dark wool doublet, sash, knee breeches, plain leather shoes. No armour, no plumed hat, no officer's finery. Calm and watchful.
- **Likeness:** no portrait from life exists (`fundacion-elkano-representations`). This is an interpretation and is always labelled as one.
- **The Victoria:** a small 16th-century nao with a high stern castle and three masts: square sails on the fore and main, a lateen mizzen, weathered and patched canvas. Check the rig against Museo Naval material before the first still is approved.
- **Crew:** Europeans of several nations and Asian men (`rah-elcano` counts thirteen Asian men it describes as enslaved). Plain working clothes. Do not show a single-nation crew.

## Do not show

- Magellan's death, or any invented scene of it.
- Sea battles with the Portuguese; none is recorded on the homeward voyage.
- Anachronistic dress: tricorns, uniforms, later naval coats.
- A crowd welcoming the ship at Sanlúcar; the sources do not describe one.

## Numbers allowed in voiceover

- 60 aboard leaving the Moluccas; 18 reached Sanlúcar (`pigafetta-stanley`, `rah-elcano`).
- About nine weeks off the Cape (`rah-elcano`).
- No figure for the 1519 crew: sources range from 234 to 285.

## Deliverables

- [ ] 16:9 master (H.264, 1080p) and 9:16 social cut
- [ ] Poster frame (1280×720) → `src/assets/legends/juan-sebastian-elcano/video-poster.jpg`
- [ ] Hero loop (6–8 s, muted) and one loop per beat for story mode
- [ ] Captions → `public/media/juan-sebastian-elcano/video.en.vtt`
- [ ] Transcript → `video.transcript` in the legend file
- [ ] YouTube id → `video.src`, then `video.status: published`
