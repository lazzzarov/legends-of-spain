import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { loadLegend } from './content';

const slugs = readdirSync(join(import.meta.dirname, '../../src/content/legends'))
  .filter((f) => f.endsWith('.yaml'))
  .map((f) => f.replace(/\.yaml$/, ''));

for (const slug of slugs) {
  const legend = loadLegend(slug);
  test.describe(`legends/${slug}/`, () => {
    test('loads with its name, sources and no serious accessibility violations', async ({
      page,
    }) => {
      // Reduced motion skips the scroll-reveal fades so axe measures the settled page.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      const response = await page.goto(`legends/${slug}/`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(legend.name.display);
      await expect(page.locator('[id^="source-"]')).toHaveCount(legend.sources.length);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  });
}
