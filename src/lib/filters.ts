/**
 * Gallery filtering, shared by the filter script (browser) and unit tests.
 * State lives in the URL (?category=naval&century=16&value=leadership) so filtered
 * views can be bookmarked and shared.
 */
export const FILTER_KEYS = ['category', 'century', 'value'] as const;
export type FilterKey = (typeof FILTER_KEYS)[number];
export type Filters = Partial<Record<FilterKey, string>>;

/** What a card exposes for filtering (mirrors its data-* attributes). */
export interface Filterable {
  category: string[];
  century: string[];
  value: string[];
}

export function parseFilters(search: string | URLSearchParams): Filters {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search;
  const filters: Filters = {};
  for (const key of FILTER_KEYS) {
    const v = params.get(key);
    if (v) filters[key] = v;
  }
  return filters;
}

export function toSearch(filters: Filters): string {
  const params = new URLSearchParams();
  for (const key of FILTER_KEYS) if (filters[key]) params.set(key, filters[key]!);
  const s = params.toString();
  return s ? `?${s}` : '';
}

/** A card matches when every active filter is among its values (AND across groups). */
export function matches(item: Filterable, filters: Filters): boolean {
  return FILTER_KEYS.every((key) => !filters[key] || item[key].includes(filters[key]!));
}

export function summary(shown: number, total: number): string {
  if (shown === total) return `Showing all ${total} legends`;
  if (shown === 0) return 'No legends match these filters';
  return `Showing ${shown} of ${total} legends`;
}
