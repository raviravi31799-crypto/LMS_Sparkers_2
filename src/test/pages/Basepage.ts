import { Page } from "@playwright/test";
import { loadEnv } from "../utils/envReader";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToApp() {
    const env = loadEnv();
    await this.page.goto(env.BASE_URL);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }
}
