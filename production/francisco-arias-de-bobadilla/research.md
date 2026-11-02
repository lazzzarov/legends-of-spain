# Research note — Francisco Arias de Bobadilla (Empel, 1585)

Researched 2026-11-02. Legend file: `src/content/legends/francisco-arias-de-bobadilla.yaml` (`review.status: sourced`).

## Sources opened

| id                           | Source                                                                                                                                    | Type          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| rah-arias-de-bobadilla       | Patrick Williams, "Arias de Bobadilla, Francisco", RAH Diccionario Biográfico Español — https://historia-hispanica.rah.es/biografias/4242 | institutional |
| bossche-encyclopedie-empel   | Bossche Encyclopedie, "Empel … Parochiekerk H. Landelinus" (Dutch local-history study; cites Bor, Carnero, Strada, Verreyt 1901)          | reference     |
| army-infanteria-2019 / -2025 | Ejército de Tierra news on the Infantry's patronal feast                                                                                  | institutional |
| army-ferrer-dalmau-2015      | Ejército de Tierra, Ferrer-Dalmau presents "El milagro de Empel" (story told as tradition)                                                | institutional |
| emad-empel-2018              | EMAD, Empel commemoration 2018 (Tercio Viejo de Zamora, fleet of ten ships)                                                               | institutional |
| research-dossier             | docs/research/20261102_deep-research.md (leads only)                                                                                      | reference     |

Note: dbe.rah.es now redirects to historia-hispanica.rah.es (a JavaScript app). Entry text was read through the site's public API (`/api/biographies/<nid>`) and the rendered page.

## Claim → source

| Claim                                                                                                                        | Source(s)                                                                              | Status                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Born Madrid 10.XII.1537, died 21.I.1610 (placeholder "Madrid region" corrected to Madrid)                                    | rah-arias-de-bobadilla                                                                 | verified                                                                           |
| Younger son of Arias Gonzalo Dávila; cavalry captain in Milan early 1560s; to Netherlands with Alba 1567                     | rah                                                                                    | verified                                                                           |
| Mons 1572: Alba sent him to tell Philip II of the victory                                                                    | rah                                                                                    | verified                                                                           |
| Maestre de campo in Portugal (1580), Azores under Santa Cruz (1582–83)                                                       | rah                                                                                    | verified                                                                           |
| 1585: led a tercio in the Netherlands                                                                                        | rah                                                                                    | verified                                                                           |
| Nov 1585: crossed Maas into Bommelerwaard for winter quarters; Hohenlohe from Dordrecht cut the dykes                        | bossche; army-2015 ("Holak")                                                           | verified                                                                           |
| Stranded at Empel, cut off by Hohenlohe's fleet, without food in winter; breakout attempts failed                            | bossche                                                                                | verified                                                                           |
| Soldier digging a trench found a Flemish panel of the Immaculate Conception                                                  | army-2019, army-2015, army-museum (Museo del Ejército 2020 page, not in YAML), bossche | **traditional**                                                                    |
| Hard frost on night of 7 Dec; Hohenlohe withdrew to avoid being frozen in; Spaniards reached 's-Hertogenbosch; thaw followed | bossche                                                                                | verified                                                                           |
| Spaniards crossed the ice at dawn 8 Dec and fell on the enemy fleet / "complete victory"                                     | army-2015 (as tradition), emad-2018                                                    | verified in Spanish accounts; Dutch-based narrative stresses withdrawal and escape |
| Frost was a miracle                                                                                                          | —                                                                                      | **devotional**; not a historical claim                                             |
| Rebel fleet of 10 ships                                                                                                      | emad-2018                                                                              | disputed (popular accounts give ~100)                                              |
| 1588: adviser to Medina Sidonia "en lo tocante a pelear"; hanged a disobedient captain                                       | rah                                                                                    | verified                                                                           |
| 1591–92 Aragon: urged exemplary punishment; arrested the Justicia                                                            | rah                                                                                    | verified                                                                           |
| IV conde de Puñonrostro in 1596; Council of War from 1598                                                                    | rah                                                                                    | verified                                                                           |
| Immaculate Conception official patroness of all Spanish infantry in 1892                                                     | army-2019, army-2025 (year); bossche (royal order of the queen regent, 12 Nov 1892)    | **verified (1892)**                                                                |

## Disputed points and handling

- **Troop numbers.** The dossier's "about 5,000" is not stated by any source I opened; the Bossche study speaks of three regiments under Bobadilla. Left out.
- **Dutch fleet size.** EMAD says 10 ships; popular retellings say 100+. Given as `disputed` with the EMAD figure only.
- **Counter-attack vs escape.** Spanish institutional accounts describe an attack across the ice; the Dutch-based narrative (Bossche, from Bor) describes Hohenlohe withdrawing and the Spaniards escaping. The YAML gives both, attributing the attack to Spanish accounts.
- **Date of the 1892 order.** Secondary sources give 12 or 20 November 1892. I used only the year in prose and 12 November (Bossche) in the fact explanation. The Diario Oficial del Ministerio de la Guerra was not consulted.
- **Birth year.** RAH: 1537. EcuRed gives 1542 (Torrejón de Velasco); not used (non-scholarly).

## Open questions

- Consult Alonso Vázquez, _Los sucesos de Flandes y Francia del tiempo de Alejandro Farnese_ (CODOIN, 1879–80), and Carnero (1625) for Spanish eyewitness detail. Neither was consulted directly.
- Find the 1892 royal order in the Colección Legislativa or Diario Oficial.
- Notably, the RAH biography never mentions Empel. Is there archival evidence (AGS Estado/Guerra) of Bobadilla's own report on the episode?
- Fate of the panel painting: the Bossche study says it was supposedly taken to Spain; no location verified.

## Portrait candidates

| Title                                                       | Artist                | Date          | Posthumous | Institution / URL                                                                                      | Licence as stated               | Verdict                                                                                                                                             |
| ----------------------------------------------------------- | --------------------- | ------------- | ---------- | ------------------------------------------------------------------------------------------------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Francisco Arias de Bobadilla, IV Conde de Puñonrostro.png" | Unknown               | uploaded 2022 | unknown    | https://commons.wikimedia.org/wiki/File:Francisco_Arias_de_Bobadilla,_IV_Conde_de_Pu%C3%B1onrostro.png | CC BY-SA 4.0 (uploader's claim) | **Rejected.** Sourced only to a blog (elcajondelosmisterios.com); no artist, date or holding institution. Could be a modern or misattributed image. |
| El milagro de Empel                                         | Augusto Ferrer-Dalmau | 2015          | yes        | Presented at the Academia de Infantería, Toledo                                                        | In copyright                    | Not a portrait; usable only as a licensed illustration.                                                                                             |

**Recommendation:** no verified likeness. The YAML keeps a placeholder portrait entry with no file. Next step: search the Biblioteca Nacional de España's Iconografía Hispana and the Puñonrostro family archive. Note that Spanish LPI art. 128 protects non-creative photographs of paintings for 25 years.

## Places verification

| Place                          | Connection                                                                                                                           | Source               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| Empel ('s-Hertogenbosch)       | Site of the 1585 episode; parish church of St Landelinus (1949, new site) with a chapel and a 1950 triptych by Frans and Kees Mandos | bossche, emad-2018   |
| Academia de Infantería, Toledo | Celebrates the patroness; Ferrer-Dalmau's painting presented there in 2015 (where the painting is kept is not stated)                | army-2015, army-2025 |
| Madrid                         | Birth and death                                                                                                                      | rah                  |
