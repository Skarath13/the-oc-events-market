import { expect, test } from '@playwright/test';

test('footer displays Romans 10:9', async ({ page }) => {
  await page.goto('/');

  const verse = page.locator('footer blockquote[cite="https://ebible.org/eng-web/ROM10.htm"]');
  await expect(verse).toContainText(
    'that if you will confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved.',
  );
  await expect(verse.locator('cite')).toHaveText('Romans 10:9');
  await expect(verse.locator('.site-footer__verse-icon[aria-hidden="true"] svg')).toHaveCount(1);
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
  await expect(footer.getByRole('link', { name: 'Check availability', exact: true })).toBeVisible();
});
