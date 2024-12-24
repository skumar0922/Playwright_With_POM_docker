import test, { Browser, BrowserContext, chromium, expect, Page } from "@playwright/test"
import ENV from "../../utils/environment";
import { LandingPage } from "../pages/landingPage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from '../pages/HomePage';
import CommonFunctions from "../pages/common.page";


// This we need from playwright
let browser: Browser;
let context: BrowserContext;
let page: Page;

// my Pages objects declaration
let landingPage: LandingPage;
let loginPage: LoginPage;
let homePage: HomePage;
let commonFunctions: CommonFunctions;

test.describe(" Let Code - Home Page - JIRA_001", async () => {

    test.beforeAll("Setup", async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
        console.log(" ------- setup ---------");
        await page.goto(ENV.testEnv);
        await page.waitForTimeout(2000);

        // Initialize the page objects
        landingPage = new LandingPage(page);
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        commonFunctions = new CommonFunctions(page);
    });

    test.afterAll("tearDown", async () => {
        console.log(" ------- TearDown ---------");
        await page.close();
    });

    test("Verify landing Page Url - Tc_001", async () => {
        expect(page.url()).toContain('https://letcode.in')
        expect(landingPage.eleLoginBtn).toBeVisible();
        await landingPage.clickLogin1Btn();
    });

    test("Verify Login Page Elements - TC_002", async () => {
        expect(loginPage.eleEmailField).toBeVisible();
        expect(loginPage.elePasswordField).toBeVisible();
    });

    test("Login - TC_003", async () => {
        await loginPage.enterEmail("battulas@yopmail.com")
        await loginPage.enterPassword("Spring_2019");
        await loginPage.clickLogin2Btn();
        await page.waitForTimeout(2000);
        const toasterText = await commonFunctions.toaster;
        expect(await toasterText.textContent()).toContain("Welcome");
        expect(homePage.eleSignOutBtn).toBeVisible();
    });

    test("Sign Out - TC_004", async () => {
        await homePage.eleSignOutBtn.click();
        const toasterText = await commonFunctions.toaster;
        expect(await toasterText.textContent()).toContain("Bye!");
    });

    test.skip("Skip Test - TC_005", async () => {
        console.log("---- Skipping This Test -----");
    });
});
