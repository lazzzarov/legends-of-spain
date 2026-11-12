/**
 * Timeline maths, shared by the timeline page, the home strip and unit tests.
 * Legends are ordered by their key event, not by birth: the question the timeline
 * answers is "whose defining moment came first?".
 */
export interface TimelineItem {
  slug: string;
  name: string;
  born: number;
  died: number;
  eventYear: number;
  eventLabel: string;
}

export interface TimelineScale {
  start: number;
  end: number;
  /** Years marked on the axis. */
  ticks: number[];
  /** Position of a year along the axis, as a percentage (0–100). */
  position: (year: number) => number;
}

/** Order by key event; ties fall back to birth year, then name, so the order is stable. */
export function sortByEvent<T extends TimelineItem>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => a.eventYear - b.eventYear || a.born - b.born || a.name.localeCompare(b.name),
  );
}

/** An axis that covers every life, padded outward to the nearest `step` years. */
export function buildScale(items: TimelineItem[], step = 50): TimelineScale {
  if (items.length === 0) throw new Error('a timeline needs at least one legend');
  const first = Math.min(...items.map((i) => i.born));
  const last = Math.max(...items.map((i) => i.died));
  const start = Math.floor(first / step) * step;
  const end = Math.ceil(last / step) * step;
  const ticks: number[] = [];
  for (let year = start; year <= end; year += step) ticks.push(year);
  const span = end - start;
  return { start, end, ticks, position: (year) => ((year - start) / span) * 100 };
}

/** The legends whose key events come immediately before and after the given one. */
export function neighbours<T extends TimelineItem>(
  items: T[],
  slug: string,
): { index: number; previous?: T; next?: T } {
  const sorted = sortByEvent(items);
  const index = sorted.findIndex((i) => i.slug === slug);
  if (index === -1) return { index };
  return { index, previous: sorted[index - 1], next: sorted[index + 1] };
}

/** The slice of a legend entry the timeline needs (kept structural so tests can use plain objects). */
interface LegendLike {
  id: string;
  data: {
    name: { display: string };
    dates: { born: { year: number }; died: { year: number } };
    keyEvent?: { year: number; label: string };
  };
}

/** Timeline items for every legend that has a key event, in timeline order. */
export function toTimeline<T extends LegendLike>(legends: T[]): (TimelineItem & { legend: T })[] {
  return sortByEvent(
    legends.flatMap((legend) => {
      const { keyEvent, name, dates } = legend.data;
      if (!keyEvent) return [];
      return [
        {
          slug: legend.id,
          name: name.display,
          born: dates.born.year,
          died: dates.died.year,
          eventYear: keyEvent.year,
          eventLabel: keyEvent.label,
          legend,
        },
      ];
    }),
  );
}
