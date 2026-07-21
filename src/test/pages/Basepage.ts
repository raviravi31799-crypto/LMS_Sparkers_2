import { Locator, Page } from "@playwright/test";
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

  
  getRowByEmpName(employeeName: string): Locator {
    return this.page.locator(
      `//table//tbody//tr[td[contains(normalize-space(),'${employeeName}')]]`
    );
  }


  async selectMuiDropdown(dropdownLocator: string, optionValue: string) {
    const combobox = this.page.locator(dropdownLocator);
    await combobox.waitFor({ state: "visible", timeout: 60000 });
    await combobox.scrollIntoViewIfNeeded();
    await combobox.click();

    const listbox = this.page.locator("[role='listbox']");
    await listbox.waitFor({ state: "visible", timeout: 5000 });

    const option = this.page
      .locator(`[role='option']:has-text("${optionValue}")`)
      .first();
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();

    await listbox.waitFor({ state: "hidden", timeout: 3000 }).catch(() => {});
  }
}