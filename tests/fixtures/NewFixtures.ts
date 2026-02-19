import {test as base,  } from '@playwright/test'
import { LoginPage } from '../pageObjects/LoginPage.js'

type newFixtures={
    login: LoginPage;
}

export const test=base.extend<newFixtures>({
 
  login: async ({ page }, use) => {
    const login = new LoginPage(page);
    await use(login);
   
  },
});