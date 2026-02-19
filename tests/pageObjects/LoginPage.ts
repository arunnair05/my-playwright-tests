import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';


export class LoginPage {

    readonly page: Page;
    readonly url: string;
    readonly userId: Locator;
    readonly password: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = "https://www.saucedemo.com/";
        this.userId = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.submitBtn = page.locator('[data-test="login-button"]');
    }

    async loginToThePage(userId: string, password: string) {
        console.log("Going to do the Login actions ");
        await this.page.goto(this.url);
        await this.userId.fill(userId);
        await this.password.fill(password);
        await this.submitBtn.click();
        await expect(this.page).toHaveURL(/.*inventory/);
    }




}