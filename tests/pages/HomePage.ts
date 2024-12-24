import { Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Sign out Button
    public get eleSignOutBtn() {
        const signOutBtn = this.page.locator("//a[normalize-space()='Sign out']");
        if (signOutBtn != null) {
            return signOutBtn;
        } else throw new Error("No Such Element");
    }

    // Explore Workspace

    public get eleExploreWorkspace() {
        const exploreWorkspaceBtn = this.page.locator("text=Explore Workspace");
        if(exploreWorkspaceBtn != null){
            return exploreWorkspaceBtn;
        }else throw new Error("No Such Element", exploreWorkspaceBtn);
    }

}