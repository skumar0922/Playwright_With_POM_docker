import { test, chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';

// Declare variables for browser, context, and page
let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe("Preserving Authentication State", () => {

    // Before each test, load or refresh the session
    test.beforeEach("Load Session Storage", async () => {
        // Launch the browser
        browser = await chromium.launch({ headless: true });

        // Create a browser context and page
        context = await browser.newContext({ storageState: 'auth.json' });
        page = await context.newPage();

        try {
            // Navigate to the website and check for a valid session
            await page.goto('https://developer.servicenow.com/dev.do');
            const welcomeText = await page.locator(".dps-page-header-title.-big").textContent();
            if (!welcomeText?.includes("Hello, battulas")) {
                throw new Error("Session Expired");
            }
        } catch (e) {
            console.log("Session expired. Re-authenticating...");

            // Re-authenticate if session is expired
            await page.goto('https://developer.servicenow.com/dev.do');
            // Click the sign-in button
            await page.click('.dps-button-label');
            // Enter email
            await page.fill('#email', 'your-username'); 
            // Click Next
            await page.click('#username_submit_button');
            // Enter password
            await page.fill('#password', 'Spring_2019'); 
            // Click SignIn
            await page.click('#password_submit_button');
            await page.waitForLoadState();

            // Save the new session state to auth.json
            await context.storageState({ path: 'auth.json' });
        }
    });

    // After all tests, close the browser
    test.afterAll(async () => {
        if (browser) {
            await browser.close();
        }
    });

    // Test to verify the welcome text
    test('Verify Welcome Text', async () => {
        const welcomeText = await page.locator(".dps-page-header-title.-big").textContent();
        expect(welcomeText).toContain("Hello, battulas");
    });

    // Test to verify the URL
    test('Verify Url', async () => {
        expect(page.url()).toContain("https://developer.servicenow.com/dev.do");
    });
});