import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  { path: './', heading: 'Legends Worthy of a Thousand Films' },
  { path: 'legends/', heading: 'The Legends' },
  { path: 'legends/example-legend/', heading: 'Example Legend' },
  { path: 'why/', heading: 'Why We Tell These Stories' },
  { path: 'credits/', heading: 'Credits & Licenses' },
];

for (const { path, heading } of routes) {
  test.describe(path, () => {
    test('loads directly (deep link) with its heading', async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
      await expect(page).toHaveTitle(/Legends of Spain/);
    });

    test('has no serious accessibility violations', async ({ page }) => {
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  });
}

test('navigates from the home gallery to a legend and onward', async ({ page }) => {
  await page.goto('./');
  await page.getByRole('link', { name: 'Example Legend' }).click();
  await expect(page).toHaveURL(/\/legends-of-spain\/legends\/example-legend\/$/);
  await expect(page.getByRole('heading', { name: 'The Other Side of the Story' })).toBeVisible();
});

test('main navigation links stay under the base path', async ({ page }) => {
  await page.goto('./');
  const hrefs = await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  for (const href of hrefs) expect(href).toMatch(/^\/legends-of-spain\//);
});

test('unknown pages show the styled 404', async ({ page }) => {
  await page.goto('this-page-does-not-exist/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lost at sea');
});

test('placeholder legends are marked noindex', async ({ page }) => {
  await page.goto('legends/example-legend/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});
