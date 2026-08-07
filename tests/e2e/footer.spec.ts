import { expect, test } from '@playwright/test';

test('pre-footer banner displays only the Romans 10:9 reference', async ({ page }) => {
  await page.goto('/');

  const banner = page.locator('.verse-banner');
  await expect(banner).toHaveText('Romans 10:9');
  await expect(banner.locator('blockquote, cite, svg')).toHaveCount(0);
  await expect(page.locator('footer')).not.toContainText('you will be saved');
  expect(
    await banner.evaluate((element) => element.nextElementSibling?.matches('footer.site-footer')),
  ).toBe(true);
});

test('planner responsibilities use decorative icons on every capability index', async ({
  page,
}) => {
  for (const { route, heading } of [
    { route: '/', heading: 'h4' },
    { route: '/services/', heading: 'h3' },
  ] as const) {
    await page.goto(route);

    const capabilities = page.locator('.capability-index__item');
    await expect(capabilities).toHaveCount(6);
    await expect(
      capabilities.locator('.capability-index__icon[aria-hidden="true"] svg'),
    ).toHaveCount(6);
    await expect(capabilities.locator(heading)).toHaveCount(6);
  }
});

test('footer links use decorative icons without changing names', async ({ page }) => {
  await page.goto('/');

  const footer = page.locator('footer');
  const footerLinks = footer.locator('a');
  expect(await footerLinks.count()).toBeGreaterThan(0);
  await expect(footerLinks.locator('svg[aria-hidden="true"]')).toHaveCount(
    await footerLinks.count(),
  );

  await expect(footer.getByRole('link', { name: 'Services', exact: true })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'Begin Planning', exact: true })).toBeVisible();
});
