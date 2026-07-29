import { expect, test } from '@playwright/test';
import { indexableRoutes, publicRoutes } from '../helpers/routes';

test.describe('site contracts', () => {
  for (const route of publicRoutes) {
    test(`${route} has valid structure and metadata`, async ({ page, viewport }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), route).toBe(200);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('nav[aria-label="Breadcrumb"]')).toHaveCount(0);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        /^https:\/\/theoceventsmarket\.com\/.+|^https:\/\/theoceventsmarket\.com\/$/,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        indexableRoutes.includes(route as (typeof indexableRoutes)[number])
          ? 'index, follow'
          : 'noindex, nofollow',
      );
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${route} horizontal overflow`).toBeLessThanOrEqual(1);

      const headingLineCounts = await page.locator('main h1, main h2').evaluateAll((headings) =>
        headings.map((heading) => {
          const range = document.createRange();
          range.selectNodeContents(heading);
          return {
            text: heading.textContent?.trim(),
            lines: range.getClientRects().length,
          };
        }),
      );
      expect(
        headingLineCounts.every(({ lines }) => lines <= 3),
        `${route} heading wrapping: ${JSON.stringify(headingLineCounts)}`,
      ).toBe(true);

      if (viewport && viewport.width <= 767) {
        const headingWidths = await page
          .locator(
            [
              '.section-heading h2',
              '.clarification__copy h2',
              '.network-statement h2',
              '.network-brief h2',
              '.final-cta h2',
              '.page-hero h1',
              '.detail-intro h2',
              '.detail-overview__fit h2',
              '.detail-overview__scope h2',
              '.detail-method h2',
              '.detail-answers h2',
              '.related-strip h2',
              '.vendor-flex h2',
              '.service-scope__intro h2',
              '.profile-panel__copy h2',
              '.network-page h2',
              '.simple-hero h1',
              '.journal-page h1',
              '.journal-page h2',
              '.contact-layout__intro h1',
              '.text-contact__copy h2',
            ].join(', '),
          )
          .evaluateAll((headings) =>
            headings.map((heading) => {
              const parent = heading.parentElement;
              if (!parent) return { text: heading.textContent?.trim(), ratio: 1 };
              const parentStyle = getComputedStyle(parent);
              const parentContentWidth =
                parent.getBoundingClientRect().width -
                Number.parseFloat(parentStyle.paddingLeft) -
                Number.parseFloat(parentStyle.paddingRight);
              return {
                text: heading.textContent?.trim(),
                ratio: heading.getBoundingClientRect().width / parentContentWidth,
              };
            }),
          );
        expect(
          headingWidths.every(({ ratio }) => ratio >= 0.95),
          `${route} mobile heading width: ${JSON.stringify(headingWidths)}`,
        ).toBe(true);
      }

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
    expect(await robots.text()).toContain('Allow: /');
    expect(await robots.text()).not.toContain('Disallow: /');

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
  test('representative pages stay within the responsive density budget', async ({
    page,
    viewport,
  }, testInfo) => {
    test.skip(
      !['chromium-desktop', 'chromium-mobile'].includes(testInfo.project.name),
      'Canonical responsive density check',
    );

    const mobile = Boolean(viewport && viewport.width <= 767);
    const routes = [
      { path: '/', maxHeight: mobile ? 6_300 : 4_300 },
      { path: '/services/', maxHeight: mobile ? 4_400 : 3_300 },
      {
        path: '/services/full-service-planning-design/',
        maxHeight: mobile ? 6_200 : 4_200,
      },
    ];

    for (const route of routes) {
      await page.goto(route.path);
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      expect(pageHeight, `${route.path} page height`).toBeLessThanOrEqual(route.maxHeight);
    }

    await page.goto('/');
    const networkImage = page.getByAltText(
      'Intimate outdoor dining area set among deep green plants',
    );
    await expect(networkImage).toHaveAttribute('srcset', / 400w(?:,|$)/);
    await expect(networkImage).toHaveAttribute('srcset', / 660w(?:,|$)/);
    await expect(networkImage).toHaveAttribute('srcset', / 744w(?:,|$)/);
    await expect(networkImage).toHaveAttribute(
      'sizes',
      '(max-width: 767px) calc(100vw - 2.5rem), 42vw',
    );
  });

  test('presents a planner-led service instead of a marketplace', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'A Planner for Every Celebration',
      }),
    ).toBeVisible();
    await expect(page.getByText('Your planner keeps every detail connected')).toBeVisible();
    await expect(page.locator('main')).not.toContainText(/planning team|marketplace|directory/i);

    await page.goto('/trusted-creative-network/');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'One Planner for Every Moving Piece',
      }),
    ).toBeVisible();
    await expect(page.locator('main')).not.toContainText(/marketplace|directory/i);
  });

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
      .locator('.process-stack')
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
