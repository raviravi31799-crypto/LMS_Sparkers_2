import { Page, expect } from "@playwright/test";
import { TrainingRecord } from "../types/training.types";
import { logger } from "../utils/winstonlogger";
import { BasePage } from "./Basepage";

export class CreateTrainingPage extends BasePage {

private deleteBtn = "//button[@aria-label='delete']";
async deleteEmployee(empId: string) {
  logger.info(`Deleting employee with EMP ID: ${empId}`);
  const row = this.page.locator(`//table//tbody//tr[td[contains(normalize-space(),'${empId}')]]`);
  await expect(row).toBeVisible({ timeout: 10000 });
  await row.locator(this.deleteBtn).click();
  logger.info(`Employee with EMP ID ${empId} deleted successfully`);
}
}
