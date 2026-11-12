import { describe, expect, it } from 'vitest';
import {
  buildScale,
  neighbours,
  sortByEvent,
  toTimeline,
  type TimelineItem,
} from '../../src/lib/timeline';

const item = (slug: string, born: number, died: number, eventYear: number): TimelineItem => ({
  slug,
  name: slug,
  born,
  died,
  eventYear,
  eventLabel: `${slug} event`,
});
const items = [
  item('c', 1689, 1741, 1741),
  item('a', 1485, 1547, 1521),
  item('b', 1487, 1526, 1522),
];

describe('sortByEvent', () => {
  it('orders by key event, not by birth or input order', () => {
    expect(sortByEvent(items).map((i) => i.slug)).toEqual(['a', 'b', 'c']);
  });

  it('breaks ties by birth year and leaves the input untouched', () => {
    const tied = [item('late', 1500, 1560, 1540), item('early', 1490, 1550, 1540)];
    expect(sortByEvent(tied).map((i) => i.slug)).toEqual(['early', 'late']);
    expect(tied[0]!.slug).toBe('late');
  });
});

describe('buildScale', () => {
  const scale = buildScale(items);

  it('pads the axis outward to half-centuries', () => {
    expect([scale.start, scale.end]).toEqual([1450, 1750]);
    expect(scale.ticks).toEqual([1450, 1500, 1550, 1600, 1650, 1700, 1750]);
  });

  it('maps years to percentages along the axis', () => {
    expect(scale.position(1450)).toBe(0);
    expect(scale.position(1600)).toBe(50);
    expect(scale.position(1750)).toBe(100);
  });

  it('keeps every life inside the axis', () => {
    for (const i of items) {
      expect(scale.position(i.born)).toBeGreaterThanOrEqual(0);
      expect(scale.position(i.died)).toBeLessThanOrEqual(100);
    }
  });

  it('refuses an empty timeline', () => {
    expect(() => buildScale([])).toThrow();
  });
});

describe('neighbours', () => {
  it('finds the legends before and after in time', () => {
    const { previous, next } = neighbours(items, 'b');
    expect([previous?.slug, next?.slug]).toEqual(['a', 'c']);
  });

  it('has no previous at the start and no next at the end', () => {
    expect(neighbours(items, 'a').previous).toBeUndefined();
    expect(neighbours(items, 'c').next).toBeUndefined();
  });

  it('reports an unknown legend', () => {
    expect(neighbours(items, 'nobody').index).toBe(-1);
  });
});

describe('toTimeline', () => {
  const legend = (id: string, year?: number) => ({
    id,
    data: {
      name: { display: id },
      dates: { born: { year: 1500 }, died: { year: 1560 } },
      keyEvent: year ? { year, label: 'event' } : undefined,
    },
  });

  it('skips legends without a key event and sorts the rest', () => {
    const result = toTimeline([legend('late', 1550), legend('none'), legend('early', 1520)]);
    expect(result.map((i) => i.slug)).toEqual(['early', 'late']);
    expect(result[0]!.legend.id).toBe('early');
  });
});
