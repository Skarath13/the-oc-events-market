import { expect, test } from '@playwright/test';

test.describe('client inquiry @forms', () => {
  test('server errors are summarized and values persist', async ({ page }) => {
    await page.goto('/contact/');
    await page.getByRole('button', { name: 'Send My Inquiry' }).click();
    const summary = page.locator('[data-form-summary]');
    await expect(summary).toBeFocused();
    await expect(summary).toContainText('Review the highlighted fields');
    await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');
  });

  test('valid inquiry succeeds only after the server responds', async ({ page }) => {
    await page.goto('/contact/?event=wedding&support=start-to-finish');
    await expect(page.locator('#eventType')).toHaveValue('wedding');
    await page.locator('#dateNotSelected').check();
    await page.locator('#cityVenue').fill('Irvine');
    await page.locator('#guestCount').fill('80');
    await page
      .locator('#description')
      .fill('We are planning a warm outdoor dinner and need help coordinating the event.');
    await page.locator('#name').fill('Test Host');
    await page.locator('#email').fill('host@example.com');
    await page.locator('#preferredContact-email').check();
    await page.locator('#privacyConsent').check();
    await page.getByRole('button', { name: 'Send My Inquiry' }).click();
    const success = page.locator('[data-form-success="client-inquiry"]');
    await expect(success).toBeVisible();
    await expect(success).toBeFocused();
    await expect(success).toContainText('your inquiry was received');
  });

  test('call preference requires a phone number', async ({ page }) => {
    await page.goto('/contact/');
    await page.locator('#eventType').selectOption('birthday-milestone');
    await page.locator('#dateNotSelected').check();
    await page.locator('#planningSupport-not-sure').check();
    await page
      .locator('#description')
      .fill('We are still choosing a venue and need guidance on the planning priorities.');
    await page.locator('#name').fill('Test Host');
    await page.locator('#email').fill('host@example.com');
    await page.locator('#preferredContact-call').check();
    await page.locator('#privacyConsent').check();
    await page.getByRole('button', { name: 'Send My Inquiry' }).click();
    await expect(page.locator('[data-error-for="phone"]')).toContainText('phone number');
    await expect(page.locator('#email')).toHaveValue('host@example.com');
  });
});

test.describe('vendor inquiry @forms', () => {
  test('valid vendor introduction succeeds separately', async ({ page }) => {
    await page.goto('/for-vendors/');
    await page.locator('#businessName').fill('Sample Floral Studio');
    await page.locator('#contactName').fill('Vendor Test');
    await page.locator('#vendorEmail').fill('vendor@example.com');
    await page.locator('#category').fill('Florist');
    await page.locator('#serviceArea').fill('Orange County');
    await page
      .locator('#introduction')
      .fill('We design floral work for social events and collaborate closely with planning teams.');
    await page.locator('#portfolioUrl').fill('https://example.com/portfolio');
    await page.locator('#vendorPrivacyConsent').check();
    await page.getByRole('button', { name: 'Send Introduction' }).click();
    const success = page.locator('[data-form-success="vendor-inquiry"]');
    await expect(success).toBeVisible();
    await expect(success).toContainText('does not guarantee a partnership');
  });
});
