import { expect, test } from '@playwright/test';

const actualVideos = {
  ivone: {
    path: '/videos/actual/actual-ivone-event-details-v1.mp4',
    width: 576,
    height: 768,
    caption: 'Ivone arranges sweets at an outdoor event display.',
  },
  dessert: {
    path: '/videos/actual/actual-dessert-finishing-v1.mp4',
    width: 576,
    height: 480,
    caption: 'A dessert detail finished by hand.',
  },
} as const;

test.describe('actual event media playback', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  test('loads near the viewport, plays silently, and honors its pause control', async ({
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
      const toggle = root.locator('[data-actual-video-toggle]');
      await root.scrollIntoViewIfNeeded();
      await expect(root).toHaveAttribute('data-video-state', 'playing', { timeout: 15_000 });

      await expect(video).toHaveAttribute('autoplay', '');
      await expect(video).toHaveAttribute('muted', '');
      await expect(video).toHaveAttribute('loop', '');
      await expect(video).toHaveAttribute('playsinline', '');
      await expect(video).not.toHaveAttribute('controls', /.+/);
      await expect(toggle).toBeVisible();
      await expect(root.locator('figcaption')).toHaveText(expected.caption);

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

      await toggle.click();
      await expect(root).toHaveAttribute('data-video-state', 'paused');
      await expect(toggle).toHaveText('Play clip');
      await expect
        .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
        .toBe(true);

      await toggle.click();
      await expect(root).toHaveAttribute('data-video-state', 'playing');
      await expect(toggle).toHaveText('Pause clip');
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
    await expect(root.locator('[data-actual-video-toggle]')).toBeHidden();
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
