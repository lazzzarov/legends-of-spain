import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ELCANO = 'legends/juan-sebastian-elcano/';

test.describe('Elcano story page (draft build)', () => {
  test('shows the draft banner and the written story', async ({ page }) => {
    await page.goto(ELCANO);
    await expect(page.getByText(/^Draft — written from the research dossier/)).toBeVisible();
    await expect(page.locator('#moment')).toContainText('6 September 1522');
  });

  test('sources link back to every claim that cites them', async ({ page }) => {
    await page.goto(ELCANO);
    const letter = page.locator('#source-2');
    await expect(letter).toContainText('PATRONATO,48,R.20');
    await letter.getByRole('link', { name: 'IV · The Defining Moment' }).click();
    await expect(page).toHaveURL(/#cite-moment-2$/);
  });

  test('hides the video until it is published', async ({ page }) => {
    await page.goto(ELCANO);
    await expect(page.locator('#video')).toHaveCount(0);
  });

  test('shows the draft comic with working navigation', async ({ page }) => {
    await page.goto(ELCANO);
    const comic = page.locator('[data-comic]');
    const status = comic.locator('[data-comic-status]');
    await expect(status).toHaveText(/^Panels? 1(–2)? of 8$/);
    await expect(comic.getByRole('button', { name: /Previous/ })).toBeDisabled();
    await comic.getByRole('button', { name: /Next/ }).click();
    await expect(status).not.toHaveText(/^Panels? 1(–2)? of 8$/);
  });

  test('lists only places with a documented connection', async ({ page }) => {
    await page.goto(ELCANO);
    await expect(page.locator('section[aria-labelledby="places"]')).toContainText(
      'Sanlúcar de Barrameda',
    );
  });

  test('publishes structured data and a social image', async ({ page, request }) => {
    await page.goto(ELCANO);
    const ld = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent()) ?? '{}',
    );
    expect(ld.about.name).toBe('Juan Sebastián Elcano');
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
