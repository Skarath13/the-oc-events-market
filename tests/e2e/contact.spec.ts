import { expect, test } from '@playwright/test';

const phoneDisplay = '+1 (949) 591-3087';
const smsHref = 'sms:+19495913087';

test.describe('text-only contact @contact', () => {
  test('client contact uses the native messaging app and keeps the number in the footer', async ({
    page,
    viewport,
  }) => {
    await page.goto('/contact/');

    await expect(page.locator('form')).toHaveCount(0);
    await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Text Event Details' }).first()).toHaveAttribute(
      'href',
      smsHref,
    );
    await expect(page.getByText(phoneDisplay, { exact: true })).toHaveCount(1);
    await expect(page.locator('footer').getByText(phoneDisplay, { exact: true })).toHaveCount(1);

    const qr = page.locator('[data-desktop-qr]');
    await expect(qr.locator('svg')).toHaveCount(1);
    if (viewport && viewport.width >= 768) {
      await expect(qr).toBeVisible();
    } else {
      await expect(qr).toBeHidden();
    }
  });

  test('vendor contact is text-only and uses the same private action', async ({
    page,
    viewport,
  }) => {
    await page.goto('/for-vendors/');

    await expect(page.locator('form')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Text a Vendor Introduction' })).toHaveAttribute(
      'href',
      smsHref,
    );
    await expect(page.getByText(phoneDisplay, { exact: true })).toHaveCount(1);

    const qr = page.locator('[data-desktop-qr]');
    if (viewport && viewport.width >= 768) {
      await expect(qr).toBeVisible();
    } else {
      await expect(qr).toBeHidden();
    }
  });

  test('removed form endpoints return 404', async ({ request }) => {
    const [clientEndpoint, vendorEndpoint] = await Promise.all([
      request.post('/api/inquiry/', { form: {} }),
      request.post('/api/vendor-inquiry/', { form: {} }),
    ]);

    expect(clientEndpoint.status()).toBe(404);
    expect(vendorEndpoint.status()).toBe(404);
  });
});
