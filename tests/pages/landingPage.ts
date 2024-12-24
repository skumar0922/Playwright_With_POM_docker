import { Page } from "@playwright/test";

export class LandingPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    public get eleLoginBtn() {
        const loginBtn = this.page.locator("text=Log In");
        if (loginBtn != null) {
            return loginBtn;
        } else throw new Error("No Such Element");
    }

    // sign In
    public async clickLogin1Btn() {
        await this.eleLoginBtn.click();
    }

}