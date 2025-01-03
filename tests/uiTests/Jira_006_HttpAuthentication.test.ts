import test, { Browser, BrowserContext, chromium, expect, Page } from "@playwright/test";

test.describe("Network Playwright", async()=>{
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    test("Http Authentication", async()=>{
       browser = await chromium.launch({
        headless:true
       });
       context = await browser.newContext({
            httpCredentials : {
                username: "admin",
                password: "admin"
            }
        });
        
        page = await context.newPage();
        await page.goto("https://the-internet.herokuapp.com/basic_auth");
        await page.waitForLoadState();
        const message =  await page.locator("div[class='example'] p").textContent();
        expect(message).toContain("Congratulations! You must have the proper credentials.");
        await page.close();
    })

})