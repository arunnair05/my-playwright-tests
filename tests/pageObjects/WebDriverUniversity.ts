import { test, expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';


export class WebDriverUniversity {

    readonly page: Page;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.url = "https://webdriveruniversity.com/index.html";

    }

    async loginToThePage() {
        console.log("Going to do the Login actions ");
        await this.page.goto(this.url);
        await expect(this.page).toHaveURL(/.*webdriveruniversity/);
    }




}