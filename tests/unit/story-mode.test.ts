import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { legendSchema } from '../../src/lib/schema';
import {
  FACTS_PER_SLIDE,
  buildSlides,
  parseStoryHash,
  slideDuration,
  storyHash,
} from '../../src/lib/story';

// A fixed fixture built from the contributor template, so these tests don't change with content.
const template = parse(
  readFileSync(join(import.meta.dirname, '../../docs/templates/legend.template.yaml'), 'utf8'),
);
const sources = [{ id: 'placeholder-source', title: 'Source', type: 'reference' }];
const fixture = legendSchema.parse({ ...template, sources });

describe('buildSlides', () => {
  const slides = buildSlides(fixture);

  it('opens with a title card and closes with the page turn', () => {
    expect(slides[0]!.kind).toBe('title');
    expect(slides[0]!.label).toBe(fixture.name.display);
    expect(slides.at(-1)!.kind).toBe('end');
  });

  it('gives each of the five chapters its own slide, in story order', () => {
    const chapters = slides.filter((s) => s.kind === 'chapter');
    expect(chapters.map((s) => s.item)).toEqual([0, 1, 2, 3, 4]);
    expect(chapters[0]!.label).toMatch(/^I · /);
  });

  it('marks long slides as dense', () => {
    const long = Array.from({ length: 150 }, () => 'word').join(' ');
    const slides = buildSlides({ ...fixture, otherSide: { body: long, sources: [] } });
    expect(slides.find((s) => s.kind === 'other')!.dense).toBe(true);
    expect(slides.find((s) => s.kind === 'end')!.dense).toBe(false);
  });

  it('always includes the other side', () => {
    expect(slides.some((s) => s.kind === 'other')).toBe(true);
  });

  it('skips the facts and myth slides when a legend has none', () => {
    const bare = buildSlides({ ...fixture, facts: [], myths: [] });
    expect(bare.map((s) => s.kind)).toEqual([
      'title',
      'chapter',
      'chapter',
      'chapter',
      'chapter',
      'chapter',
      'other',
      'end',
    ]);
  });

  it('times the facts slide from the facts it shows, not the whole list', () => {
    const many = Array.from({ length: 6 }, () => fixture.facts[0]!);
    const facts = buildSlides({ ...fixture, facts: many }).find((s) => s.kind === 'facts')!;
    const few = buildSlides({ ...fixture, facts: many.slice(0, FACTS_PER_SLIDE) }).find(
      (s) => s.kind === 'facts',
    )!;
    expect(facts.durationMs).toBe(few.durationMs);
  });
});

describe('slideDuration', () => {
  it('grows with the text and stays between 6 and 30 seconds', () => {
    expect(slideDuration(0)).toBe(6_000);
    expect(slideDuration(60)).toBe(23_500);
    expect(slideDuration(60)).toBeGreaterThan(slideDuration(30));
    expect(slideDuration(1000)).toBe(30_000);
  });
});

describe('story links', () => {
  const counts = { 'juan-sebastian-elcano': 10 };

  it('reads a legend and a slide from the hash', () => {
    expect(parseStoryHash('#story/juan-sebastian-elcano/3', counts)).toEqual({
      slug: 'juan-sebastian-elcano',
      slide: 2,
    });
  });

  it('starts at the first slide when none is given, and clamps out-of-range slides', () => {
    expect(parseStoryHash('#story/juan-sebastian-elcano', counts)?.slide).toBe(0);
    expect(parseStoryHash('#story/juan-sebastian-elcano/99', counts)?.slide).toBe(9);
    expect(parseStoryHash('#story/juan-sebastian-elcano/0', counts)?.slide).toBe(0);
  });

  it('ignores other hashes and unknown legends', () => {
    expect(parseStoryHash('#main', counts)).toBeNull();
    expect(parseStoryHash('#story/nobody/1', counts)).toBeNull();
    expect(parseStoryHash('', counts)).toBeNull();
  });

  it('round-trips a position', () => {
    const position = { slug: 'juan-sebastian-elcano', slide: 4 };
    expect(parseStoryHash(storyHash(position), counts)).toEqual(position);
  });
});
