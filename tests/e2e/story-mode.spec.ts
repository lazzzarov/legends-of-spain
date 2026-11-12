import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
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
const total = legends.length + 1;

const bar = (page: Page) => page.locator('[data-story-bar]');
const visibleSlide = (page: Page) => page.locator('[data-slide]:not([hidden])');

test.describe('home timeline (step 1)', () => {
  test('shows every legend in order of their defining moment, on one screen', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Who came first?');
    const stops = page.locator('[data-stop]');
    await expect(stops).toHaveCount(legends.length);
    expect(
      await stops.evaluateAll((els) => els.map((el) => (el as HTMLElement).dataset.stop)),
    ).toEqual(legends.map((l) => l.slug));
    await expect(stops.first()).toContainText(first.data.name.display);
    const overflow = await page.evaluate(() => ({
      x: document.documentElement.scrollWidth - innerWidth,
      y: document.documentElement.scrollHeight - innerHeight,
    }));
    expect(overflow).toEqual({ x: 0, y: 0 });
    await expect(bar(page)).toContainText(`1 / ${total}`);
  });

  test('without JavaScript, faces are plain links to the legends', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('http://localhost:4400/legends-of-spain/');
    await expect(page.locator('[data-slide]:visible')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /Begin the story/ })).toBeHidden();
    await page.getByRole('link', { name: new RegExp(first.data.name.display) }).click();
    await expect(page).toHaveURL(new RegExp(`/legends/${first.slug}/$`));
    await context.close();
  });

  test('has no serious accessibility violations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});

test.describe('story mode', () => {
  test('Begin the story opens the first legend, plays, and pauses', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /Begin the story/ }).click();
    await expect(page).toHaveURL(new RegExp(`#story/${first.slug}/1$`));
    await expect(visibleSlide(page)).toHaveCount(1);
    await expect(visibleSlide(page).getByRole('heading', { level: 2 })).toHaveText(
      first.data.name.display,
    );
    await expect(visibleSlide(page).getByRole('heading', { level: 2 })).toBeFocused();
    await expect(bar(page)).toContainText(`2 / ${total}`);
    await expect(bar(page)).toHaveAttribute('data-playing', '');
    await page.getByRole('button', { name: 'Pause' }).click();
    await expect(bar(page)).not.toHaveAttribute('data-playing', '');
    await expect(page.getByRole('button', { name: 'Play' })).toBeVisible();
  });

  test('advances on its own while playing', async ({ page }) => {
    await page.clock.install();
    await page.goto(`./#story/${first.slug}/2`);
    await expect(bar(page)).toHaveAttribute('data-playing', '');
    await page.clock.runFor(31_000); // the longest a slide stays up
    await expect(page).toHaveURL(new RegExp(`#story/${first.slug}/3$`));
  });

  test('keys move between slides and legends; Escape returns to the timeline', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`./#story/${first.slug}/1`);
    await expect(visibleSlide(page)).toHaveAttribute('data-kind', 'title');
    await page.keyboard.press('ArrowRight');
    await expect(visibleSlide(page)).toHaveAttribute('data-kind', 'chapter');
    await expect(visibleSlide(page)).toContainText(first.data.chapters[0]!.body.slice(0, 40));
    await page.keyboard.press('ArrowLeft');
    await expect(visibleSlide(page)).toHaveAttribute('data-kind', 'title');

    // Past the last slide of one legend comes the next legend's title card.
    const count = await page.locator(`[data-deck="${first.slug}"] [data-slide]`).count();
    await page.goto(`./#story/${first.slug}/${count}`);
    await expect(visibleSlide(page)).toHaveAttribute('data-kind', 'end');
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(new RegExp(`#story/${second.slug}/1$`));

    await page.keyboard.press('Escape');
    await expect(page.locator('[data-story-timeline]')).toBeVisible();
    await expect(visibleSlide(page)).toHaveCount(0);
    await expect(page.locator(`[data-story-open="${second.slug}"]`)).toBeFocused();
  });

  test('a face on the timeline opens that legend', async ({ page }) => {
    await page.goto('./');
    await page.locator(`[data-story-open="${second.slug}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#story/${second.slug}/1$`));
    await expect(visibleSlide(page)).toContainText(second.data.tagline);
  });

  test('reduced motion: nothing advances on its own', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.clock.install();
    await page.goto('./');
    await page.getByRole('button', { name: /Begin the story/ }).click();
    await expect(bar(page)).not.toHaveAttribute('data-playing', '');
    await page.clock.runFor(60_000);
    await expect(page).toHaveURL(new RegExp(`#story/${first.slug}/1$`));
  });

  test('a legend page plays its own story', async ({ page }) => {
    await page.goto(`legends/${second.slug}/`);
    await page.getByRole('link', { name: /Play the story/ }).click();
    await expect(page).toHaveURL(new RegExp(`/legends-of-spain/#story/${second.slug}/1$`));
    await expect(visibleSlide(page).getByRole('heading', { level: 2 })).toHaveText(
      second.data.name.display,
    );
  });

  test('Back leaves the story for the timeline', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /Begin the story/ }).click();
    await expect(visibleSlide(page)).toHaveCount(1);
    await page.goBack();
    await expect(page.locator('[data-story-timeline]')).toBeVisible();
    await expect(visibleSlide(page)).toHaveCount(0);
  });

  test('slides fit the screen and keep the reviewed labels', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`./#story/${first.slug}/2`);
    const slide = visibleSlide(page);
    await expect(slide).toContainText(new RegExp(`${first.data.chapters[0]!.title}`));
    await expect(slide.getByRole('link', { name: /Sources and the full chapter/ })).toHaveAttribute(
      'href',
      new RegExp(`/legends/${first.slug}/#beginning$`),
    );
    const overflow = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    expect(overflow).toBe(0);
  });

  test('chapters with a film loop show it, labelled as AI-generated', async ({ page }) => {
    const elcano = legends.find((l) => l.slug === 'juan-sebastian-elcano')!;
    const loop = elcano.data.storyLoops[0]!;
    const index = elcano.data.chapters.findIndex((c) => c.key === loop.chapter) + 2;
    await page.goto(`./#story/${elcano.slug}/${index}`);
    const video = visibleSlide(page).locator('video[data-story-loop]');
    await expect(video).toHaveAttribute('aria-label', loop.alt);
    await expect(video).toHaveJSProperty('muted', true);
    await expect(visibleSlide(page)).toContainText('AI-generated historical dramatization');
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
  });

  test('reduced motion: loops stay still', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const elcano = legends.find((l) => l.slug === 'juan-sebastian-elcano')!;
    const loop = elcano.data.storyLoops[0]!;
    const index = elcano.data.chapters.findIndex((c) => c.key === loop.chapter) + 2;
    await page.goto(`./#story/${elcano.slug}/${index}`);
    const video = visibleSlide(page).locator('video[data-story-loop]');
    await expect(video).toBeVisible();
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });

  test('an open slide has no serious accessibility violations', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`./#story/${first.slug}/2`);
    await expect(visibleSlide(page)).toHaveCount(1);
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
