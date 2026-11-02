# Comic script — Juan Sebastián Elcano

**Status:** draft script, matching the 8 panels in `src/content/legends/juan-sebastian-elcano.yaml`. Captions are the legend file's text; change them there, not here.
**Format:** 4:3 panels, 1600×1200 master, exported as JPEG/WebP to `src/assets/legends/juan-sebastian-elcano/comic-0N.jpg`.
**Style:** historical engraving meets classic adventure comic: ink linework, cross-hatching, limited palette (umber, sepia, parchment, one burgundy accent), no photorealism.
**Labelling:** every panel is registered in the legend's `media` list with `kind: ai-generated`, and no panel is ever used as the portrait.
**Dialogue:** none in this draft. Any line added later must be a sourced quotation or marked `dramatized`.

## Character sheet (use the same description in every prompt)

> **ELCANO:** Basque mariner in his early 30s (1519–1522), weathered face, short dark beard, dark hair under a simple dark wool cap; plain loose linen shirt, dark wool doublet, sash at the waist, knee breeches, simple leather shoes; no armour, no plumed hat, no officer's finery. Calm, watchful expression.
>
> No portrait from life exists (Fundación Elkano). This is an interpretation; keep it consistent and never present it as his likeness.

> **THE VICTORIA:** a small 16th-century nao/carrack, high stern castle, three masts with square sails on the fore and main and a lateen mizzen, weathered and patched sails, no flags beyond a simple Castilian banner. ⚠️ Check rig details against Museo Naval material.

> **CREW:** multinational: European, Asian and African sailors in plain working clothes.

## Panels

| #   | Caption (from the legend file)                                  | Scene description                                                                                 | Prompt notes                                                         |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1   | Getaria, on the Basque coast… born here around 1487.            | A small stone harbour town on a green headland, fishing boats, grey sea                           | Wide establishing shot; no people needed                             |
| 2   | August 1519. He sails from Seville as master of the Concepción… | ELCANO on deck checking rigging, crew working around him                                          | Mid shot; he is working, not commanding                              |
| 3   | Mactan, April 1521. Magellan is killed…                         | Ships anchored off a distant tropical shore, smoke rising; officers arguing on deck in silhouette | No depiction of the death itself                                     |
| 4   | Tidore, December 1521. The Trinidad is leaking…                 | Two ships at anchor off a volcanic island; one heeled over for repairs                            | The parting of the two ships; ELCANO small on the Victoria's deck    |
| 5   | For about nine weeks gales hold the Victoria off the Cape…      | The VICTORIA in heavy seas off a rocky cape, patched sails straining                              | Dramatic weather; ship small against the sea                         |
| 6   | Cape Verde, July 1522. The crew find their calendar…            | ELCANO with an axe at the anchor cable; a boat being seized near the shore in the distance        | Tension, not combat; the boat's crew are left behind                 |
| 7   | 6 September 1522. The Victoria reaches Sanlúcar with eighteen…  | Dawn at a river mouth, the battered ship arriving, a handful of gaunt men on deck                 | Warm light; the ship visibly worn; about 18 figures, not a full crew |
| 8   | Elcano writes to Charles V…                                     | ELCANO writing a letter at a table; quill, wax, a globe in the background                         | Keep the letter's text unreadable (we do not reproduce its wording)  |

## Production checklist

- [ ] Generate with the character sheet included verbatim in every prompt
- [ ] Review each panel for anachronisms (clothing, ship rig, flags)
- [ ] Add each image to `media` (`kind: ai-generated`, tool, date) and reference it from its panel's `image`
- [ ] Set `comic.status: reviewed` after review; the comic then appears on the public page
