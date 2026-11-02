import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { buildCitationIndex, citeId } from '../../src/lib/citations';
import { isoDate, legendJsonLd } from '../../src/lib/jsonld';
import { legendSchema, videoSchema } from '../../src/lib/schema';
import { centuryLabel } from '../../src/i18n/en';

const elcano = legendSchema.parse(
  parse(
    readFileSync(
      join(import.meta.dirname, '../../src/content/legends/juan-sebastian-elcano.yaml'),
      'utf8',
    ),
  ),
);

describe('citation index', () => {
  const { numbers, backlinks } = buildCitationIndex(elcano);

  it('numbers sources in list order and ignores unknown ids', () => {
    expect(numbers(['research-dossier', 'elcano-letter-1522'])).toEqual([1, 2]);
    expect(numbers(['nope'])).toEqual([]);
  });

  it('records every claim that cites a source', () => {
    const letter = backlinks.get(2)!.map((r) => r.label);
    expect(letter).toContain('IV · The Defining Moment');
    expect(letter).toContain('Key fact: The Victoria reaches Sanlúcar');
    expect(letter).toContain('Film moment 3');
    expect(backlinks.get(2)![0]!.id).toBe(citeId('moment', 2));
  });

  it('leaves uncited sources without backlinks', () => {
    expect(backlinks.has(4)).toBe(false); // Pigafetta: listed for further reading
  });
});

describe('structured data', () => {
  it('formats partial ISO dates', () => {
    expect(isoDate({ year: 1487 })).toBe('1487');
    expect(isoDate({ year: 1526, month: 8, day: 4 })).toBe('1526-08-04');
    expect(isoDate({ year: 1585, month: 12 })).toBe('1585-12');
  });

  it('describes the legend as an Article about a Person', () => {
    const ld = legendJsonLd(
      'juan-sebastian-elcano',
      elcano,
      new URL('https://lazzzarov.github.io'),
    );
    expect(ld.url).toBe(
      'https://lazzzarov.github.io/legends-of-spain/legends/juan-sebastian-elcano/',
    );
    expect(ld.image).toBe(
      'https://lazzzarov.github.io/legends-of-spain/og/juan-sebastian-elcano.png',
    );
    expect(ld.about).toMatchObject({
      '@type': 'Person',
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
