// Playwright Test Script for Preserving Authentication State
// URL: https://developer.servicenow.com/dev.do

import test, { Browser, BrowserContext, chromium, expect, Page } from '@playwright/test';

// Define browser, context, and page variables
let browser: Browser;
let context: BrowserContext;
let page: Page;

// Test suite for preserving authentication using storage state
test.describe("Preserving Authentication Using Storage State", async () => {
  
  // Before each test, load the session from the stored authentication state
  test.beforeEach("Load Session Storage", async () => {
    // Launch the browser in non-headless mode for visibility
    browser = await chromium.launch({ headless: true });
    
    // Create a new browser context with the pre-saved storage state
    context = await browser.newContext({
      storageState: 'auth.json', // Authentication state file
    });

    // Open a new page and navigate to the URL
    page = await context.newPage();
    await page.goto('https://developer.servicenow.com/dev.do');
    await page.waitForLoadState(); // Ensure the page is fully loaded
  });

  // Test case to verify the URL after login
  test("Verify URL", async () => {
    // Assert the current page URL contains the expected path
    await expect(page.url()).toContain("developer.servicenow.com/dev.do");

    // Locate the welcome text and validate its content
    const welcomeText = await page.locator(".dps-page-header-title.-big").textContent();
    await expect(welcomeText).toContain("Hello, battulas");
  });

  // Test case to verify the welcome message displayed on the page
  test("Verify Welcome Message", async () => {
    // Locate and validate the welcome text on the page
    const welcomeText = await page.locator(".dps-page-header-title.-big").textContent();
    await expect(welcomeText).toContain("Hello, battulas");
  });

  // After each test, close the browser to clean up resources
  test.afterEach("Closing Browser", async () => {
    await page.close(); // Close the current page
    await browser.close(); // Close the browser instance
  });
});