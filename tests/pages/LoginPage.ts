import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page:Page;

    constructor(page: Page) {
        this.page = page;
    }


    //Email
    public get eleEmailField() {
        const emailField = this.page.locator("input[name='email']");
         if(emailField != null){
             return emailField;
         }else throw new Error("No Such Element");
     }


     //password
     public get elePasswordField() {
        const passwordField = this.page.locator("input[placeholder='Enter password']");
         if(passwordField != null){
             return passwordField;
         }else throw new Error("No Such Element");
     }

     // click Login 
     public async clickLogin2Btn() {
        await this.page.locator("//button[normalize-space()='LOGIN']").click();
     }

     // enter email
     public async enterEmail(email:string) {
        await this.eleEmailField.fill("battulas@yopmail.com");
     }

     // password
     public async enterPassword(password:string) {
        await this.elePasswordField.fill("Spring_2019");
     }

     public async login(email:string, password:string){
        await this.eleEmailField.fill(email);
        await this.elePasswordField.fill(password);
        await this.clickLogin2Btn();
     }
}