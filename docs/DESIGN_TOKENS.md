# Design tokens

Defined once in `src/styles/global.css` (`@theme`) and used as Tailwind classes (`text-umber`, `bg-cream`, …).

## Colour

| Token       | Hex       | Role                                         |
| ----------- | --------- | -------------------------------------------- |
| `parchment` | `#F3E9D2` | Page ground                                  |
| `cream`     | `#FAF4E6` | Reading panels and cards (text sits here)    |
| `caramel`   | `#C08A4D` | Panel borders, dashed rules — **never text** |
| `sepia`     | `#8B5A2B` | Rules, ornaments; text only at ≥ 18px        |
| `burnt`     | `#5A3A22` | Small labels, eyebrows, captions             |
| `umber`     | `#3B2416` | Headings, navigation bar, primary buttons    |
| `ink`       | `#231F1C` | Body text, footer                            |
| `gold`      | `#B8954A` | Ornaments; text only on `ink`/`umber`        |
| `burgundy`  | `#6E1F2A` | Links, wax seals, emphasis                   |
| `mist`      | `#D9C29A` | Secondary text on dark grounds               |

## Contrast (WCAG 2.x; AA needs 4.5 for body text, 3.0 for large text)

| Foreground | Background | Ratio | Use                                                   |
| ---------- | ---------- | ----: | ----------------------------------------------------- |
| ink        | cream      | 14.91 | ✅ body                                               |
| ink        | parchment  | 13.55 | ✅ body                                               |
| umber      | parchment  | 12.00 | ✅ headings                                           |
| burnt      | parchment  |  8.43 | ✅ small labels                                       |
| burgundy   | cream      | 10.12 | ✅ links                                              |
| sepia      | parchment  |  4.84 | ⚠️ large text only (thin margin on the darker ground) |
| parchment  | umber      | 12.00 | ✅ nav, buttons                                       |
| mist       | umber      |  8.37 | ✅ secondary on dark                                  |
| gold       | ink        |  5.79 | ✅ small labels on dark                               |
| gold       | parchment  |  2.34 | ❌ decoration only                                    |
| caramel    | parchment  |  2.49 | ❌ decoration only                                    |

## Type

| Role                | Family             | Typical size                  |
| ------------------- | ------------------ | ----------------------------- |
| Names, titles       | IM Fell English    | 44–88px (`clamp`)             |
| Chapter headings    | IM Fell English SC | 24–30px                       |
| Body                | Source Serif 4     | 18–19px, line-height 1.65–1.7 |
| Labels, UI, numbers | Inter              | 11–15px                       |

## Texture and ornament

- Ground: a warm radial wash plus an inline SVG grain (about 0.3 KB, no image request).
- Burnt edges: a fixed vignette on screens ≥ 768px only.
- `.plate`: hatched engraving placeholder for images not produced yet.
- `.dropcap`: engraved first letter using `::first-letter` (screen readers read the word intact).
- Ornament SVGs live in `src/components/ornaments/` and are `aria-hidden`.
