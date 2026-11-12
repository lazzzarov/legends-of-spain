/**
 * Story mode: the book played as slides. Slides are built at build time from each legend's
 * reviewed content, so every legend gets a story with no extra writing. Shared by the home
 * page, the player script and unit tests.
 */
import { CHAPTER_NUMERAL } from '../i18n/en';
import type { Legend } from './schema';

export type SlideKind = 'title' | 'chapter' | 'facts' | 'myth' | 'other' | 'end';

export interface Slide {
  kind: SlideKind;
  /** Short name shown in the control bar ("II · The Challenge"). */
  label: string;
  /** Index into `chapters`, `facts` or `myths` when the slide shows one item. */
  item?: number;
  /** How long the slide stays up while playing, from the amount of text on it. */
  durationMs: number;
  /** Long text: shown in a denser layout so it still fits one screen. */
  dense: boolean;
}

/** Slides with more words than this use the denser layout. */
export const DENSE_WORDS = 110;

/** Facts shown on the facts slide (more would not fit one screen). */
export const FACTS_PER_SLIDE = 3;

const words = (...texts: (string | undefined)[]) =>
  texts.join(' ').split(/\s+/).filter(Boolean).length;

/**
 * Reading time at about 180 words a minute, plus time to take in the slide.
 * Kept between 6 and 30 seconds; the reader can pause or move on at any time.
 */
export function slideDuration(wordCount: number): number {
  const ms = 3500 + (wordCount / 3) * 1000;
  return Math.round(Math.min(30_000, Math.max(6_000, ms)));
}

const slide = (s: Omit<Slide, 'durationMs' | 'dense'>, wordCount: number): Slide => ({
  ...s,
  durationMs: slideDuration(wordCount),
  dense: wordCount > DENSE_WORDS,
});

export function buildSlides(legend: Legend): Slide[] {
  const slides: Slide[] = [
    slide({ kind: 'title', label: legend.name.display }, words(legend.tagline, legend.hook)),
  ];
  legend.chapters.forEach((chapter, item) =>
    slides.push(
      slide(
        { kind: 'chapter', label: `${CHAPTER_NUMERAL[chapter.key]} · ${chapter.title}`, item },
        words(chapter.title, chapter.body),
      ),
    ),
  );
  const facts = legend.facts.slice(0, FACTS_PER_SLIDE);
  if (facts.length > 0)
    slides.push(
      slide(
        { kind: 'facts', label: 'In numbers' },
        words(...facts.flatMap((f) => [f.value, f.label, f.explanation])),
      ),
    );
  const myth = legend.myths[0];
  if (myth)
    slides.push(
      slide(
        { kind: 'myth', label: 'Legend or history?', item: 0 },
        words(myth.claim, myth.explanation),
      ),
    );
  slides.push(slide({ kind: 'other', label: 'The other side' }, words(legend.otherSide.body)));
  slides.push(slide({ kind: 'end', label: 'Turn the page' }, 20));
  return slides;
}

/** A position in the book: which legend, and which of its slides (0-based). */
export interface StoryPosition {
  slug: string;
  slide: number;
}

/** `#story/<slug>/<n>` (n is 1-based, optional) → a position, or null when it names nothing. */
export function parseStoryHash(
  hash: string,
  slideCounts: Record<string, number>,
): StoryPosition | null {
  const match = /^#story\/([a-z0-9-]+)(?:\/(\d+))?\/?$/.exec(hash);
  if (!match) return null;
  const slug = match[1]!;
  const count = slideCounts[slug];
  if (!count) return null;
  const n = match[2] ? Number(match[2]) : 1;
  return { slug, slide: Math.min(Math.max(n, 1), count) - 1 };
}

export const storyHash = ({ slug, slide }: StoryPosition): string => `#story/${slug}/${slide + 1}`;
