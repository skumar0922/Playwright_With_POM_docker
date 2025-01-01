import { test, chromium, Browser, BrowserContext, Page, expect } from '@playwright/test';
import * as fs from 'fs';

// Declare variables for browser, context, and page
let browser: Browser;
let context: BrowserContext;
let page: Page;
const filePath = './auth.json';

test.describe("Preserving Authentication State", () => {
    test.beforeEach("Load Session Storage", async () => {
        // Check if the session storage file exists
        const isAuthFileAvailable = fs.existsSync(filePath);

        // Launch the browser
        browser = await chromium.launch({ headless: true, slowMo: 100});

        if (isAuthFileAvailable) {
            // Use auth.json to restore session
            context = await browser.newContext({ storageState: filePath });
        } else {
            // Create a new browser context
            context = await browser.newContext();
        }

        // Create a new page
        page = await context.newPage();

        // Navigate to the website
        await page.goto('https://developer.servicenow.com/dev.do', { timeout: 15000 });
        await page.click('.dps-button-label');
        await page.waitForLoadState("load");

        try {
            // Validate session by checking the presence of welcome text
            const welcomeText = await page.locator(".dps-page-header-title.-big").textContent({ timeout: 5000 });

            if (welcomeText && welcomeText.includes("Hello, battulas")) {
                console.log("-- Session is valid. Proceeding...");
                return;
            }
        } catch (error) {
             // Perform re-authentication
            console.log("Session validation failed or page not loaded. Proceeding to re-authentication...");
           // await page.goto('https://developer.servicenow.com/dev.do', { timeout: 15000 });
            await page.click('.dps-button-label');
            await page.waitForTimeout(5000);

        // Enter email
        await page.fill('#email', 'sharavan.tad0922@gmail.com', { timeout: 10000 });
        // Click Next
        await page.click('#username_submit_button');
        // Enter password
        await page.fill('#password', 'Spring_2019');
        // Click SignIn
        await page.click('#password_submit_button');
        await page.waitForTimeout(2000);

        // Save the new session state to auth.json
        await context.storageState({ path: filePath });
        }
    });

    // Close the browser after all tests
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