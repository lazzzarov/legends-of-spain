import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { loadLegend, sourceNumber } from './content';

const ELCANO = 'legends/juan-sebastian-elcano/';
// Expectations come from the legend file, so content edits don't break these tests.
const elcano = loadLegend('juan-sebastian-elcano');
const letter = sourceNumber(elcano, 'elcano-letter-1522');
const panels = elcano.comic!.panels.length;
const firstView = new RegExp(`^Panels? 1(–2)? of ${panels}$`);

test.describe('Elcano story page (build with drafts)', () => {
  test('shows the review banner, the story, and stays out of search engines', async ({ page }) => {
    await page.goto(ELCANO);
    await expect(page.getByText(/^Sourced — awaiting the editor’s review/)).toBeVisible();
    await expect(page.locator('#moment')).toContainText('6 September 1522');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  });

  test('sources link back to every claim that cites them', async ({ page }) => {
    await page.goto(ELCANO);
    const entry = page.locator(`#source-${letter}`);
    await expect(entry).toContainText('PATRONATO,48,R.20');
    await entry.getByRole('link', { name: 'V · The Legacy' }).click();
    await expect(page).toHaveURL(new RegExp(`#cite-legacy-${letter}$`));
  });

  test('hides the video until it is published', async ({ page }) => {
    await page.goto(ELCANO);
    await expect(page.locator('#video')).toHaveCount(0);
  });

  test('shows the draft comic with working navigation', async ({ page }) => {
    await page.goto(ELCANO);
    const comic = page.locator('[data-comic]');
    const status = comic.locator('[data-comic-status]');
    await expect(status).toHaveText(firstView);
    await expect(comic.getByRole('button', { name: /Previous/ })).toBeDisabled();
    await comic.getByRole('button', { name: /Next/ }).click();
    await expect(status).not.toHaveText(firstView);
  });

  test('lists only places with a documented connection', async ({ page }) => {
    await page.goto(ELCANO);
    const places = page.locator('section[aria-labelledby="places"]');
    for (const place of elcano.places) await expect(places).toContainText(place.name);
  });

  test('publishes structured data and a social image', async ({ page, request }) => {
    await page.goto(ELCANO);
    const ld = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
    );
    expect(ld.about.name).toBe(elcano.name.full ?? elcano.name.display);
    const image = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(image).toMatch(/\/legends-of-spain\/og\/juan-sebastian-elcano\.png$/);
    const res = await request.get(new URL(image!).pathname);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/png');
  });

  test('has no serious accessibility violations', async ({ page }) => {
    await page.goto(ELCANO);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();
    expect(
      violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? '')).map((v) => v.id),
    ).toEqual([]);
  });
});

test.describe('styleguide fixtures', () => {
  test('the video loads nothing from YouTube until play is pressed', async ({ page }) => {
    const youtube: string[] = [];
    await page.route(/youtube/, (route) => {
      youtube.push(route.request().url());
      return route.abort();
    });
    await page.goto('styleguide/');
    const play = page.getByRole('button', {
      name: /^Play video: .*AI-generated historical dramatization/,
    });
    await expect(play).toBeVisible();
    await expect(page.locator('iframe')).toHaveCount(0);
    expect(youtube).toEqual([]);

    await play.click();
    await expect(page.locator('iframe')).toHaveAttribute(
      'src',
      /^https:\/\/www\.youtube-nocookie\.com\/embed\/TESTFIXTURE\?/,
    );
    await expect(page.locator('iframe')).toHaveAttribute('src', /cc_load_policy=1/);
  });

  test('the video carries an AI disclosure and a transcript', async ({ page }) => {
    await page.goto('styleguide/');
    const video = page.locator('section[aria-labelledby="video"]');
    await expect(video).toContainText('AI-generated historical dramatization');
    await video.getByText('Read the transcript').click();
    await expect(video).toContainText('Second line of the transcript.');
  });

  test('dramatized comic dialogue is labelled', async ({ page }) => {
    await page.goto('styleguide/');
    const panel = page.getByRole('listitem', { name: 'Panel 2 of 3' });
    await expect(panel).toContainText('Dramatization');
  });

  test('has no serious accessibility violations', async ({ page }) => {
    await page.goto('styleguide/');
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();
    expect(
      violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? '')).map((v) => v.id),
    ).toEqual([]);
  });
});
