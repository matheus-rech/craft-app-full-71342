import { test as setup } from '@playwright/test';

/**
 * Authentication Setup for OAuth Tests
 * 
 * NOTE: OAuth authentication testing with GitHub/Google requires special setup:
 * 
 * Option 1: Mock OAuth Flow
 * - Intercept OAuth requests and mock responses
 * - Set authentication tokens directly in localStorage
 * 
 * Option 2: Use Supabase Test Helpers
 * - Use Supabase's testing utilities to create test sessions
 * - Bypass OAuth providers in test environment
 * 
 * Option 3: Real OAuth (Not Recommended for CI)
 * - Use actual OAuth credentials (requires test accounts)
 * - Automate OAuth consent flow (complex and fragile)
 * 
 * For now, this is a placeholder that demonstrates the structure.
 * Implement based on your testing strategy.
 */

const authFile = 'playwright/.auth/user.json';

setup('authenticate with OAuth', async ({ page }) => {
  // Navigate to auth page
  await page.goto('/auth');

  // OPTION 1: Mock OAuth Flow
  // Intercept the OAuth request and set tokens directly
  await page.evaluate(() => {
    // Mock Supabase session in localStorage
    const mockSession = {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: {
          full_name: 'Test User',
          avatar_url: 'https://example.com/avatar.jpg',
        },
      },
    };
    
    localStorage.setItem(
      'sb-nifzcgzljjembmifsmcn-auth-token',
      JSON.stringify(mockSession)
    );
  });

  // Navigate to main app (should work if session is valid)
  await page.goto('/');
  
  // Wait for authentication to be processed
  await page.waitForTimeout(1000);

  // Save authentication state
  await page.context().storageState({ path: authFile });
});

/**
 * To use authenticated state in tests:
 * 
 * test.use({ storageState: 'playwright/.auth/user.json' });
 * 
 * Or configure in playwright.config.ts:
 * {
 *   name: 'authenticated',
 *   use: { ...devices['Desktop Chrome'], storageState: authFile },
 *   dependencies: ['setup'],
 * }
 */
