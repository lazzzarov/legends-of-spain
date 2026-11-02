# Francisco Pizarro — research note

Researched 2026-11-02. Status of the legend file: `sourced` (not reviewed). The dossier was used only for leads.

## Sources opened

| id                        | Source                                                                                                                                                                   | Notes                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| rah-pizarro               | Héctor López Martínez, "Francisco Pizarro González", Diccionario Biográfico Español, RAH — https://historia-hispanica.rah.es/biografias/36098-francisco-pizarro-gonzalez | Read through the site's public biography endpoint. Admiring ("trato generoso" towards Atahualpa; death "heroically"); used for facts only. |
| xerez-relacion            | Francisco de Xerez, _Verdadera relación de la conquista del Perú_ (1534), digital transcription, Biblioteca Antológica                                                   | Primary eyewitness account by Pizarro's secretary; written to justify the conquest. Not the 1534 printing itself.                          |
| maccormack-atahualpa      | Sabine MacCormack, "Atahualpa y el libro", _Revista de Indias_ 48 (184), 1988 (CC BY 4.0)                                                                                | Cajamarca scene; fewer than 200 Spaniards; later retellings.                                                                               |
| mccaa-smallpox            | McCaa, Nimlos, Hampe Martínez, "Why Blame Smallpox?…" (AHA 2004 paper, web version)                                                                                      | Argues smallpox probably did not kill Huayna Capac and was not a major Andean killer before 1558.                                          |
| cook-demographic-collapse | N. D. Cook, _Demographic Collapse: Indian Peru, 1520–1620_ (CUP 1981) — chapter page                                                                                     | Only the publisher's chapter page/ToC were accessible; cited for the collapse, not for figures.                                            |
| capitulacion-toledo       | Capitulación de Toledo, AGI                                                                                                                                              | **Not consulted directly**; PARES could not be queried in this session.                                                                    |

## Claim → source

| Claim                                                                                                                                                                                              | Source(s)                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Born Trujillo c. 1478 (placeholder/dossier said c. 1475), illegitimate son of Gonzalo Pizarro and Francisca González; poor childhood                                                               | rah-pizarro                          |
| Illiterate ("iletrado")                                                                                                                                                                            | rah-pizarro                          |
| Sailed 1502 with Ovando to Hispaniola                                                                                                                                                              | rah-pizarro                          |
| With Balboa at the sighting of the Pacific, 25/29 Sept 1513; arrested Balboa 1518 for Pedrarias                                                                                                    | rah-pizarro                          |
| Company with Almagro and Luque; voyages from 14 Nov 1524; hunger, Puerto del Hambre; wounded seven times                                                                                           | rah-pizarro, xerez-relacion          |
| Isla del Gallo 1527; thirteen stayed; the line in the sand is "history mixed with legend"                                                                                                          | rah-pizarro                          |
| Tumbes revealed a great state                                                                                                                                                                      | rah-pizarro                          |
| Capitulación de Toledo, 26 July 1529: governor, adelantado, alguacil mayor                                                                                                                         | rah-pizarro                          |
| Left Panama 20 Jan 1531 with 180 men and 37 horses                                                                                                                                                 | rah-pizarro                          |
| Death of Huayna Capac; war between Huáscar and Atahualpa; Huáscar captured                                                                                                                         | rah-pizarro, xerez-relacion          |
| Huancas, Chachapoyas and others saw the Spaniards as allies against Cuzco; Pizarro won loyal Indigenous allies                                                                                     | rah-pizarro                          |
| Epidemic and the smallpox attribution questioned                                                                                                                                                   | mccaa-smallpox                       |
| 160 men on the march to Cajamarca (RAH); "fewer than 200" (MacCormack)                                                                                                                             | rah-pizarro, maccormack-atahualpa    |
| 16 Nov 1532: gilded litter; Spaniards hidden in three buildings; Valverde's book; signal; seizure                                                                                                  | maccormack-atahualpa, xerez-relacion |
| "No Indian raised a weapon against a Spaniard"; litter-bearers (lords) killed; battle lasted "little more than half an hour"; "two thousand dead, not counting the wounded"; only night stopped it | xerez-relacion                       |
| Camp plundered; captured men and women taken for Spaniards' service                                                                                                                                | xerez-relacion                       |
| Requerimiento read by Valverde (RAH, citing Lavallé)                                                                                                                                               | rah-pizarro                          |
| Ransom: one room of gold, two of silver; melted down; the royal fifth                                                                                                                              | rah-pizarro                          |
| Trial prompted by an unproven rumour of a relief army; charges; garrotted 26 July 1533 after baptism                                                                                               | rah-pizarro                          |
| Cuzco entered 14 Nov 1533; Spanish foundation 23 Mar 1534                                                                                                                                          | rah-pizarro                          |
| Lima founded 18 Jan 1535                                                                                                                                                                           | rah-pizarro                          |
| Repartimientos/encomiendas granted to followers and orders                                                                                                                                         | rah-pizarro                          |
| Manco Inca's rising 1536; sieges of Cuzco and Lima; retreat to Vilcabamba                                                                                                                          | rah-pizarro                          |
| Battle of Las Salinas 26 Apr 1538; Almagro beheaded 8 July 1538                                                                                                                                    | rah-pizarro                          |
| Killed in Lima 26 June 1541 by Almagrists                                                                                                                                                          | rah-pizarro                          |
| Skull found 1977 in Lima Cathedral crypt; remains moved to a remodelled chapel 1985                                                                                                                | rah-pizarro                          |

## Disputed points and how they were handled

- **Birth year.** RAH: c. 1478; dossier and placeholder: c. 1475. YAML: `year: 1478, approx: true, display: 'c. 1475–1478'`.
- **Spanish numbers at Cajamarca.** 160 (RAH) vs "fewer than 200" (MacCormack). Range 160–200, `disputed`. The popular "168" was not found in an opened source and is not used.
- **Deaths at Cajamarca.** Only Xerez's estimate (2,000, excluding wounded) was opened. Given as "c. 2,000", attributed to Xerez, `disputed`.
- **Smallpox before Pizarro.** The conventional story (Huayna Capac killed by smallpox running ahead of the Spaniards) is contested by McCaa et al. The YAML says "an epidemic", notes the smallpox identification and the challenge to it, and does not state it as fact.
- **Demographic collapse.** No figures used; Cook's book was not readable beyond its chapter page. McCaa et al. stress civil war, destruction and oppression over disease; the otherSide gives both.
- **Pizarro's role in Atahualpa's execution.** RAH says he hesitated and "yielded to pressure". The YAML states the trial and execution without attributing motives.

## Left out

- The Pedro del Barco petition (Library of Congress) — found only in a catalogue snippet, not opened.
- Specific figures for the ransom, the Andean population before and after conquest, and Potosí/mita (after Pizarro's lifetime; UNESCO page blocked).
- Britannica could not be opened (HTTP 403).

## Open questions

- Open the PARES entries for the Capitulación (AGI LIMA,565 and INDIFERENTE,415) and Pizarro's letters (PATRONATO,90B).
- Find an opened, scholarly figure for Andean population decline (Cook, Assadourian) and a source on Andean allies in detail (e.g. Jeremy Mikecz, _HAHR_ 2020).
- Cross-check the date of Atahualpa's execution (RAH: 26 July 1533) against a second scholarly source.

## Portrait candidates

| Title                                                                                                  | Artist             | Date         | Posthumous     | Institution                                                   | URL                                                                                        | Licence as stated                                                                                                   |
| ------------------------------------------------------------------------------------------------------ | ------------------ | ------------ | -------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Francisco Pizarro, conqueror (1475–1541) (**recommended**)                                             | Amable-Paul Coutan | 1834–1835    | Yes            | Château de Versailles (Louis-Philippe's historical galleries) | https://commons.wikimedia.org/wiki/File:Portrait_of_Francisco_Pizarro.jpg                  | Commons: PD-art-100-expired. Commons' image came via artsy.net; prefer an RMN/Versailles image and check its terms. |
| Retrato de Francisco Pizarro, marqués de las Charcas y de los Atabillos (military portrait, engraving) | Not recorded       | Not recorded | Yes (presumed) | Biblioteca Virtual del Ministerio de Defensa, record 40872    | http://bibliotecavirtualdefensa.es/BVMDefensa/i18n/consulta/registro.cmd?id=40872          | CC0, as stated in the RAH image caption. Not opened directly; verify date and artist.                               |
| Francisco Pizarro, 1470?–1541 (print)                                                                  | Not recorded       | Not recorded | Yes            | Library of Congress (LCCN 2002718833)                         | https://commons.wikimedia.org/wiki/File:Francisco_Pizarro,_1470%3F-1541_LCCN2002718833.jpg | Not checked.                                                                                                        |

No likeness from Pizarro's lifetime is known to us. Any portrait is imagined and must be labelled posthumous. Spanish LPI art. 128 (25-year protection of non-creative photographs) applies if a Spanish institution's photograph is used. No image downloaded.

## Places verification

| Place              | Relation                                                           | Verified by                                       |
| ------------------ | ------------------------------------------------------------------ | ------------------------------------------------- |
| Trujillo (Cáceres) | Birthplace                                                         | rah-pizarro                                       |
| Cajamarca          | Capture (16 Nov 1532) and execution (26 July 1533) of Atahualpa    | xerez-relacion, maccormack-atahualpa, rah-pizarro |
| Cuzco              | Entered 14 Nov 1533; besieged 1536                                 | rah-pizarro                                       |
| Lima Cathedral     | Lima founded 18 Jan 1535; remains in a cathedral chapel since 1985 | rah-pizarro                                       |
