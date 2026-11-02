import type { ReviewStatus } from './schema';

const PUBLISHABLE: ReviewStatus[] = ['reviewed', 'published'];

/**
 * Production builds only show reviewed content. Set PUBLIC_SHOW_DRAFTS=true
 * (the dev server does this automatically) to preview placeholders and drafts.
 */
export function isVisible(status: ReviewStatus, showDrafts: boolean): boolean {
  return showDrafts || PUBLISHABLE.includes(status);
}

export const showDrafts = (): boolean =>
  import.meta.env.DEV || import.meta.env.PUBLIC_SHOW_DRAFTS === 'true';

/** Format a historical date: an explicit `display` wins, otherwise "c. 1500" / "1500". */
export function formatYear(d: { year: number; approx?: boolean; display?: string }): string {
  return d.display ?? `${d.approx ? 'c. ' : ''}${d.year}`;
}

export function lifespan(dates: {
  born: { year: number; approx?: boolean; display?: string };
  died: { year: number; approx?: boolean; display?: string };
}): string {
  return `${formatYear(dates.born)}–${formatYear(dates.died)}`;
}
