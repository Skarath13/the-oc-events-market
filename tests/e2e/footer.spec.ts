import { expect, test } from '@playwright/test';

test('footer displays Romans 10:9', async ({ page }) => {
  await page.goto('/');

  const verse = page.locator('footer blockquote[cite="https://ebible.org/eng-web/ROM10.htm"]');
  await expect(verse).toContainText(
    'that if you will confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved.',
  );
  await expect(verse.locator('cite')).toHaveText('Romans 10:9');
});
