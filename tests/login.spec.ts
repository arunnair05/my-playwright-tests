import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObjects/LoginPage.js';
import type { Locator, Page } from '@playwright/test';
import { WebDriverUniversity } from './pageObjects/WebDriverUniversity.js';



test.describe("this is one of the main tests", () => {
  let logins: LoginPage;
  test.beforeEach(async ({ page }) => {
    // 2. Initialize the class with the current page
    logins = new LoginPage(page);

    // 3. Always AWAIT the login action
    await logins.loginToThePage("standard_user", "secret_sauce");
  });


  test('login as standard_user and land on inventory', async ({ page }) => {
    expect(page.url()).toContain("inventory");
  });

  test('login as standard_user and  check the message', async ({ page }) => {
    const textLoc: Locator = page.getByText('Swag Labs');
    await expect(textLoc).toContainText("Swag");
  });
});



test.describe("2nd Round of Tests ", () => {
  let logins: WebDriverUniversity;
  test.beforeEach(async ({ page }) => {
    // 2. Initialize the class with the current page
    logins = new WebDriverUniversity(page);

    // 3. Always AWAIT the login action
    await logins.loginToThePage();
  });


  test('login as standard_user and land on inventory', async ({ page }) => {
    expect(page.url()).toContain("webdriveruniversity");
  });

  test('login as standard_user and  check the message', async ({ page }) => {
    expect(page.url()).toContain("index");

  });
});