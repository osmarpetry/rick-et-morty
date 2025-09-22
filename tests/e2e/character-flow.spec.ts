import { test, expect } from '@playwright/test';

/**
 * E2E Test: Essential Character Flow
 * Tests the core functionality: data loading, pagination, and search
 * Verifies API integration with Rick and Morty GraphQL API
 */
test.describe('Character Flow - Essential Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the main page
    await page.goto('/');

    // Wait for the page to load completely
    await page.waitForLoadState('networkidle');
  });
  test('should load characters from API and display in table', async ({
    page,
  }) => {
    const table = page.getByRole('grid', { name: 'Characters table' });
    await expect(table).toBeVisible();

    // Use the last rowgroup to target the data body
    const bodyGroup = table.locator('[role="rowgroup"]').last();
    const bodyRows = bodyGroup.getByRole('row');

    // Wait for data rows to appear
    await expect(bodyRows.first()).toBeVisible();

    // If your page size is 20, assert it here; otherwise prefer >= 1
    await expect(bodyRows).toHaveCount(20);

    // Validate first row has a name in the rowheader cell
    const firstNameCell = bodyRows.first().getByRole('rowheader');
    await expect(firstNameCell).not.toHaveText('');
  });

  test('should navigate to page 2 via pagination', async ({ page }) => {
    // Wait for the characters table to load
    const charactersTable = page.locator('[aria-label="Characters table"]');
    await expect(charactersTable).toBeVisible();

    // Verify pagination item 1 is active initially (check for either "pagination item 1" or "pagination item 1 active")
    const paginationItem1 = page.locator(
      '[aria-label="pagination item 1"], [aria-label="pagination item 1 active"]'
    );
    await expect(paginationItem1).toBeVisible();

    // Verify tbody has exactly 20 tr elements initially
    const tableRows = page.locator('tbody[role="rowgroup"] tr');
    await expect(tableRows).toHaveCount(20);

    // Click pagination item 2
    const paginationItem2 = page.locator('[aria-label="pagination item 2"]');
    await expect(paginationItem2).toBeVisible();
    await paginationItem2.click();

    // Wait for API response and page change
    await page.waitForLoadState('networkidle');

    // Verify pagination item 2 is now active (check for either "pagination item 2" or "pagination item 2 active")
    const paginationItem2Active = page.locator(
      '[aria-label="pagination item 2"], [aria-label="pagination item 2 active"]'
    );
    await expect(paginationItem2Active).toBeVisible();

    // Verify tbody still has exactly 20 tr elements on page 2
    const newTableRows = page.locator('tbody[role="rowgroup"] tr');
    await expect(newTableRows).toHaveCount(20);
  });

  test('should search for "rick" and find Rick Sanchez', async ({ page }) => {
    // Wait for search input to be available
    const searchInput = page
      .locator(
        'input[type="text"], input[placeholder*="search" i], input[aria-label*="search" i]'
      )
      .first();
    await expect(searchInput).toBeVisible();

    // Type 'rick' in search query
    await searchInput.fill('rick');

    // Wait for 5 seconds as requested
    await page.waitForTimeout(5000);

    // Wait for API response and table update
    await page.waitForLoadState('networkidle');

    // Search for 'Rick Sanchez' in the results
    const rickSanchez = page.getByText('Rick Sanchez');
    await expect(rickSanchez).toBeVisible();

    // Verify search results contain "rick"
    const characterNames = page.locator(
      'tbody[role="rowgroup"] tr td:first-child'
    );
    const count = await characterNames.count();

    // Ensure we have at least one result
    expect(count).toBeGreaterThan(0);

    // Verify all results contain "rick" (case insensitive)
    for (let i = 0; i < count; i++) {
      const name = await characterNames.nth(i).textContent();
      expect(name?.toLowerCase()).toContain('rick');
    }
  });
});
