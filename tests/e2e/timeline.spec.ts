import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { loadLegend } from './content';

// Expectations come from the legend files, so content edits don't break these tests.
const legends = readdirSync(join(import.meta.dirname, '../../src/content/legends'))
  .filter((f) => f.endsWith('.yaml'))
  .map((f) => ({ slug: f.replace(/\.yaml$/, ''), data: loadLegend(f.replace(/\.yaml$/, '')) }))
  .sort(
    (a, b) =>
      a.data.keyEvent!.year - b.data.keyEvent!.year ||
      a.data.dates.born.year - b.data.dates.born.year,
  );
const first = legends[0]!;
const second = legends[1]!;

test.describe('timeline page', () => {
  test('lists every legend in order of their defining moment', async ({ page }) => {
    await page.goto('timeline/');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Timeline');
    const rows = page.locator('[data-timeline] > li');
    await expect(rows).toHaveCount(legends.length);
    const years = await rows.evaluateAll((els) =>
      els.map((el) => Number((el as HTMLElement).dataset.eventYear)),
    );
    expect(years).toEqual(legends.map((l) => l.data.keyEvent!.year));
    await expect(rows.first()).toContainText(first.data.name.display);
    await expect(rows.first()).toContainText(first.data.keyEvent!.label);
  });

  test('each row opens its legend', async ({ page }) => {
    await page.goto('timeline/');
    await page.getByRole('link', { name: first.data.name.display }).click();
    await expect(page).toHaveURL(new RegExp(`/legends/${first.slug}/$`));
  });

  test('is reachable by keyboard from the main navigation', async ({ page }) => {
    await page.goto('./');
    const link = page.getByRole('navigation', { name: 'Main' }).getByRole('link', {
      name: 'Timeline',
    });
    await link.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/timeline\/$/);
    await expect(link).toHaveAttribute('aria-current', 'page');
  });

  test('filters narrow the rows and are kept in the URL', async ({ page }) => {
    await page.goto('timeline/');
    await page.getByText('18th century', { exact: true }).click();
    await expect(page).toHaveURL(/century=18/);
    const expected = legends.filter((l) => l.data.centuries.includes(18)).length;
    await expect(page.locator('[data-timeline] > li:visible')).toHaveCount(expected);
  });

  test('does not scroll sideways on a narrow screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 700 });
    await page.goto('timeline/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });

  test('has no serious accessibility violations', async ({ page }) => {
    // Reduced motion skips the scroll-reveal fades so axe measures the settled page.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('timeline/');
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});

test.describe('timeline strips', () => {
  test('the home page shows the order and links to the full timeline', async ({ page }) => {
    await page.goto('./');
    const strip = page.locator('[data-timeline-strip] > li');
    await expect(strip).toHaveCount(legends.length);
    await expect(strip.first()).toContainText(String(first.data.keyEvent!.year));
    await page.getByRole('link', { name: /See the full timeline/ }).click();
    await expect(page).toHaveURL(/\/timeline\/$/);
  });

  test('a legend page shows who came before and after', async ({ page }) => {
    await page.goto(`legends/${second.slug}/`);
    const position = page.locator('[data-timeline-position]');
    await expect(position).toContainText(second.data.keyEvent!.label);
    await expect(position).toContainText(first.data.name.display);
    await expect(position).toContainText(legends[2]!.data.name.display);
  });
});
