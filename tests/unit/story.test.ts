import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { buildCitationIndex, citeId } from '../../src/lib/citations';
import { isoDate, legendJsonLd } from '../../src/lib/jsonld';
import { legendSchema, videoSchema } from '../../src/lib/schema';
import { centuryLabel } from '../../src/i18n/en';

// A fixed fixture built from the contributor template, so these tests don't change with content.
const template = parse(
  readFileSync(join(import.meta.dirname, '../../docs/templates/legend.template.yaml'), 'utf8'),
);
const fixture = legendSchema.parse({
  ...template,
  name: { display: 'Fixture Legend', aka: ['Fixture'] },
  dates: { born: { year: 1487 }, died: { year: 1526, month: 8, day: 4 } },
  keyEvent: { year: 1522, label: 'Fixture event', sources: ['source-b'] },
  sources: [
    { id: 'source-a', title: 'Source A', type: 'reference' },
    { id: 'source-b', title: 'Source B', type: 'primary' },
    { id: 'source-c', title: 'Source C (further reading)', type: 'academic' },
  ],
  chapters: template.chapters.map((c: { key: string }) => ({
    ...c,
    sources: c.key === 'moment' ? ['source-a', 'source-b'] : ['source-a'],
  })),
  facts: [{ ...template.facts[0], label: 'Arrival', sources: ['source-b'] }],
  myths: [{ ...template.myths[0], sources: ['source-a'] }],
  otherSide: { body: 'Other side.', sources: ['source-a'] },
  movie: {
    ...template.movie,
    moments: [
      { text: 'One', sources: ['source-a'] },
      { text: 'Two', sources: ['source-a'] },
      { text: 'Three', sources: ['source-b'] },
    ],
  },
  comic: { status: 'draft', panels: [{ caption: 'Panel', sources: ['source-a'] }] },
});

describe('citation index', () => {
  const { numbers, backlinks } = buildCitationIndex(fixture);

  it('numbers sources in list order and ignores unknown ids', () => {
    expect(numbers(['source-a', 'source-b'])).toEqual([1, 2]);
    expect(numbers(['source-b', 'nope'])).toEqual([2]);
  });

  it('records every claim that cites a source', () => {
    const b = backlinks.get(2)!.map((r) => r.label);
    expect(b).toEqual(['IV · The Defining Moment', 'Key fact: Arrival', 'Film moment 3']);
    expect(backlinks.get(2)![0]!.id).toBe(citeId('moment', 2));
  });

  it('leaves uncited sources without backlinks', () => {
    expect(backlinks.has(3)).toBe(false);
  });
});

describe('structured data', () => {
  it('formats partial ISO dates', () => {
    expect(isoDate({ year: 1487 })).toBe('1487');
    expect(isoDate({ year: 1526, month: 8, day: 4 })).toBe('1526-08-04');
    expect(isoDate({ year: 1585, month: 12 })).toBe('1585-12');
  });

  it('describes the legend as an Article about a Person', () => {
    const ld = legendJsonLd('fixture-legend', fixture, new URL('https://lazzzarov.github.io'));
    expect(ld.url).toBe('https://lazzzarov.github.io/legends-of-spain/legends/fixture-legend/');
    expect(ld.image).toBe('https://lazzzarov.github.io/legends-of-spain/og/fixture-legend.png');
    expect(ld.about).toMatchObject({
      '@type': 'Person',
      alternateName: ['Fixture'],
      birthDate: '1487',
      deathDate: '1526-08-04',
    });
  });
});

describe('video rules', () => {
  const base = {
    status: 'published',
    description: 'd',
    transcript: 't',
    aiGenerated: true,
  } as const;

  it('requires an 11-character YouTube id, not a URL', () => {
    expect(
      videoSchema.safeParse({ ...base, provider: 'youtube', src: 'dQw4w9WgXcQ' }).success,
    ).toBe(true);
    expect(
      videoSchema.safeParse({ ...base, provider: 'youtube', src: 'https://youtu.be/dQw4w9WgXcQ' })
        .success,
    ).toBe(false);
  });

  it('requires file videos to be local paths', () => {
    expect(videoSchema.safeParse({ ...base, provider: 'file', src: 'media/x/v.mp4' }).success).toBe(
      true,
    );
    expect(
      videoSchema.safeParse({ ...base, provider: 'file', src: 'https://cdn/v.mp4' }).success,
    ).toBe(false);
  });
});

describe('labels', () => {
  it('formats century ranges', () => {
    expect(centuryLabel([16])).toBe('16th century');
    expect(centuryLabel([15, 16])).toBe('15th–16th century');
  });
});
