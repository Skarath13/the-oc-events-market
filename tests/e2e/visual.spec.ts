import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const viewports = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

test('required viewport screenshots and hero safety', async ({ page, browserName }, testInfo) => {
  test.setTimeout(180_000);
  test.skip(
    browserName !== 'chromium' || testInfo.project.name !== 'chromium-desktop',
    'One canonical screenshot run',
  );
  const output = path.join(process.cwd(), 'reports/screenshots');
  await mkdir(output, { recursive: true });

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/', { waitUntil: 'networkidle' });
    await loadDeferredImages(page);
    await page.screenshot({
      path: path.join(output, `home-${viewport.width}x${viewport.height}.png`),
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
    const h1 = await page.locator('.home-hero h1').boundingBox();
    const cta = await page.getByRole('link', { name: 'Plan My Event' }).first().boundingBox();
    expect(h1).not.toBeNull();
    expect(cta).not.toBeNull();
    expect((h1?.y ?? viewport.height) + (h1?.height ?? 0)).toBeLessThan(viewport.height);
    expect(cta?.y ?? viewport.height).toBeLessThan(viewport.height);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    const cards = page.locator('.event-gateway__item');
    const leadCard = await cards.first().boundingBox();
    const leadMedia = await cards.first().locator('.event-gateway__media').boundingBox();
    const milestoneMedia = await cards.nth(2).locator('.event-gateway__media').boundingBox();
    const kidsMedia = await cards.nth(3).locator('.event-gateway__media').boundingBox();
    const kidsImage = await cards.nth(3).locator('img').boundingBox();
    expect(leadCard?.width ?? 0).toBeGreaterThanOrEqual(
      viewport.width <= 767 ? viewport.width - 42 : 300,
    );
    expect((leadMedia?.height ?? 0) / (leadMedia?.width ?? 1)).toBeCloseTo(0.75, 1);
    expect((milestoneMedia?.height ?? 0) / (milestoneMedia?.width ?? 1)).toBeCloseTo(
      viewport.width <= 380 ? 0.75 : viewport.width <= 767 ? 1.25 : 4 / 3,
      1,
    );
    expect(Math.abs((kidsMedia?.height ?? 0) - (kidsImage?.height ?? 0))).toBeLessThanOrEqual(1);
    await expect(page.locator('[data-actual-video] button')).toHaveCount(0);
    expect(
      await page
        .locator('[data-actual-video-element]')
        .evaluateAll((videos) => videos.every((video) => !(video as HTMLVideoElement).controls)),
    ).toBe(true);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    '/services/',
    '/events/weddings/',
    '/events/corporate-brand-events/',
    '/celebrations/',
    '/about/',
    '/contact/',
    '/for-vendors/',
  ]) {
    await page.goto(route, { waitUntil: 'networkidle' });
    await loadDeferredImages(page);
    const slug = route === '/' ? 'home' : route.replaceAll('/', '-').replace(/^-|-$/g, '');
    await page.screenshot({
      path: path.join(output, `${slug}-390x844.png`),
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of [
    '/services/',
    '/events/birthdays-milestones/',
    '/events/corporate-brand-events/',
    '/celebrations/',
    '/about/',
    '/contact/',
    '/for-vendors/',
  ]) {
    await page.goto(route, { waitUntil: 'networkidle' });
    const slug = route.replaceAll('/', '-').replace(/^-|-$/g, '');
    await page.screenshot({
      path: path.join(output, `${slug}-1440x900.png`),
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  }

  for (const proof of [
    { width: 430, height: 932, route: '/events/weddings/' },
    { width: 768, height: 1024, route: '/events/birthdays-milestones/' },
    { width: 1024, height: 768, route: '/events/weddings/' },
    { width: 1920, height: 1080, route: '/events/birthdays-milestones/' },
  ]) {
    await page.setViewportSize({ width: proof.width, height: proof.height });
    await page.goto(proof.route, { waitUntil: 'networkidle' });
    await loadDeferredImages(page);
    const slug = proof.route.replaceAll('/', '-').replace(/^-|-$/g, '');
    await page.screenshot({
      path: path.join(output, `${slug}-${proof.width}x${proof.height}.png`),
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
    const media = await page.locator('.page-hero__media').boundingBox();
    const image = await page.locator('.page-hero__media img').boundingBox();
    expect(media?.width ?? 0).toBeGreaterThanOrEqual(proof.width <= 767 ? proof.width : 300);
    expect(Math.abs((media?.height ?? 0) - (image?.height ?? 0))).toBeLessThanOrEqual(1);
    await expect(page.locator('.page-hero__media img')).toHaveCSS('object-fit', 'contain');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

async function loadDeferredImages(page: import('@playwright/test').Page) {
  await page.locator('img[loading="lazy"]').evaluateAll((images) => {
    for (const element of images) (element as HTMLImageElement).loading = 'eager';
  });
  await page.locator('img').evaluateAll(async (elements) => {
    const images = elements as HTMLImageElement[];
    await Promise.all(
      images.map(async (image) => {
        if (!image.complete) {
          await new Promise<void>((resolve) => {
            image.addEventListener('load', () => resolve(), { once: true });
            image.addEventListener('error', () => resolve(), { once: true });
          });
        }
        try {
          await image.decode();
        } catch {
          // The route contract test reports broken image requests separately.
        }
      }),
    );
  });
}
