import test, { Browser, BrowserContext, chromium, expect, Page } from "@playwright/test"

// This we need from playwright
let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe(" Let Code - Home Page - JIRA_001", async () => {
    test.beforeAll("Setup", async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        console.log(" ------- setup ---------");
        await page.goto("https://github.com/login");
        await page.waitForTimeout(2000);
    });

    test.afterAll("tearDown", async () => {
        console.log(" ------- TearDown ---------");
        await page.close();
    });

    test("Verify Full Page Screenshot Tc_001", async () => {
        // uncomment during first run //.auth-form-body
        // await page.screenshot({ path: './tests/screenshots/login.png', fullPage: true });
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('login.png', { threshold: 0.1 });
    });

    test("Verify Element Screenshot Tc_002", async () => {
        const loginform = await page.locator(".auth-form-body");
        // uncomment during first run 
        // await loginform.screenshot({ path: './tests/screenshots/loginForm.png'});
        expect(await loginform.screenshot()).toMatchSnapshot('loginForm.png', { threshold: 0.1 });
    });
});