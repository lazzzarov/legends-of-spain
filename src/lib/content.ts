import { getCollection, type CollectionEntry } from 'astro:content';
import { isVisible, showDrafts } from './legends';

export type LegendEntry = CollectionEntry<'legends'>;

/** All legends visible in this build, in book order. */
export async function getLegends(): Promise<LegendEntry[]> {
  const drafts = showDrafts();
  const all = await getCollection('legends', ({ data }) => isVisible(data.review.status, drafts));
  return all.sort((a, b) => a.data.order - b.data.order);
}
