import { test, chromium, expect, Browser, BrowserContext, Page } from "@playwright/test";
import * as dotenv from 'dotenv';
import Credentials from "../../utils/encrypt&decrypt";
import { LandingPage } from "../pages/landingPage";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

dotenv.config(); // Ensure .env is loaded

let landingPage: LandingPage;
let loginPage: LoginPage;
let homePage : HomePage;
let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe("Login with Encrypted Credentials", () => {
  test.beforeAll(async () => {
    // Launch browser and navigate to login page
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();
    homePage = await new HomePage(page);
    
    // Check if TEST_ENV is loaded
    if (!process.env.TEST_ENV) {
      throw new Error("environment variable is not defined!");
    }
    console.log("Navigating to:", process.env.TEST_ENV); // Debug log
    await page.goto(process.env.TEST_ENV!);

    // Initialize Credentials
    const credentials = new Credentials();

    // Get decrypted email and password
    const decryptedEmail = credentials.getDecryptedEmail();
    const decryptedPassword = credentials.getDecryptedPassword();

    // Initialize page objects
    landingPage = new LandingPage(page);
    loginPage = new LoginPage(page);

    // Perform login
    await landingPage.clickLogin1Btn();
   // console.log("Decrypted Email : ", decryptedEmail); 
   // console.log("Decrypted Password : ", decryptedPassword); 
    await loginPage.login(decryptedEmail, decryptedPassword);
    await page.waitForTimeout(2000);
  });

  test("Verify Sign Out", async () => {
    await expect(homePage.eleSignOutBtn).toBeVisible();
  });

  test.afterAll(async () => {
    const browser = await chromium.launch();
    await browser.close();
  });
});