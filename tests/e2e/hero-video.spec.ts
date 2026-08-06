import { expect, test } from '@playwright/test';

const heroVideos = {
  desktop: {
    path: '/videos/actual/actual-dessert-finishing-v1.mp4',
    width: 576,
    height: 480,
  },
  mobile: {
    path: '/videos/actual/actual-ivone-event-details-v1.mp4',
    width: 576,
    height: 768,
  },
} as const;

test.describe('home hero video playback', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  test('uses a silent inline responsive source and presents a decoded frame', async ({
    page,
    viewport,
  }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const root = page.locator('[data-home-hero-media]');
    const video = page.locator('[data-home-hero-video]');
    await expect(video).toHaveAttribute('autoplay', '');
    await expect(video).toHaveAttribute('muted', '');
    await expect(video).toHaveAttribute('loop', '');
    await expect(video).toHaveAttribute('playsinline', '');
    await expect(video).not.toHaveAttribute('controls', /.+/);
    await expect(root).toHaveAttribute('data-video-state', 'playing', { timeout: 15_000 });

    const expectedVariant = (viewport?.width ?? 1440) <= 767 ? 'mobile' : 'desktop';
    const expectedVideo = heroVideos[expectedVariant];
    await expect(root).toHaveAttribute('data-video-variant', expectedVariant);
    const playback = await video.evaluate((element: HTMLVideoElement) => ({
      currentSrc: element.currentSrc,
      currentTime: element.currentTime,
      muted: element.muted,
      paused: element.paused,
      playsInline: element.playsInline,
      readyState: element.readyState,
      videoHeight: element.videoHeight,
      videoWidth: element.videoWidth,
    }));

    expect(playback.currentSrc).toContain(expectedVideo.path);
    expect(playback.currentTime).toBeGreaterThanOrEqual(0);
    expect(playback.muted).toBe(true);
    expect(playback.paused).toBe(false);
    expect(playback.playsInline).toBe(true);
    expect(playback.readyState).toBeGreaterThanOrEqual(2);
    expect(playback.videoWidth).toBe(expectedVideo.width);
    expect(playback.videoHeight).toBe(expectedVideo.height);
  });

  test('pauses offscreen and resumes after returning to the hero', async ({
    page,
    browserName,
  }, testInfo) => {
    test.skip(
      !(
        testInfo.project.name === 'chromium-desktop' ||
        (browserName === 'webkit' && testInfo.project.name === 'webkit-mobile')
      ),
      'Representative Chromium and mobile WebKit lifecycle coverage',
    );

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const root = page.locator('[data-home-hero-media]');
    const video = page.locator('[data-home-hero-video]');
    await expect(root).toHaveAttribute('data-video-state', 'playing', { timeout: 15_000 });

    await page.locator('.final-cta').scrollIntoViewIfNeeded();
    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
      .toBe(true);

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(root).toHaveAttribute('data-video-state', 'playing', { timeout: 15_000 });
    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
      .toBe(false);

    await page.evaluate(() => {
      window.dispatchEvent(new Event('pagehide'));
      window.dispatchEvent(new Event('pageshow'));
    });
    await expect(root).toHaveAttribute('data-video-state', 'playing', { timeout: 15_000 });
  });
});

test('reduced motion keeps the responsive poster and does not request video', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical network assertion');

  const videoRequests: string[] = [];
  page.on('request', (request) => {
    if (/\.(mp4|webm)(?:\?|$)/.test(request.url())) videoRequests.push(request.url());
  });

  await page.goto('/', { waitUntil: 'networkidle' });
  const root = page.locator('[data-home-hero-media]');
  const video = page.locator('[data-home-hero-video]');
  await expect(root).toHaveAttribute('data-video-state', 'reduced-motion');
  await expect(video).not.toHaveAttribute('src', /.+/);
  await expect(page.locator('.home-hero__poster img')).toBeVisible();
  expect(videoRequests).toEqual([]);
});

test.describe('save-data fallback', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  test('keeps the poster and does not request video', async ({ context, page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical network assertion');
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'connection', {
        configurable: true,
        value: { saveData: true },
      });
    });

    const videoRequests: string[] = [];
    page.on('request', (request) => {
      if (/\.(mp4|webm)(?:\?|$)/.test(request.url())) videoRequests.push(request.url());
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-home-hero-media]')).toHaveAttribute(
      'data-video-state',
      'save-data',
    );
    await expect(page.locator('[data-home-hero-video]')).not.toHaveAttribute('src', /.+/);
    expect(videoRequests).toEqual([]);
  });
});

test.describe('autoplay rejection fallback', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  test('retains the poster when the browser rejects play()', async ({
    context,
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical rejection assertion');
    await context.addInitScript(() => {
      HTMLMediaElement.prototype.play = () =>
        Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'));
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('[data-home-hero-media]')).toHaveAttribute(
      'data-video-state',
      'poster',
    );
    await expect(page.locator('.home-hero__poster img')).toBeVisible();
  });
});

test('hero media provides immutable byte-range delivery', async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical response assertion');

  const full = await request.get(heroVideos.desktop.path);
  expect(full.status()).toBe(200);
  expect(full.headers()['content-type']).toContain('video/mp4');
  expect(full.headers()['cache-control']).toContain('immutable');
  expect(full.headers()['accept-ranges']).toBe('bytes');

  const range = await request.get(heroVideos.desktop.path, { headers: { Range: 'bytes=0-15' } });
  expect(range.status()).toBe(206);
  expect(range.headers()['content-range']).toMatch(/^bytes 0-15\/\d+$/);
  expect((await range.body()).byteLength).toBe(16);

  const suffix = await request.get(heroVideos.desktop.path, { headers: { Range: 'bytes=-16' } });
  expect(suffix.status()).toBe(206);
  expect(suffix.headers()['content-range']).toMatch(/^bytes \d+-\d+\/\d+$/);
  expect((await suffix.body()).byteLength).toBe(16);

  const invalid = await request.get(heroVideos.desktop.path, {
    headers: { Range: 'bytes=999999999-' },
  });
  expect(invalid.status()).toBe(416);
  expect(invalid.headers()['content-range']).toMatch(/^bytes \*\/\d+$/);
});
