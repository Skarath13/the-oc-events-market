import { expect, test } from '@playwright/test';
import { publicRoutes } from '../helpers/routes';

test.describe('site contracts', () => {
  for (const route of publicRoutes) {
    test(`${route} has valid structure and metadata`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), route).toBe(200);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('nav[aria-label="Breadcrumb"]')).toHaveCount(0);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        /^https:\/\/the-oc-events-market\.example\/.+|^https:\/\/the-oc-events-market\.example\/$/,
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${route} horizontal overflow`).toBeLessThanOrEqual(1);

      const imageAltValues = await page
        .locator('img')
        .evaluateAll((images) => images.map((image) => image.getAttribute('alt')));
      expect(
        imageAltValues.every((alt) => alt !== null),
        `${route} image alt`,
      ).toBe(true);

      const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents();
      for (const value of jsonLd) expect(() => JSON.parse(value)).not.toThrow();
    });
  }

  test('draft content does not generate public routes', async ({ request }) => {
    const [celebration, journal] = await Promise.all([
      request.get('/celebrations/internal-structure-preview/'),
      request.get('/journal/use-your-own-vendors/'),
    ]);
    expect(celebration.status()).toBe(404);
    expect(journal.status()).toBe(404);
  });

  test('unknown route returns an actual 404', async ({ request }) => {
    const response = await request.get('/this-route-does-not-exist/');
    expect(response.status()).toBe(404);
  });

  test('robots, sitemap, RSS, redirects, and sitemap exclusions are correct', async ({
    page,
    request,
  }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain('Disallow: /');

    const sitemap = await request.get('/sitemap-index.xml');
    expect(sitemap.status()).toBe(200);
    const sitemapText = await sitemap.text();
    expect(sitemapText).not.toContain('full-service-planning-design');
    expect(sitemapText).not.toContain('/journal/');
    expect(sitemapText).not.toContain('/privacy/');

    const rss = await request.get('/rss.xml');
    expect(rss.status()).toBe(200);
    expect(rss.headers()['content-type']).toContain('xml');

    await page.goto('/portfolio/');
    await expect(page).toHaveURL(/\/celebrations\/$/);
    await page.goto('/events/showers/');
    await expect(page).toHaveURL(/\/events\/baby-bridal-showers\/$/);
  });
});

test.describe('navigation interactions', () => {
  test('mobile menu opens, closes with Escape, and restores focus', async ({ page, viewport }) => {
    test.skip(!viewport || viewport.width > 767, 'Mobile interaction');
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Menu' });
    await trigger.focus();
    await trigger.press('Enter');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /Close/ })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test('process steps use only the designed sequence markers', async ({ page }) => {
    await page.goto('/');
    const listStyle = await page
      .locator('.process-rail')
      .evaluate((element) => getComputedStyle(element).listStyleType);
    expect(listStyle).toBe('none');
  });

  test('skip link moves focus to main content', async ({ page, browserName }) => {
    await page.goto('/');
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });
});
