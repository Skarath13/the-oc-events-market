import { expect, test } from '@playwright/test';

test('all September 29 photos appear in their event galleries', async ({ page }) => {
  const expected = [
    { route: '/events/weddings/', indexes: [1, ...Array.from({ length: 23 }, (_, i) => i + 4)] },
    { route: '/events/baby-bridal-showers/', indexes: [27, 28, 29, 30] },
    { route: '/events/birthdays-milestones/', indexes: [2, 3] },
    { route: '/celebrations/', indexes: [31, 32, 33, 34, 35, 36, 37] },
  ];
  const seen: number[] = [];
  for (const gallery of expected) {
    await page.goto(gallery.route);
    const figures = page.locator('.event-photos [data-photo-index]');
    const indexes = await figures.evaluateAll((items) =>
      items.map((item) => Number(item.getAttribute('data-photo-index'))),
    );
    expect(indexes).toEqual(gallery.indexes);
    seen.push(...indexes);
    await figures.locator('img').evaluateAll(async (images) => {
      await Promise.all(
        images.map(async (element) => {
          const image = element as HTMLImageElement;
          image.loading = 'eager';
          await image.decode();
        }),
      );
    });
    expect(
      await figures
        .locator('img')
        .evaluateAll((images) =>
          images.every((image) => (image as HTMLImageElement).naturalWidth > 0),
        ),
    ).toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
  }
  expect([...seen].sort((a, b) => a - b)).toEqual(Array.from({ length: 37 }, (_, i) => i + 1));
});

test('masked event photos include sticker attribution without overlay layers', async ({ page }) => {
  for (const route of ['/events/weddings/', '/events/baby-bridal-showers/']) {
    await page.goto(route);
    await expect(
      page.locator('.event-photos__credit').getByRole('link', { name: 'Twemoji' }),
    ).toHaveAttribute('href', 'https://github.com/jdecked/twemoji');
    await expect(page.locator('.event-photos__item img')).toHaveCount(
      route.includes('weddings') ? 24 : 4,
    );
    // Masks are part of the image pixels, so hiding an HTML layer cannot reveal a face.
    await expect(page.locator('.event-photos__item > :not(img):not(figcaption)')).toHaveCount(0);
  }
});
