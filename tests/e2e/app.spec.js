import { test, expect } from '@playwright/test';

test.describe('PWA home page (WebKit / Safari)', () => {
  test('has the correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('My GitHub PWA');
  });

  test('displays the header title', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.header-title')).toBeVisible();
    await expect(page.locator('.header-title')).toContainText('My GitHub PWA');
  });

  test('shows the network status as Online', async ({ page }) => {
    await page.goto('/');
    const networkStatus = page.locator('#networkStatus');
    await expect(networkStatus).toBeVisible();
    await expect(networkStatus).toHaveText('Online');
  });

  test('renders the service worker status element', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#swStatus')).toBeVisible();
  });

  test('install button is hidden by default', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#installBtn')).toBeHidden();
  });

  test('iOS install banner is hidden in a non-iOS context', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#iosInstallBanner')).toBeHidden();
  });

  test('main navigation links are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="index.html"]')).toBeVisible();
    await expect(page.locator('a[href="capabilities.html"]')).toBeVisible();
  });

  test('feature cards are rendered', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.card');
    await expect(cards).toHaveCount(4);
  });
});
