import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  { path: './', heading: 'Who came first?' },
  { path: 'legends/', heading: 'The Legends' },
  { path: 'legends/juan-sebastian-elcano/', heading: 'Juan Sebastián Elcano' },
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
      // Scan the settled page: reduced motion skips the scroll-reveal fades, which axe would
      // otherwise measure mid-transition on slow CI runners.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  });
}

test('navigates from the gallery to a legend and onward', async ({ page }) => {
  await page.goto('legends/');
  await page.getByRole('link', { name: 'Juan Sebastián Elcano', exact: true }).click();
  await expect(page).toHaveURL(/\/legends-of-spain\/legends\/juan-sebastian-elcano\/$/);
  await expect(page.getByRole('heading', { name: 'The Other Side of the Story' })).toBeVisible();
  await page.getByRole('link', { name: /Next chapter/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Antonio de Leyva');
});

test('the gallery lists all 14 legends in book order', async ({ page }) => {
  await page.goto('legends/');
  const names = page.locator('#main').getByRole('heading', { level: 3 });
  await expect(names).toHaveCount(14);
  await expect(names.first()).toHaveText('Hernán Cortés');
  await expect(names.last()).toHaveText('Francisco Espoz y Mina');
});

test('chapters show credibility labels and link to sources', async ({ page }) => {
  await page.goto('legends/juan-sebastian-elcano/');
  const chapter = page.locator('#beginning');
  await expect(chapter).toContainText('Verified');
  await chapter.getByRole('link', { name: 'Source 1' }).click();
  await expect(page).toHaveURL(/#source-1$/);
});

test('main navigation links stay under the base path', async ({ page }) => {
  await page.goto('./');
  // The desktop bar and the small-screen menu carry the same links; check both.
  const hrefs = await page
    .locator('header nav a')
    .evaluateAll((links) => links.map((a) => a.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) expect(href).toMatch(/^\/legends-of-spain\//);
});

test('the small-screen menu opens and lists the main links', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'the menu replaces the link bar on small screens only');
  await page.goto('why/');
  await page.locator('header summary').click();
  const menu = page.getByRole('navigation', { name: 'Main (menu)' });
  await expect(menu.getByRole('link', { name: 'All legends' })).toBeVisible();
  await expect(menu.getByRole('link', { name: 'Why We Tell These Stories' })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('unknown pages show the styled 404', async ({ page }) => {
  await page.goto('this-page-does-not-exist/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Lost at sea');
});

test('reviewed legends are open to search engines', async ({ page }) => {
  await page.goto('legends/hernan-cortes/');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});
