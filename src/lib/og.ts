/**
 * Build-time Open Graph images (1200×630 PNG): satori lays out the card with the site's own
 * fonts and outputs SVG with text as paths, which sharp rasterises — no system fonts needed.
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const fontFile = (pkg: string, file: string) =>
  readFile(require.resolve(`@fontsource/${pkg}/files/${file}`));

let fonts: Promise<{ name: string; data: Buffer; style: 'normal' | 'italic' }[]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    fontFile('im-fell-english', 'im-fell-english-latin-400-normal.woff'),
    fontFile('im-fell-english', 'im-fell-english-latin-400-italic.woff'),
    fontFile('im-fell-english-sc', 'im-fell-english-sc-latin-400-normal.woff'),
  ]).then(([regular, italic, sc]) => [
    { name: 'Fell', data: regular, style: 'normal' as const },
    { name: 'Fell', data: italic, style: 'italic' as const },
    { name: 'FellSC', data: sc, style: 'normal' as const },
  ]));

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

export interface OgCard {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
}

export async function renderOgImage(card: OgCard): Promise<Buffer> {
  const titleSize = card.title.length > 24 ? 76 : 92;
  const tree = h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      position: 'relative',
      background: 'radial-gradient(ellipse at 50% 30%, #F7F0DE 0%, #F3E9D2 55%, #DCC59A 100%)',
      fontFamily: 'Fell',
      color: '#3B2416',
    },
    // Satori treats padding as content-box, so the frame is inset absolutely instead.
    h(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 36,
        left: 36,
        right: 36,
        bottom: 36,
        border: '2px solid #8B5A2B',
        padding: '44px 60px',
      },
      [
        h('div', { display: 'flex', alignItems: 'center', gap: 18 }, [
          h(
            'div',
            {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 28,
              background: '#6E1F2A',
              color: '#F3E9D2',
              fontFamily: 'FellSC',
              fontSize: 24,
            },
            'LS',
          ),
          h(
            'div',
            {
              display: 'flex',
              fontFamily: 'FellSC',
              fontSize: 28,
              color: '#5A3A22',
              letterSpacing: 2,
            },
            card.eyebrow,
          ),
        ]),
        h('div', { display: 'flex', flexDirection: 'column', gap: 18 }, [
          h(
            'div',
            { display: 'flex', fontSize: titleSize, lineHeight: 1, color: '#3B2416' },
            card.title,
          ),
          h(
            'div',
            {
              display: 'flex',
              fontSize: 36,
              fontStyle: 'italic',
              lineHeight: 1.25,
              color: '#6E1F2A',
              maxWidth: 980,
            },
            card.subtitle,
          ),
        ]),
        h(
          'div',
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'FellSC',
            fontSize: 26,
            color: '#5A3A22',
          },
          [
            h('div', { display: 'flex' }, card.footer),
            h('div', { display: 'flex', height: 2, width: 260, background: '#B8954A' }),
          ],
        ),
      ],
    ),
  );
  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
