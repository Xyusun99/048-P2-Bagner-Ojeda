import { Page, Locator, expect } from '@playwright/test';

export class OrangeHRMPage {
  readonly page: Page;

  // Locators como propiedades de la clase
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly pageHeader: Locator;
  readonly userDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.pageHeader = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
  }

  // Método de acción 1
  async navigate() {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );
  }

  // Método de acción 2
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Método de acción adicional
  async clickMenu(moduleName: string) {
    await this.page
      .locator('.oxd-main-menu-item')
      .filter({ hasText: moduleName })
      .click();
  }

  async verifyPageHeader(moduleName: string) {
    await expect(this.pageHeader).toContainText(moduleName);
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText('Invalid credentials');
  }
}