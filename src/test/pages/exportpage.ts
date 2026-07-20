import { Page, expect } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { BasePage } from "./Basepage";

export class exportPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
   private exportToExcelButton="//button[normalize-space()='Export to Excel']";
   async clickExportButton() {
        const downloadPromise = this.page.waitForEvent("download");
        await this.page.locator(this.exportToExcelButton).click();
        return await downloadPromise;      
    }
}