import { Page } from "@playwright/test";

export class ExploreWorkspace {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get eleInputCard(){
        const inputCard = this.page.locator("//p[text()=' Input ']");
        if(inputCard != null){
            return inputCard
        }else throw new Error("No Such Element");
    }

    public get eleButtonCard(){
        const buttonCard = this.page.locator("//p[text()=' Input ']");
        if(buttonCard != null){
            return buttonCard
        }else throw new Error("No Such Element");
    }

    public get eleEditLink() {
        const editLink = this.page.locator("//a[text()='Edit']");
        if(editLink != null){
            return editLink;
        }else throw new Error("No Such Element");
    }

    public get eleEnterFullNameField() {
        const enterFullName = this.page.locator("#fullName");
        if(enterFullName != null){
            return enterFullName;
        }else throw new Error("No Such Element");
    }

    public get eleAppendTextField() {
        const appendTextField = this.page.locator("#join");
        if(appendTextField != null){
            return appendTextField;
        }else throw new Error("No Such Element");
    }
    
    public get eleInsideTextField() {
        const insideTextField = this.page.locator("#getMe");
        if(insideTextField != null){
            return insideTextField;
        }else throw new Error("No Such Element");
    }

    public get eleClearMeTextField() {
        const clearMeTextField = this.page.locator("#clearMe");
        if(clearMeTextField != null){
            return clearMeTextField;
        }else throw new Error("No Such Element");
    }
}