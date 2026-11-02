import type { Legend } from './schema';

export interface CitationRef {
  /** DOM id of the citation marker, e.g. "cite-beginning-2". */
  id: string;
  /** Where the claim appears, e.g. "I · The Beginning". */
  label: string;
}

export interface CitationIndex {
  /** Source numbers (1-based, in Sources-list order) for a list of source ids. */
  numbers: (ids: string[]) => number[];
  /** For each source number, every place in the story that cites it. */
  backlinks: Map<number, CitationRef[]>;
}

const NUMERAL = ['I', 'II', 'III', 'IV', 'V'];

export const citeId = (prefix: string, n: number): string => `cite-${prefix}-${n}`;

/**
 * Number a legend's sources and record where each one is cited, so the Sources
 * list can link back to every claim it supports ("associated claims").
 */
export function buildCitationIndex(legend: Legend): CitationIndex {
  const numberOf = new Map(legend.sources.map((s, i) => [s.id, i + 1]));
  const numbers = (ids: string[]) =>
    ids.map((id) => numberOf.get(id)).filter((n): n is number => n !== undefined);

  const backlinks = new Map<number, CitationRef[]>();
  const record = (prefix: string, label: string, ids: string[]) => {
    for (const n of numbers(ids)) {
      const refs = backlinks.get(n) ?? [];
      refs.push({ id: citeId(prefix, n), label });
      backlinks.set(n, refs);
    }
  };

  legend.chapters.forEach((c, i) => record(c.key, `${NUMERAL[i]} · ${c.title}`, c.sources));
  legend.facts.forEach((f, i) => record(`fact-${i}`, `Key fact: ${f.label}`, f.sources));
  legend.movie?.moments.forEach((m, i) => record(`moment-${i}`, `Film moment ${i + 1}`, m.sources));
  legend.myths.forEach((m, i) => record(`myth-${i}`, 'Legend or History?', m.sources));
  record('other-side', 'The Other Side of the Story', legend.otherSide.sources);
  legend.places.forEach((p, i) => record(`place-${i}`, `Place: ${p.name}`, p.sources));

  return { numbers, backlinks };
}
