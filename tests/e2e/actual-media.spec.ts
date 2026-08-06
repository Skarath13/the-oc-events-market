import { expect, test } from '@playwright/test';

const actualVideos = {
  ivone: {
    path: '/videos/actual/actual-ivone-event-details-v1.mp4',
    width: 576,
    height: 768,
    caption: 'A hands-on moment before guests arrive.',
  },
  dessert: {
    path: '/videos/actual/actual-dessert-finishing-v1.mp4',
    width: 576,
    height: 480,
    caption: 'The finishing touch, right on cue.',
  },
} as const;

test.describe('actual event media playback', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  test('loads near the viewport, plays silently, and toggles from the clean media surface', async ({
    page,
  }, testInfo) => {
    test.skip(
      !['chromium-desktop', 'webkit-mobile'].includes(testInfo.project.name),
      'Representative desktop Chromium and mobile WebKit coverage',
    );

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    for (const [id, expected] of Object.entries(actualVideos)) {
      const root = page.locator(`[data-actual-video="${id}"]`);
      const video = root.locator('[data-actual-video-element]');
      await root.scrollIntoViewIfNeeded();
      await expect(root).toHaveAttribute('data-video-state', 'playing', { timeout: 15_000 });

      await expect(video).toHaveAttribute('autoplay', '');
      await expect(video).toHaveAttribute('muted', '');
      await expect(video).toHaveAttribute('loop', '');
      await expect(video).toHaveAttribute('playsinline', '');
      expect(await video.getAttribute('controls')).toBeNull();
      expect(await video.evaluate((element: HTMLVideoElement) => element.controls)).toBe(false);
      await expect(root.locator('button')).toHaveCount(0);
      await expect(root).toHaveAttribute('role', 'button');
      await expect(root).toHaveAttribute('tabindex', '0');
      await expect(root.locator('.event-gateway__caption')).toHaveText(expected.caption);
      await expect(root).toHaveAttribute(
        'aria-label',
        `Pause motion: ${id === 'ivone' ? 'Ivone arranging an outdoor sweets display' : 'dessert finishing detail'}`,
      );

      const playback = await video.evaluate((element: HTMLVideoElement) => ({
        currentSrc: element.currentSrc,
        muted: element.muted,
        paused: element.paused,
        playsInline: element.playsInline,
        readyState: element.readyState,
        videoHeight: element.videoHeight,
        videoWidth: element.videoWidth,
      }));
      expect(playback.currentSrc).toContain(expected.path);
      expect(playback.muted).toBe(true);
      expect(playback.paused).toBe(false);
      expect(playback.playsInline).toBe(true);
      expect(playback.readyState).toBeGreaterThanOrEqual(2);
      expect(playback.videoWidth).toBe(expected.width);
      expect(playback.videoHeight).toBe(expected.height);

      await root.click({ position: { x: 20, y: 20 } });
      await expect(root).toHaveAttribute('data-video-state', 'paused');
      await expect(root).toHaveAttribute('aria-label', /^Play motion:/);
      await expect
        .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
        .toBe(true);

      await root.focus();
      await expect(root).toBeFocused();
      await root.press('Space');
      await expect(root).toHaveAttribute('data-video-state', 'playing');
      await expect(root).toHaveAttribute('aria-label', /^Pause motion:/);
    }
  });

  test('pauses offscreen and resumes when the detail returns', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical lifecycle check');

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const root = page.locator('[data-actual-video="dessert"]');
    const video = root.locator('[data-actual-video-element]');
    await root.scrollIntoViewIfNeeded();
    await expect(root).toHaveAttribute('data-video-state', 'playing', { timeout: 15_000 });

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
      .toBe(true);

    await root.scrollIntoViewIfNeeded();
    await expect(root).toHaveAttribute('data-video-state', 'playing', { timeout: 15_000 });
    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
      .toBe(false);
  });
});

test('celebration media stays large on mobile and resolves into an editorial desktop grid', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical layout contract');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const cards = page.locator('.event-gateway__item');
  await expect(cards).toHaveCount(5);
  const firstCard = await cards.first().boundingBox();
  const milestoneMedia = await cards.nth(2).locator('.event-gateway__media').boundingBox();
  expect(firstCard?.width ?? 0).toBeGreaterThanOrEqual(345);
  expect((milestoneMedia?.height ?? 0) / (milestoneMedia?.width ?? 1)).toBeGreaterThan(1.3);
  await expect(cards.first().locator('img')).toHaveCSS('object-fit', 'contain');
  await expect(page.locator('[data-actual-video] button')).toHaveCount(0);
  await expect(page.locator('video[controls]')).toHaveCount(0);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload({ waitUntil: 'domcontentloaded' });
  const desktopBoxes = await cards.evaluateAll((items) =>
    items.map((item) => {
      const box = item.getBoundingClientRect();
      return { width: box.width, y: box.y };
    }),
  );
  expect(Math.abs(desktopBoxes[0]!.y - desktopBoxes[1]!.y)).toBeLessThanOrEqual(1);
  expect(Math.abs(desktopBoxes[2]!.y - desktopBoxes[4]!.y)).toBeLessThanOrEqual(1);
  expect(desktopBoxes[0]!.width).toBeGreaterThan(desktopBoxes[2]!.width);
});

test('reduced motion keeps the actual-work poster and makes no video request', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical network assertion');

  const requests: string[] = [];
  page.on('request', (request) => {
    if (Object.values(actualVideos).some((video) => request.url().includes(video.path))) {
      requests.push(request.url());
    }
  });

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  for (const id of Object.keys(actualVideos)) {
    const root = page.locator(`[data-actual-video="${id}"]`);
    await root.scrollIntoViewIfNeeded();
    await expect(root).toHaveAttribute('data-video-state', 'reduced-motion');
    await expect(root.locator('[data-actual-video-element]')).not.toHaveAttribute('src', /.+/);
    await expect(root).not.toHaveAttribute('role', 'button');
    await expect(root).not.toHaveAttribute('tabindex', /.+/);
    await expect(root).not.toHaveAttribute('aria-label', /.+/);
    await expect(root).not.toHaveAttribute('aria-pressed', /.+/);
    await expect(root.locator('button')).toHaveCount(0);
  }
  expect(requests).toEqual([]);
});

test.describe('actual event media Save-Data fallback', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  test('keeps the poster and makes no video request', async ({ context, page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical network assertion');
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', {
        configurable: true,
        value: { saveData: true },
      });
    });

    const requests: string[] = [];
    page.on('request', (request) => {
      if (Object.values(actualVideos).some((video) => request.url().includes(video.path))) {
        requests.push(request.url());
      }
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    for (const id of Object.keys(actualVideos)) {
      const root = page.locator(`[data-actual-video="${id}"]`);
      await root.scrollIntoViewIfNeeded();
      await expect(root).toHaveAttribute('data-video-state', 'save-data');
      await expect(root.locator('[data-actual-video-element]')).not.toHaveAttribute('src', /.+/);
      await expect(root).not.toHaveAttribute('role', 'button');
      await expect(root).not.toHaveAttribute('tabindex', /.+/);
      await expect(root).not.toHaveAttribute('aria-label', /.+/);
    }
    expect(requests).toEqual([]);
  });
});

test('actual event video provides immutable byte-range delivery', async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical response assertion');

  for (const video of Object.values(actualVideos)) {
    const full = await request.get(video.path);
    expect(full.status()).toBe(200);
    expect(full.headers()['content-type']).toContain('video/mp4');
    expect(full.headers()['cache-control']).toContain('immutable');
    expect(full.headers()['accept-ranges']).toBe('bytes');

    const range = await request.get(video.path, { headers: { Range: 'bytes=0-15' } });
    expect(range.status()).toBe(206);
    expect(range.headers()['content-range']).toMatch(/^bytes 0-15\/\d+$/);
    expect((await range.body()).byteLength).toBe(16);
  }
});
