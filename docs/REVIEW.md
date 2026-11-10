# Editorial review sheet

A legend goes live only after you approve it. Until then it is `review.status: sourced` and the public build leaves it out.

**Status (10 November 2026):** all 14 legends approved by the editor and set to `reviewed`. The points below were accepted with the page's current hedged wording; they stay listed as follow-ups for a later revision.

## How to review a legend

1. Read its page on the draft site: run `npm run dev` and open `http://localhost:4410/legends-of-spain/legends/<slug>/`.
2. Keep `production/<slug>/research.md` open beside it. It maps every claim to the source that supports it.
3. Check each item below:
   - **Tone:** admiring but honest; no glorification of violence; no judgement the sources don't make.
   - **Labels:** each claim is correctly marked verified, disputed, legend or dramatization.
   - **Numbers:** every figure has a source, and contested figures are shown as ranges.
   - **The Other Side:** the people on the receiving end are given real weight.
   - **Portrait:** the credit and licence are right, and the image shows the right person.
   - **The points for that legend listed below.**
4. Then tell Claude one of:
   - **"Approve <name>"**: the legend is set to `reviewed` and appears on the public site.
   - **"Approve <name> with changes: …"**: the changes are made first, then you see them before it goes live.
   - **"Hold <name>: …"**: it stays out of the public site until the points you name are resolved.

The points below come from the research notes. "Decide" means a judgement call only you can make. "Verify" means a source the researchers couldn't open; you can check it yourself, ask Claude to try again, or accept the current wording, which already hedges it.

## Points per legend (book order)

### 1. Hernán Cortés

- **Decide:** the balance between the RAH entry (admiring) and Navarrete's coalition reading. The research note recommends a Mesoamerica historian look at it.
- **Decide:** the Quetzalcoatl identification is labelled `disputed`; the sceptical side (Restall, Townsend) was only seen in search snippets.
- **Verify:** the 1522 Second Letter (Library of Congress) and the AGI records (PATRONATO,16) were not opened.

### 2. Juan Sebastián Elcano

- **Verify:** the AGI images of the letter and will (PATRONATO,48,R.20 and 38,R.1).
- **Decide:** the death date is shown as "August 1526" (sources say 4 or 6 August).
- **Note:** the comic script and video brief were updated to the researched facts.

### 3. Antonio de Leyva

- **Decide:** birthplace. The page says Navarre (RAH and ACAMI); some sources say Leiva, La Rioja.
- **Decide:** the garrison is shown as a wide range (800–7,000) because the sources disagree.
- **Verify:** the start date of the siege (25, 27 or 28 October 1524) is not given on the page.

### 4. Francisco Pizarro

- **Decide:** the page names the trial and execution of Atahualpa without assigning motives.
- **Verify:** the Capitulación and Pizarro's letters in PARES; a second source for Atahualpa's execution date (26 July 1533).
- **Gap:** no scholarly figure for the Andean population decline, so the page gives none.

### 5. Francisco de Sarmiento

- **Decide:** the famous defiant reply is treated as a legend; only the corporals' reported decision is quoted.
- **Decide:** the death date is shown as "6 or 7 August 1539".
- **No portrait:** no verified likeness exists, so the page keeps the engraved placeholder.

### 6. Francisco de Orellana

- **Decide:** the "treason" accusation is shown with both sides (Pizarro's charge and Carvajal's account).
- **Verify:** quotations come from the 1894 Carvajal edition; a modern critical edition would be better.

### 7. Miguel López de Legazpi

- **Decide (important):** no Filipino scholarship was opened. The Battle of Bangkusay (1571) is left out until a source can be read. Consider holding this legend until it is added.
- **Verify:** the date of the Cebu treaty (4 June 1565).

### 8. Álvaro de Bazán

- **Verify:** the 1583 Terceira landing date (the page follows 26 July; the RAH says 23 July).
- **Verify:** "playa de las Molas" is probably today's Baía das Mós; the page says "probably".
- **Decide:** the Armada "what if he had lived" story is labelled a legend.

### 9. Bernardino de Sahagún

- **Decide:** "first anthropologist" is labelled `disputed`; the Nahua authors are credited as co-creators.
- **Verify:** the Getty Digital Florentine Codex site (certificate error during research) and the UNESCO Memory of the World entry.

### 10. Francisco Arias de Bobadilla

- **Verify:** the date of the 1892 royal order naming the Immaculate Conception patroness of the infantry (12 or 20 November); the page gives only the year.
- **Decide:** Spanish accounts (an attack across the ice) and Dutch accounts (the Dutch withdrew) are both given.
- **No portrait:** no verified likeness exists, so the page keeps the engraved placeholder.

### 11. Fadrique de Toledo

- **Verify (required):** the Prado's wording about Maíno's _Recapture of Bahía_. The page could not be opened by the researchers (bot check). Please read it on museodelprado.es.
- **Decide:** the victory is framed as a joint Spanish–Portuguese operation.

### 12. Blas de Lezo

- **Verify:** the primary records (his diary in the AHN, the Desnaux relation) were not opened.
- **Rights check:** the portrait photo (Museo Naval, via the Instituto Cervantes) has no stated licence.
- **Decide:** credit is shared with Eslava, Desnaux and the militia; "greatest British defeat" is treated as a myth.

### 13. Francisco Javier Balmis

- **Decide:** the claim that the WHO recognised Isabel Zendal in 1950 is left out because no WHO document was found.
- **Decide:** the page gives both counts of enslaved carriers bought in Havana (three or four).

### 14. Francisco Espoz y Mina

- **Decide:** his force size and the losses he inflicted come from his own memoirs, so they are shown as disputed ranges.
- **Decide:** for the 1836 execution of Cabrera's mother, the page says he "was held responsible".
- **Rights check:** the portrait photo is the Museo del Romanticismo's own; it may still be protected in Spain.

## Approval log

| Legend                       | Decision | Date       | Notes                                                      |
| ---------------------------- | -------- | ---------- | ---------------------------------------------------------- |
| Hernán Cortés                | Approved | 2026-11-10 | Open points accepted as worded                             |
| Juan Sebastián Elcano        | Approved | 2026-11-10 | Open points accepted as worded                             |
| Antonio de Leyva             | Approved | 2026-11-10 | Open points accepted as worded                             |
| Francisco Pizarro            | Approved | 2026-11-10 | Open points accepted as worded                             |
| Francisco de Sarmiento       | Approved | 2026-11-10 | Open points accepted as worded                             |
| Francisco de Orellana        | Approved | 2026-11-10 | Open points accepted as worded                             |
| Miguel López de Legazpi      | Approved | 2026-11-10 | Add Filipino scholarship and Bangkusay in a later revision |
| Álvaro de Bazán              | Approved | 2026-11-10 | Open points accepted as worded                             |
| Bernardino de Sahagún        | Approved | 2026-11-10 | Open points accepted as worded                             |
| Francisco Arias de Bobadilla | Approved | 2026-11-10 | Open points accepted as worded                             |
| Fadrique de Toledo           | Approved | 2026-11-10 | Prado wording still to be read on museodelprado.es         |
| Blas de Lezo                 | Approved | 2026-11-10 | Portrait photo rights unconfirmed; editor chose to keep it |
| Francisco Javier Balmis      | Approved | 2026-11-10 | Open points accepted as worded                             |
| Francisco Espoz y Mina       | Approved | 2026-11-10 | Portrait photo rights unconfirmed; editor chose to keep it |
