import { test, expect } from '@playwright/test';

test.describe('OAuth Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth');
  });

  test('should display OAuth provider buttons', async ({ page }) => {
    await expect(page.getByRole('button', { name: /Continue with GitHub/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Continue with Google/i })).toBeVisible();
  });

  test('should display page title and description', async ({ page }) => {
    await expect(page.locator('text=Clinical Extraction System')).toBeVisible();
    await expect(page.locator('text=Sign in to access AI-powered clinical data extraction')).toBeVisible();
  });

  test('should display security message', async ({ page }) => {
    await expect(page.locator('text=Secure authentication for HIPAA-compliant data extraction')).toBeVisible();
  });

  test('should show loading state when GitHub button is clicked', async ({ page }) => {
    const githubButton = page.getByRole('button', { name: /Continue with GitHub/i });
    
    // Click the button
    await githubButton.click();
    
    // Button should show loading state
    await expect(page.getByRole('button', { name: /Connecting/i })).toBeVisible({ timeout: 1000 });
  });

  test('should have proper button styling and icons', async ({ page }) => {
    const githubButton = page.getByRole('button', { name: /Continue with GitHub/i });
    const googleButton = page.getByRole('button', { name: /Continue with Google/i });
    
    // Buttons should be visible and have proper size
    await expect(githubButton).toBeVisible();
    await expect(googleButton).toBeVisible();
    
    // Verify icons are present (checking SVG elements)
    await expect(page.locator('button:has-text("Continue with GitHub") svg')).toBeVisible();
    await expect(page.locator('button:has-text("Continue with Google") svg')).toBeVisible();
  });

  test('should redirect authenticated users to main app', async ({ page, context }) => {
    // This test requires setting up authentication state
    // See tests/auth.setup.ts for implementation
  });
});

test.describe('Welcome Page', () => {
  test('should display hero section with CTA buttons', async ({ page }) => {
    await page.goto('/welcome');
    
    await expect(page.locator('h1:has-text("Clinical Data Extraction")')).toBeVisible();
    await expect(page.getByRole('button', { name: /Get Started/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Watch Demo/i })).toBeVisible();
  });

  test('should navigate to auth page when clicking Get Started', async ({ page }) => {
    await page.goto('/welcome');
    
    await page.getByRole('button', { name: /Get Started/i }).first().click();
    await expect(page).toHaveURL(/\/auth/);
  });

  test('should display feature cards', async ({ page }) => {
    await page.goto('/welcome');
    
    await expect(page.locator('text=AI-Powered Extraction')).toBeVisible();
    await expect(page.locator('text=HIPAA Compliant')).toBeVisible();
    await expect(page.locator('text=Structured Data')).toBeVisible();
  });
});
