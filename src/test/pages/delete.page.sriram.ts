import { Page, expect } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { BasePage } from "./Basepage";

export class DeletePageSriram extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private deleteBtn = "//button[@aria-label='delete']";

    async deleteEmployee(empId: string) {
        logger.info(`[Sriram] Deleting employee with EMP ID: ${empId}`);

        const row = this.page
            .locator("tbody tr")
            .filter({
                has: this.page.getByText(empId, { exact: true })
            })
            .first();

        await expect(row).toBeVisible({ timeout: 10000 });
        await row.locator(this.deleteBtn).click();

        logger.info(`[Sriram] Employee with EMP ID ${empId} deleted successfully`);
    }

    async verifyEmployeeDeleted(empId: string) {
        logger.info(`[Sriram] Verifying employee ${empId} is deleted`);

        const row = this.page
            .locator("tbody tr")
            .filter({
                has: this.page.getByText(empId, { exact: true })
            });

        await expect(row).toHaveCount(0);

        logger.info(`[Sriram] Verified employee ${empId} is no longer displayed`);
    }
}
