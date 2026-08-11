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

      const retiredStockSources = await page
        .locator('img, source, video')
        .evaluateAll((elements) =>
          elements
            .flatMap((element) =>
              element.closest('[data-home-hero-media]')
                ? []
                : [
                    element.getAttribute('src') ?? '',
                    element.getAttribute('srcset') ?? '',
                    element.getAttribute('poster') ?? '',
                    ...Object.values((element as HTMLElement).dataset).filter(
                      (value): value is string => Boolean(value),
                    ),
                  ],
            )
            .filter((source) =>
              /(?:hero-desktop|weddings|birthdays|kids-parties|corporate|planning-detail|network|venue|og-default)[._/-]/i.test(
                source,
              ),
            ),
        );
      expect(retiredStockSources, `${route} retired stock media`).toEqual([]);

      const copyWithDashes = await page.evaluate(() => {
        const values = [
          document.title,
          document.body.innerText,
          document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
          ...Array.from(document.querySelectorAll('img[alt], [aria-label]')).flatMap((element) => [
            element.getAttribute('alt') ?? '',
            element.getAttribute('aria-label') ?? '',
          ]),
        ];
        const dashPattern = /[—–]|[A-Za-z]-[A-Za-z]/;
        return values.filter((value) => dashPattern.test(value));
      });
      expect(copyWithDashes, `${route} customer copy with dash punctuation`).toEqual([]);

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

  test('About presents the approved host promise and business pillars', async ({ page }) => {
    await page.goto('/about/');

    await expect(page.locator('.page-hero__summary')).toContainText(
      'That lets your event feel beautifully effortless, so you can be a guest at your own celebration.',
    );
    await expect(
      page.getByRole('heading', {
        level: 3,
        name: 'Planning Made Simple. Celebrations Made Beautiful.',
      }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { level: 3, name: 'Every Detail. Every Time' }),
    ).toBeVisible();

    const values = page.locator('[data-about-values]');
    await expect(
      values.getByRole('heading', { level: 2, name: 'Coordinate. Connect. Celebrate.' }),
    ).toBeVisible();
    await expect(values).toContainText('At OCEM, we create spaces where celebrations begin.');
    await expect(values).toContainText('OCEM, your trusted place for:');
    await expect(
      values.getByRole('list', { name: 'What hosts can find at OCEM' }).getByRole('listitem'),
    ).toHaveText([
      'Hiring a coordinator',
      'Finding vetted vendors',
      'Learning how to plan an event',
      'Discovering inspiration, trends, and a look behind the scenes',
    ]);
    await expect(values).toContainText(
      'That belief shapes our vision: to become a trusted destination',
    );
    await expect(values).toContainText(
      'To move that vision forward, our mission is to connect people with vetted event professionals',
    );
    await expect(values).toContainText(
      'Together, those pillars make exceptional events more accessible',
    );
    await expect(values).toContainText('Brand Promise');
    await expect(values).toContainText(
      'That support meets you wherever you are: whether you need a coordinator',
    );
    await expect(page.locator('.about-transition[aria-hidden="true"]')).toHaveCount(2);
    await expect(page.locator('.about-transition__squiggle')).toHaveCount(0);
    await expect(
      page.getByRole('heading', { level: 2, name: 'Beautiful Moments Begin Here' }),
    ).toBeVisible();
    await expect(page.locator('main')).not.toContainText('Make the Occasion Unmistakably Yours.');
    await expect(page.locator('main')).not.toContainText('One direction, from idea to event day.');
    await expect(page.locator('main')).not.toContainText('drusted vendor');
  });

  test('About motion reveals once and yields to reduced motion', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical motion check');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/about/');

    await expect(page.locator('body')).toHaveAttribute('data-about-motion', 'ready');
    const valuesHeader = page.locator('.about-values__header');
    await valuesHeader.scrollIntoViewIfNeeded();
    await expect(valuesHeader).toHaveAttribute('data-about-reveal', 'visible');

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('body')).not.toHaveAttribute('data-about-motion', 'ready');
    await expect(
      page.locator('[data-about-reveal]:not([data-about-reveal="visible"])'),
    ).toHaveCount(0);
  });

  test('About keeps panel copy evenly inset across responsive widths', async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'One canonical responsive sweep');
    await page.goto('/about/');

    for (const width of [320, 360, 390, 430, 767, 768, 820, 1024, 1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: width <= 430 ? 844 : 900 });

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${width}px horizontal overflow`).toBeLessThanOrEqual(1);

      const transitions = await page.locator('.about-transition').evaluateAll((elements) =>
        elements.map((element) => {
          const rect = element.getBoundingClientRect();
          return { left: rect.left, right: rect.right };
        }),
      );
      for (const transition of transitions) {
        expect(Math.abs(transition.left), `${width}px transition left edge`).toBeLessThanOrEqual(1);
        expect(
          Math.abs(transition.right - width),
          `${width}px transition right edge`,
        ).toBeLessThanOrEqual(1);
      }

      const transitionShapes = await page
        .locator('.about-transition')
        .evaluateAll((elements) =>
          elements.map((element) => getComputedStyle(element, '::before').clipPath),
        );
      expect(transitionShapes, `${width}px distinct transition shapes`).toHaveLength(2);
      expect(transitionShapes.every((shape) => shape !== 'none')).toBe(true);
      expect(new Set(transitionShapes).size, `${width}px transition shape variety`).toBe(2);

      const panelSpacing = await page
        .locator('.about-values__statement, .about-values__trusted-place')
        .evaluateAll((panels) =>
          panels.map((panel) => {
            const style = getComputedStyle(panel);
            return {
              left: Number.parseFloat(style.paddingLeft),
              right: Number.parseFloat(style.paddingRight),
              top: Number.parseFloat(style.paddingTop),
              bottom: Number.parseFloat(style.paddingBottom),
            };
          }),
        );

      for (const spacing of panelSpacing) {
        expect(spacing.left, `${width}px panel left inset`).toBeGreaterThanOrEqual(20);
        expect(spacing.right, `${width}px panel right inset`).toBeGreaterThanOrEqual(20);
        expect(Math.abs(spacing.left - spacing.right), `${width}px horizontal inset balance`).toBe(
          0,
        );
        expect(Math.abs(spacing.top - spacing.bottom), `${width}px vertical inset balance`).toBe(0);
      }

      const valuesHeadingLines = await page.locator('.about-values__title').evaluate((heading) => {
        const range = document.createRange();
        range.selectNodeContents(heading);
        return range.getClientRects().length;
      });
      expect(valuesHeadingLines, `${width}px values heading wrap`).toBeLessThanOrEqual(3);
    }
  });

  test('maps Search Console opportunity clusters to distinct landing pages', async ({ page }) => {
    const targets = [
      {
        route: '/',
        title: 'Orange County Event Planner and Designer | The OC Events Market',
        h1: 'Orange County Event Planning, Beautifully Run',
      },
      {
        route: '/services/',
        title: 'Event Planning Services in Orange County | The OC Events Market',
        h1: 'Event Planning Services in Orange County',
      },
      {
        route: '/events/weddings/',
        title: 'Wedding Planner in Orange County | The OC Events Market',
        h1: 'Wedding Planner in Orange County',
        serviceType: 'Wedding planning and design',
      },
      {
        route: '/events/birthdays-milestones/',
        title: 'Party Planner in Orange County | The OC Events Market',
        h1: 'Orange County Party Planner for Birthdays and Milestones',
        serviceType: 'Birthday party and milestone event planning',
      },
      {
        route: '/events/corporate-brand-events/',
        title: 'Corporate Event Planner in Orange County | The OC Events Market',
        h1: 'Corporate Event Planner in Orange County',
        serviceType: 'Corporate and brand event planning',
      },
    ] as const;

    for (const target of targets) {
      await page.goto(target.route);
      await expect(page).toHaveTitle(target.title);
      await expect(page.getByRole('heading', { level: 1, name: target.h1 })).toBeVisible();

      if ('serviceType' in target) {
        const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
        const service = schemas
          .map((schema) => JSON.parse(schema))
          .find((schema) =>
            Array.isArray(schema['@type'])
              ? schema['@type'].includes('Service')
              : schema['@type'] === 'Service',
          );
        expect(service?.serviceType).toBe(target.serviceType);
      }
    }
  });

  test('unknown route returns an actual 404', async ({ request }) => {
    const response = await request.get('/this-route-does-not-exist/');
    expect(response.status()).toBe(404);
  });

  test('the removed process page redirects without leaving dedicated content behind', async ({
    page,
  }) => {
    await page.goto('/process/');
    await expect(page).toHaveURL(/\/services\/$/);

    await page.goto('/');
    await expect(page.locator('a[href="/process/"]')).toHaveCount(0);
    await expect(page.locator('.process-rail, .process-stack')).toHaveCount(0);
  });

  test('robots, llms.txt, sitemap, RSS, redirects, and sitemap exclusions are correct', async ({
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
    expect(sitemapText).not.toContain('/process/');

    const llms = await request.get('/llms.txt');
    expect(llms.status()).toBe(200);
    expect(llms.headers()['content-type']).toContain('text/plain');
    const llmsText = await llms.text();
    expect(llmsText).toMatch(/^# The OC Events Market\n\n>/);
    expect(llmsText).toContain('https://theoceventsmarket.com/events/weddings/');
    expect(llmsText).toContain('https://theoceventsmarket.com/events/corporate-brand-events/');
    expect(llmsText).toContain('https://theoceventsmarket.com/contact/');
    expect(llmsText).not.toContain('/services/full-service-planning-design/');
    expect(llmsText).not.toContain('/privacy/');
    expect(llmsText).not.toContain('/process/');

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
      { path: '/', maxHeight: mobile ? 7_600 : 6_250 },
      { path: '/services/', maxHeight: mobile ? 5_600 : 4_200 },
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
      'Mint green cake pops finished with yellow ducks and pearl sprinkles',
    );
    await expect(networkImage).toHaveAttribute('srcset', / 400w(?:,|$)/);
    await expect(networkImage).toHaveAttribute('srcset', / 660w(?:,|$)/);
    await expect(networkImage).toHaveAttribute('srcset', / 744w(?:,|$)/);
    await expect(networkImage).toHaveAttribute(
      'sizes',
      '(max-width: 767px) calc(100vw - 2.5rem), 42vw',
    );

    const actualImage = page.getByAltText(
      'Four dessert favor presentations with mini cakes and decorated cake pops in blush packaging',
    );
    await expect(actualImage).toHaveAttribute('srcset', / 480w(?:,|$)/);
    await expect(actualImage).toHaveAttribute('srcset', / 960w(?:,|$)/);
    await expect(actualImage).toHaveAttribute(
      'sizes',
      '(max-width: 767px) calc(100vw - 2.5rem), (max-width: 1199px) 48vw, 38vw',
    );
    const actualMobileSource = page
      .locator('.event-gateway__item')
      .first()
      .locator('source[type="image/avif"]');
    await expect(actualMobileSource).toHaveAttribute('srcset', / 480w(?:,|$)/);
    await expect(actualMobileSource).toHaveAttribute('srcset', / 960w(?:,|$)/);
    await expect(actualMobileSource).toHaveAttribute('sizes', 'calc(100vw - 2.5rem)');

    const milestoneImage = page.getByAltText(
      'Black, gold, and silver balloons frame a round black backdrop with gold number 50 balloons',
    );
    await expect(milestoneImage).toHaveAttribute('srcset', / 480w(?:,|$)/);
    await expect(milestoneImage).toHaveAttribute('srcset', / 900w(?:,|$)/);
    await expect(milestoneImage).toHaveAttribute(
      'sizes',
      '(max-width: 367px) calc(100vw - 2.5rem), (max-width: 767px) calc((100vw - 3.35rem) / 2), (max-width: 1199px) 48vw, 38vw',
    );
    const milestoneMobileSource = page
      .locator('.event-gateway__item')
      .nth(2)
      .locator('source[type="image/avif"]');
    await expect(milestoneMobileSource).toHaveAttribute('srcset', / 240w(?:,|$)/);
    await expect(milestoneMobileSource).toHaveAttribute('srcset', / 360w(?:,|$)/);
    await expect(milestoneMobileSource).toHaveAttribute(
      'sizes',
      '(max-width: 367px) calc(100vw - 2.5rem), calc((100vw - 3.35rem) / 2)',
    );

    await page.goto('/events/weddings/');
    const mobileHeroSource = page.locator(
      '.page-hero source[type="image/avif"][media="(max-width: 767px)"]',
    );
    await expect(mobileHeroSource).toHaveAttribute('srcset', / 480w(?:,|$)/);
    await expect(mobileHeroSource).toHaveAttribute('srcset', / 960w(?:,|$)/);
    await expect(mobileHeroSource).toHaveAttribute('sizes', '100vw');
  });

  test('presents a planner-led service instead of a marketplace', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Orange County Event Planning, Beautifully Run',
      }),
    ).toBeVisible();
    await expect(page.locator('.home-hero__proof')).toHaveText(
      'Creative vision. Calm execution. One accountable planner.',
    );
    await expect(page.locator('main')).not.toContainText(/planning team|marketplace|directory/i);

    await page.goto('/trusted-creative-network/');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Great Events Need More Than Great Vendors',
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

  test('skip link moves focus to main content', async ({ page, browserName }) => {
    await page.goto('/');
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });
});
