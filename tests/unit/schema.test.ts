import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { legendSchema } from '../../src/lib/schema';

const template = readFileSync(
  join(import.meta.dirname, '../../docs/templates/legend.template.yaml'),
  'utf8',
);

// A fresh, valid legend for each test to break in one specific way.
let legend: any;
beforeEach(() => {
  legend = parse(template);
});

const messages = () => {
  const result = legendSchema.safeParse(legend);
  return result.success ? [] : result.error.issues.map((i) => i.message);
};

describe('legend schema guarantees', () => {
  it('accepts the template', () => {
    expect(messages()).toEqual([]);
  });

  it('rejects a fact without a source', () => {
    legend.facts[0].sources = [];
    expect(messages()).toContain('at least one source is required');
  });

  it('rejects a reference to an unknown source', () => {
    legend.chapters[0].sources = ['does-not-exist'];
    expect(messages()).toContain('unknown source "does-not-exist"');
  });

  it('rejects an AI-generated portrait', () => {
    legend.media[0].kind = 'ai-generated';
    expect(messages()).toContain('an AI-generated image cannot be used as the portrait');
  });

  it('rejects a portrait that is not in the media registry', () => {
    legend.portrait = 'missing';
    expect(messages()).toContain('unknown media "missing"');
  });

  it('rejects chapters out of story order', () => {
    [legend.chapters[0], legend.chapters[1]] = [legend.chapters[1], legend.chapters[0]];
    expect(messages()).toContain('chapter 1 must be "beginning"');
  });

  it('requires exactly five chapters', () => {
    legend.chapters.pop();
    expect(messages().length).toBeGreaterThan(0);
  });

  it('rejects an unsourced quotation in the comic', () => {
    legend.comic.panels[0].dialogue = [{ speaker: 'X', text: 'Words', kind: 'quotation' }];
    expect(messages()).toContain('a quotation must cite a source; otherwise mark it dramatized');
  });

  it('accepts dramatized dialogue without a source', () => {
    legend.comic.panels[0].dialogue = [{ speaker: 'X', text: 'Words', kind: 'dramatized' }];
    expect(messages()).toEqual([]);
  });

  it('rejects a published video without a transcript', () => {
    legend.video = { ...legend.video, status: 'published', provider: 'youtube', src: 'abc' };
    expect(messages()).toContain('a published video needs provider, src and transcript');
  });

  it('rejects duplicate source ids', () => {
    legend.sources.push({ ...legend.sources[0] });
    expect(messages()).toContain('duplicate source id "placeholder-source"');
  });
});
