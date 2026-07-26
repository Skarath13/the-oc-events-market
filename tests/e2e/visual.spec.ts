import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const viewports = [
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

test('required viewport screenshots and hero safety', async ({ page, browserName }, testInfo) => {
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
  }

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/services/', '/events/weddings/', '/contact/', '/for-vendors/']) {
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
