import { describe, expect, it } from 'vitest';
import { joinBase } from '../../src/lib/paths';
import { formatYear, isVisible, lifespan } from '../../src/lib/legends';

describe('joinBase', () => {
  it('joins base and path with exactly one slash', () => {
    expect(joinBase('/legends-of-spain/', 'legends/elcano/')).toBe(
      '/legends-of-spain/legends/elcano/',
    );
    expect(joinBase('/legends-of-spain', '/why/')).toBe('/legends-of-spain/why/');
    expect(joinBase('/legends-of-spain/')).toBe('/legends-of-spain/');
    expect(joinBase('/', 'credits/')).toBe('/credits/');
  });
});

describe('isVisible', () => {
  it('hides unreviewed content in production', () => {
    expect(isVisible('placeholder', false)).toBe(false);
    expect(isVisible('draft', false)).toBe(false);
    expect(isVisible('sourced', false)).toBe(false);
    expect(isVisible('reviewed', false)).toBe(true);
    expect(isVisible('published', false)).toBe(true);
  });

  it('shows everything when drafts are enabled', () => {
    expect(isVisible('placeholder', true)).toBe(true);
  });
});

describe('dates', () => {
  it('formats approximate and explicit years', () => {
    expect(formatYear({ year: 1498, approx: true })).toBe('c. 1498');
    expect(formatYear({ year: 1522 })).toBe('1522');
    expect(formatYear({ year: 1522, display: '6 Sep 1522' })).toBe('6 Sep 1522');
    expect(lifespan({ born: { year: 1487 }, died: { year: 1526 } })).toBe('1487–1526');
  });
});
