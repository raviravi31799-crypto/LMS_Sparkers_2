import { Page, expect } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { BasePage } from "./Basepage";

export class deletePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private deleteBtn = "//button[@aria-label='delete']";
    private classroomFilter = this.page.locator("//tr[2]/th[6]//input");

    async deleteEmployee(empId: string) {

        logger.info(`Deleting employee with EMP ID: ${empId}`);

        const row = this.page
            .locator("tbody tr")
            .filter({
                has: this.page.getByText(empId, { exact: true })
            })
            .first();

        await expect(row).toBeVisible({ timeout: 10000 });

        await row.locator(this.deleteBtn).click();

        logger.info(`Employee with EMP ID ${empId} deleted successfully`);
    }

    async verifyEmployeeDeleted(empId: string) {

        logger.info(`Verifying employee ${empId} is deleted`);

        const row = this.page
            .locator("tbody tr")
            .filter({
                has: this.page.getByText(empId, { exact: true })
            });

        await expect(row).toHaveCount(0);

        logger.info(`Verified employee ${empId} is no longer displayed`);
    }
    async filterByClassroom(classroom: string) {

    await this.classroomFilter.fill(classroom);

    // Wait for filtering to take effect
    await this.page.waitForTimeout(1000);

    logger.info(`Filtered records using Classroom: ${classroom}`);
}


private firstDeletedEmpId: string = "";

async deleteFirstFilteredRecord() {

    const firstRow = this.page.locator("tbody tr").first();

    await expect(firstRow).toBeVisible({ timeout: 10000 });

    this.firstDeletedEmpId = (
        await firstRow.locator("td").nth(1).innerText()
    ).trim();

    logger.info(
        `First filtered record EMP ID: ${this.firstDeletedEmpId}`
    );

    // Delete the exact employee
    await this.deleteEmployee(this.firstDeletedEmpId);

    logger.info(
        `First filtered record ${this.firstDeletedEmpId} delete completed`
    );
}


async verifyFirstFilteredRecordDeleted() {

    const empId = this.firstDeletedEmpId;

    logger.info(`Verifying employee ${empId} is deleted`);

    // Wait until the exact employee ID disappears
    await expect.poll(
        async () => {
            const rows = this.page.locator("tbody tr");

            const count = await rows.count();

            for (let i = 0; i < count; i++) {
                const id = (
                    await rows.nth(i).locator("td").nth(1).innerText()
                ).trim();

                if (id === empId) {
                    return true;
                }
            }

            return false;
        },
        {
            timeout: 15000,
            intervals: [500, 1000, 2000]
        }
    ).toBe(false);

    logger.info(
        `Verified employee ${empId} is no longer displayed after deletion`
    );
}
}