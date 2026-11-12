import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { legendSchema } from '../../src/lib/schema';

const dir = join(import.meta.dirname, '../../src/content/legends');
const files = readdirSync(dir).filter((f) => f.endsWith('.yaml'));
const load = (file: string) => parse(readFileSync(join(dir, file), 'utf8'));

describe('legend content files', () => {
  it('exist', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it('the contributor template matches the content schema', () => {
    const template = parse(
      readFileSync(join(import.meta.dirname, '../../docs/templates/legend.template.yaml'), 'utf8'),
    );
    expect(legendSchema.safeParse(template).error?.issues ?? []).toEqual([]);
  });

  it.each(files)('%s matches the content schema', (file) => {
    const result = legendSchema.safeParse(load(file));
    expect(result.error?.issues ?? []).toEqual([]);
  });

  it.each(files)('%s has a lowercase-kebab-case slug', (file) => {
    expect(file).toMatch(/^[a-z0-9][a-z0-9-]*\.yaml$/);
  });

  it.each(files)('%s has a key event for the timeline', (file) => {
    expect(load(file).keyEvent?.year).toBeTypeOf('number');
  });

  it('use unique book order', () => {
    const orders = files.map((f) => load(f).order);
    expect(new Set(orders).size).toBe(orders.length);
  });
});
