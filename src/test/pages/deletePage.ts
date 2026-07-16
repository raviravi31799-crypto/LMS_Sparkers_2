import { Page, expect } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { BasePage } from "./Basepage";

export class deletePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    private deleteBtn = "//button[@aria-label='delete']";
    async deleteEmployee(empId: string) {
        logger.info(`Deleting employee with EMP ID: ${empId}`);
        const row = this.page.locator(`//table//tbody//tr[td[contains(normalize-space(),'${empId}')]]`);
        await expect(row).toBeVisible({ timeout: 10000 });
        await row.locator(this.deleteBtn).click();
        logger.info(`Employee with EMP ID ${empId} deleted successfully`);
    }
    async verifyEmployeeDeleted(empId: string) {
        logger.info(`Verifying employee ${empId} is deleted`);
        const row = this.page.locator(`//table//tbody//tr[td[contains(normalize-space(),'${empId}')]]`);
        await expect(row).toHaveCount(0);
        logger.info(`Verified employee ${empId} is no longer displayed`);
    }
}