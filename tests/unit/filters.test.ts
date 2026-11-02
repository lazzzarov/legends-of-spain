import { describe, expect, it } from 'vitest';
import { matches, parseFilters, summary, toSearch } from '../../src/lib/filters';

const elcano = { category: ['exploration', 'naval'], century: ['15', '16'], value: ['resilience'] };

describe('gallery filters', () => {
  it('parses only known keys with values', () => {
    expect(parseFilters('?category=naval&century=&foo=bar&value=resilience')).toEqual({
      category: 'naval',
      value: 'resilience',
    });
  });

  it('serialises in a stable order and omits empty filters', () => {
    expect(toSearch({ value: 'resilience', category: 'naval' })).toBe(
      '?category=naval&value=resilience',
    );
    expect(toSearch({})).toBe('');
  });

  it('matches when every active filter is satisfied', () => {
    expect(matches(elcano, {})).toBe(true);
    expect(matches(elcano, { category: 'naval' })).toBe(true);
    expect(matches(elcano, { category: 'naval', century: '16' })).toBe(true);
    expect(matches(elcano, { category: 'land' })).toBe(false);
    expect(matches(elcano, { category: 'naval', value: 'sacrifice' })).toBe(false);
  });

  it('summarises the result for screen readers', () => {
    expect(summary(14, 14)).toBe('Showing all 14 legends');
    expect(summary(5, 14)).toBe('Showing 5 of 14 legends');
    expect(summary(0, 14)).toBe('No legends match these filters');
  });
});
