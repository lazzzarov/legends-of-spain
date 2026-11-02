import { expect, test } from '@playwright/test';
import { loadLegend, sourceNumber } from './content';

const ELCANO = 'legends/juan-sebastian-elcano/';
const elcano = loadLegend('juan-sebastian-elcano');
const cards = (page: import('@playwright/test').Page) =>
  page.locator('[data-gallery] > li:not([hidden])');

test.describe('gallery filters', () => {
  test('filter from the URL, change it, and clear it', async ({ page }) => {
    await page.goto('legends/?category=naval');
    const status = page.locator('[data-filters-summary]');
    await expect(status).toHaveText('Showing 5 of 14 legends');
    await expect(cards(page)).toHaveCount(5);
    await expect(page.getByRole('radio', { name: 'Naval' })).toBeChecked();

    await page.locator('label', { hasText: '16th century' }).click();
    await expect(page).toHaveURL(/\?category=naval&century=16$/);
    await expect(cards(page)).toHaveCount(4); // Lezo is 17th–18th century

    await page.getByRole('button', { name: 'Clear filters' }).first().click();
    await expect(status).toHaveText('Showing all 14 legends');
    await expect(page).toHaveURL(/\/legends\/$/);
  });

  test('ignores unknown filter values in the URL', async ({ page }) => {
    await page.goto('legends/?value=not-a-value');
    await expect(cards(page)).toHaveCount(14);
  });

  test('home value links open the filtered gallery', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('link', { name: /^Leadership/ }).click();
    await expect(page).toHaveURL(/\/legends\/\?value=leadership$/);
    await expect(page.getByRole('radio', { name: 'Leadership' })).toBeChecked();
    await expect(page.locator('[data-filters-summary]')).toHaveText(/^Showing \d+ of 14 legends$/);
  });
});

test.describe('story navigation', () => {
  test('marks the current section and fills the progress bar', async ({ page, isMobile }) => {
    await page.goto(ELCANO);
    const bar = page.locator('[data-reading-progress]');
    await expect(bar).toHaveCSS('transform', /matrix\(0, /);
    await page.locator('#sources').scrollIntoViewIfNeeded();
    await expect(page.locator('a[data-toc-link][aria-current="location"]').first()).toHaveText(
      /Sources|Places to Visit/,
    );
    await expect(bar).not.toHaveCSS('transform', /matrix\(0, /);
    if (isMobile) {
      await expect(page.locator('[data-story-menu-current]')).toHaveText(/Sources|Places to Visit/);
    }
  });

  test('the mobile menu lists every section and closes after a choice', async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, 'The sticky menu only shows below the desktop breakpoint.');
    await page.goto(ELCANO);
    const menu = page.locator('[data-story-menu]');
    await menu.locator('summary').click();
    await menu.getByRole('link', { name: 'Key Facts' }).click();
    await expect(menu).not.toHaveAttribute('open');
    await expect(page).toHaveURL(/#facts$/);
  });

  test('suggests related legends', async ({ page }) => {
    await page.goto(ELCANO);
    const related = page.locator('section[aria-labelledby="related"]');
    await expect(related.getByRole('link')).toHaveCount(2);
    await expect(related).toContainText('Miguel López de Legazpi');
  });
});

test.describe('citations', () => {
  test('preview the source on keyboard focus', async ({ page }) => {
    await page.goto(ELCANO);
    const n = sourceNumber(elcano, 'elcano-letter-1522');
    const marker = page.locator('#legacy').getByRole('link', { name: `Source ${n}` });
    await marker.focus();
    const tip = page.locator('#citation-preview');
    await expect(tip).toBeVisible();
    await expect(tip).toContainText(elcano.sources[n - 1]!.title.slice(0, 40));
    await expect(marker).toHaveAttribute('aria-describedby', 'citation-preview');
    await page.keyboard.press('Escape');
    await expect(tip).toBeHidden();
  });
});

test.describe('comic', () => {
  test('arrow keys move through the panels', async ({ page }) => {
    await page.goto(ELCANO);
    const status = page.locator('[data-comic-status]');
    await page.locator('[data-comic-track]').focus();
    await page.keyboard.press('ArrowRight');
    await expect(status).not.toHaveText(/^Panels? 1(–2)? of 8$/);
    await page.keyboard.press('Home');
    await expect(status).toHaveText(/^Panels? 1(–2)? of 8$/);
  });

  test('a finished illustration can be enlarged and closed with Escape', async ({ page }) => {
    await page.goto('styleguide/');
    const open = page.getByRole('button', { name: 'Enlarge panel 1' });
    await open.click();
    const dialog = page.locator('[data-comic-dialog]');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator('img')).toHaveAttribute('alt', /Test fixture/);
    await expect(dialog).toContainText('Test fixture panel one');
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
  });
});

test.describe('scroll reveals', () => {
  test('sections reveal as they scroll into view', async ({ page }) => {
    await page.goto(ELCANO);
    const sources = page.locator('section[aria-labelledby="sources"]');
    await expect(sources).not.toHaveClass(/is-revealed/);
    await sources.scrollIntoViewIfNeeded();
    await expect(sources).toHaveClass(/is-revealed/);
    await expect(sources).toHaveCSS('opacity', '1');
  });

  test('nothing is hidden when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(ELCANO);
    await expect(page.locator('section[aria-labelledby="sources"]')).toHaveCSS('opacity', '1');
  });

  test('nothing is hidden without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(`http://localhost:4400/legends-of-spain/${ELCANO}`);
    await expect(page.locator('section[aria-labelledby="sources"]')).toHaveCSS('opacity', '1');
    await expect(page.locator('[data-filters]')).toHaveCount(0); // filters live on /legends/
    await context.close();
  });
});
