# Antonio de Leyva: research note

Researched 2026-11-02. Legend file: `src/content/legends/antonio-de-leyva.yaml` (review status `sourced`).

## Sources opened

| id                 | Source                                                                                                                                                                      | Type          | Notes                                                                                                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rah-leiva`        | V. Alonso Juanola, "Antonio de Leiva", RAH _Diccionario Biográfico Español_. <https://historia-hispanica.rah.es/biografias/25978-antonio-de-leiva>                          | institutional | Full text read (via the site and its public JSON API). The entry is listed under "Leiva", not "Leyva". Bibliography is 19th–20th century; no archival sources are cited. |
| `acami-pavia`      | C. Muro Benayas, "Batalla de Pavía", Academia de las Ciencias y las Artes Militares, 6 Jan 2025. <https://www.acami.es/wp-content/uploads/2025/02/Batalla-de-Pavia-web.pdf> | institutional | Read in full. Narrative without footnotes.                                                                                                                               |
| `britannica-pavia` | R. G. Grant / Britannica Editors, "Battle of Pavia". <https://www.britannica.com/event/Battle-of-Pavia>                                                                     | reference     | Read. Internally inconsistent on French strength (28,000 vs 20,000).                                                                                                     |
| `research-dossier` | Project dossier                                                                                                                                                             | reference     | Used for leads only.                                                                                                                                                     |

Not consulted: AGS Consejo de Guerra; the Leyva correspondence (GYM, LEG. 6, 1533–35) named by the dossier; Calendar of State Papers Spain; the Desperta Ferro Moderna no. 30 monograph (2017) on Pavia; Konstam and Oman. These are the next sources to open, especially for garrison numbers.

## Claim → source

| Claim                                                                                                                                                                                                                                                                      | Source(s)                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Born 1480 in Navarre                                                                                                                                                                                                                                                       | rah-leiva ("Navarra, 1480"); acami-pavia ("el navarro Antonio de Leyva") |
| Son of Juan Martínez de Leiva, general of the Catholic Monarchs; first service at 21 in the Alpujarras; Naples under the Great Captain; wounded at Ravenna 1512                                                                                                            | rah-leiva                                                                |
| Francis I crossed the Alps in 1524 and occupied Milan; Pescara split his forces; Leyva given Pavia, which closed the road to the Alps                                                                                                                                      | rah-leiva, acami-pavia, britannica-pavia                                 |
| French arrival: 25 Oct (ACAMI), siege laid 28 Oct (RAH)                                                                                                                                                                                                                    | acami-pavia, rah-leiva                                                   |
| November assaults repulsed and breaches repaired; attempt to divert the Ticino defeated by rain; river mills destroyed, hand mills ready                                                                                                                                   | rah-leiva, acami-pavia                                                   |
| German mercenaries threatened to leave without pay; desertions; church silver melted and coined with the inscription "Los cesarianos cercados en Pavía. Año 1524"; soldiers billeted on householders, who had to feed them; 3,000 escudos raised among Pescara's Spaniards | rah-leiva, acami-pavia                                                   |
| Relief army reached Pavia in early February (3 Feb ACAMI; 7 Feb RAH)                                                                                                                                                                                                       | acami-pavia, rah-leiva                                                   |
| 24 Feb 1525: breach of the park wall near Mirabello; Leyva, ill, carried in a chair to the gate, with about 1,000 Spanish and German soldiers held off Italian troops of the French army (RAH) or sortied against the siege lines (ACAMI); Francis I captured              | rah-leiva, acami-pavia, britannica-pavia                                 |
| Relief army: 6,000 Spaniards, 12,000 Germans, 2,000 Italians (ACAMI); Frundsberg's landsknechts annihilated the Black Band (Britannica)                                                                                                                                    | acami-pavia, britannica-pavia                                            |
| Rewarded with the government of the Milanese and the title of prince of Ascoli; defended Milan in 1527–28 with gout, carried on a litter; senior commander in Provence 1536 (campaign undertaken on his advice); died of plague and gout at Aix on 7 Sept 1536             | rah-leiva                                                                |
| Treaty of Madrid repudiated by Francis                                                                                                                                                                                                                                     | britannica-pavia                                                         |
| 1901 oil portrait by Pedro González in the Museo del Ejército, inv. 20.018, possibly copied from the Giovio collection                                                                                                                                                     | rah-leiva                                                                |

## Disputed points and how they were handled

- **Birthplace.** The dossier and the placeholder said Leyva (La Rioja). The RAH and ACAMI both say Navarre, and some online sources say Leiva (La Rioja). The file follows the RAH (`place: Navarre`) and notes the alternative in `region`. **To verify** in a primary record (for example a knighthood file or testament).
- **Garrison size.** ACAMI gives 6,000 landsknechts, 400 Spaniards, 500 Italians, 250 lances and 16 guns. The RAH says 6,000 people "including the population", of whom only 300 men-at-arms and 500 infantry, which seems hard to square with its own account of German mercenaries. Popular sources give about 2,000 arquebusiers and 4,500–5,000 Germans (not cited). Shown as an "800–7,000" range, `disputed`. The myth text attributes "most were German" to ACAMI explicitly.
- **French army size.** Britannica gives 28,000 in its text and 20,000 in its loss box. The army for the whole 1524 campaign was over 40,000 (ACAMI) or 50,000 (RAH). Shown as a range, `disputed`.
- **What Leyva's sortie did.** The RAH says it kept Italian troops of the French army from joining the battle. ACAMI says it attacked the French and Italians in the siege lines. The chapter says it "pinned down the troops the French had left in the siege lines", which fits both.
- **Credit for the victory.** The RAH gives the leading role to Pescara. The file presents Leyva's achievement as the endurance of the garrison plus the sortie, not as winning the battle.
- **Captor of Francis I.** ACAMI names Juan de Urbina, Diego de Ávila and Alonso Pita da Veiga. The RAH names Juan de Villarta as the soldier who nearly killed him. Left out of the file.
- **"Carlos de Gante, soldado del Tercio del valeroso Antonio de Leiva".** The RAH presents this as a story repeated by historians, without a contemporary source. Treated as a `legend` myth.
- **Not used:** the RAH statement that Leyva accompanied the emperor "on the African campaigns" in 1536 and had earlier beaten the Turks before Vienna. The chronology is confused (Tunis was 1535), and it is unsupported elsewhere.

## Open questions

- Garrison composition and numbers from a primary or modern scholarly source (Desperta Ferro no. 30; Konstam, _Pavia 1525_; imperial dispatches in AGS Estado).
- Birthplace (Navarre or Leiva).
- Exact date the siege began (25, 27 or 28 October).
- Whether any siege coins ("cesarianos cercados en Pavía") survive in a museum collection. That would make a good illustration.
- Leyva's burial place (not researched).

## Portrait candidates

All candidates are posthumous: Leyva died in 1536.

| Title                                                              | Artist                                                                  | Date         | Posthumous                                | Institution                                                                                   | URL                                                                                          | Licence as stated       |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------- |
| **Antonio de Leyva, conte di Monza** (recommended)                 | Aliprando Caprioli, engraving for _Ritratti di cento capitani illustri_ | 1596–1600    | yes                                       | Biblioteca comunale di Trento (uploader)                                                      | <https://commons.wikimedia.org/wiki/File:Antonio_de_Leyva,_conte_di_Monza.jpg>               | CC0                     |
| Retrato de Antonio de Leiva (another impression of the same plate) | Aliprando Caprioli                                                      | 1596         | yes                                       | Biblioteca Nacional de España (bdh-rd.bne.es id 0000031747)                                   | <https://commons.wikimedia.org/wiki/File:Aliprando_caprioli-Retrato_de_Antonio_de_Leiva.jpg> | CC BY-SA 4.0            |
| Antonio de Leva (woodcut medallion)                                | Guillaume Rouillé, _Promptuarii Iconum Insigniorum_                     | 1553         | yes                                       | book illustration                                                                             | <https://commons.wikimedia.org/wiki/File:Antonio_de_Leva.jpg>                                | Public domain           |
| Retrato de Antonio de Leyva, príncipe de Ascoli (oil)              | unknown                                                                 | 17th century | yes                                       | private / sale record                                                                         | <https://commons.wikimedia.org/wiki/File:AntonioLeiva.jpg>                                   | Public domain (Commons) |
| Antonio de Leiva (oil copy)                                        | Pedro González                                                          | 1901         | yes                                       | Museo del Ejército, Toledo, inv. 20.018                                                       | not online (cited by the RAH)                                                                | to request              |
| Medal of Antonio de Leiva, governor of Milan                       | anonymous                                                               | after 1530   | **possibly contemporary**: worth checking | unknown (Commons file "Anonimo, medaglia di antonio de leiva, gov. di milano, post 1530.JPG") | Commons (rate-limited during research; not verified)                                         | to verify               |

Notes. The Caprioli print is the recommendation because it is a period work with a clear CC0 release from the holding library. The medal, if it was made in his lifetime, would be the only image made while he was alive, so check its holding institution and licence. Under Spanish LPI art. 128, non-creative photographs of artworks are protected for 25 years. For the Museo del Ejército painting, use only a photograph licensed by the museum.

## Places verification

| Place                      | Verified connection                                    | Source                 |
| -------------------------- | ------------------------------------------------------ | ---------------------- |
| Pavia, Lombardy            | Defended Oct 1524 – Feb 1525; battle of 24 Feb 1525    | rah-leiva, acami-pavia |
| Aix-en-Provence            | Died there in the imperial camp, 7 Sept 1536           | rah-leiva              |
| Museo del Ejército, Toledo | Holds a 1901 oil portrait, inv. 20.018                 | rah-leiva              |
| Leiva (La Rioja), castle   | Not added: no source opened links him personally to it | none                   |
