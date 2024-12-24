import test, { Browser, BrowserContext, chromium, expect, Page } from "@playwright/test";
import ENV from "../../utils/environment";
import { LandingPage } from "../pages/landingPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ExploreWorkspace } from "../pages/exploreWorkspace.page";

test.describe("Learn How to Handle Different Input Fields", async () => {

  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  // My pages
  let landingPage: LandingPage;
  let loginPage: LoginPage
  let homePage: HomePage;
  let exploreWorkSpacePage: ExploreWorkspace;

  test.beforeAll("setup", async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    // Go To URL
    await page.goto(ENV.testEnv)
    landingPage = new LandingPage(page);
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    exploreWorkSpacePage = new ExploreWorkspace(page);

    await landingPage.clickLogin1Btn();
    await loginPage.login("battulas@yopmail.com", "Spring_2019");

    console.log("----- Exploring workspace -----");
    await homePage.eleExploreWorkspace.click();
    await page.waitForTimeout(2000);
    expect(exploreWorkSpacePage.eleInputCard).toContainText("Input");
    await exploreWorkSpacePage.eleEditLink.click();
  });


  test.afterAll("setup", async () => {
    await page.close();
  });

  test("Enter Full Name", async()=>{
      const fullName = await exploreWorkSpacePage.eleEnterFullNameField.getAttribute('placeholder')
      expect(fullName).toBe("Enter first & last name");
});

test("Append Text ", async()=>{
  const appendTextField =  await exploreWorkSpacePage.eleAppendTextField;
  await appendTextField.focus();
  await page.keyboard.press("Meta+ArrowRight");
  await exploreWorkSpacePage.eleAppendTextField.pressSequentially(" hello");

});

test("Get Text ", async()=>{
  const text = await exploreWorkSpacePage.eleInsideTextField.inputValue();
  expect(text).toBe("ortonikc");
});

test("Clear Text", async () => {
  // Clear the input field
  await exploreWorkSpacePage.eleClearMeTextField.clear();

  // Get the current value of the input field
  const clearText = await exploreWorkSpacePage.eleClearMeTextField.inputValue();

  // Assert that the input field is empty
  expect(clearText).toBe(''); // This compares the retrieved value, not the locator
});

});
