import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { legendSchema, type Legend } from '../../src/lib/schema';

/** Load a legend file so tests derive expectations from content instead of hard-coding them. */
export function loadLegend(slug: string): Legend {
  const file = join(import.meta.dirname, `../../src/content/legends/${slug}.yaml`);
  return legendSchema.parse(parse(readFileSync(file, 'utf8')));
}

/** 1-based number of a source in the legend's Sources list. */
export const sourceNumber = (legend: Legend, id: string): number =>
  legend.sources.findIndex((s) => s.id === id) + 1;
