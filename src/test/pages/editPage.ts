import { expect, Page } from "@playwright/test";
import { BasePage } from "./Basepage";
import { logger } from "../utils/winstonlogger";
import { TrainingRecord } from "../types/training.types";

export class editPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

 
  private editIcon = "//button[@aria-label='edit']";
  private projectNameDropdown ="//input[@name='projectName']/ancestor::div[contains(@class,'MuiSelect-root')]/div[@role='combobox']";
  private trainingTypeDropdown = "//input[@name='trainingType']/ancestor::div[contains(@class,'MuiSelect-root')]/div[@role='combobox']";
  private statusDropdown ="//input[@name='status']/ancestor::div[contains(@class,'MuiSelect-root')]/div[@role='combobox']";
  private empIdInput = "//input[@name='empId']";
  private employeeNameInput = "//input[@name='employeeName']";
  private courseInput = "//input[@name='course']";
  private trainerNameInput = "//input[@name='trainerName']";
  private startDateInput = "//input[@name='startDate']";
  private endDateInput = "//input[@name='endDate']";
  private percentCompletedInput = "//input[@name='percentCompleted']";
  private updateButton = "//button[normalize-space()='Update']";
  private cancelButton = "//button[normalize-space()='Cancel']";

  async clickEditIcon(employeeName: string) {
    logger.info(`Clicking edit icon for EMP Name: ${employeeName}`);

    const row = this.getRowByEmpName(employeeName);
    await expect(row).toBeVisible({ timeout: 10000 });

    await row.locator(this.editIcon).click();

    await this.page.waitForSelector(this.courseInput);
  }

  async updateFields(fields: string[], data: TrainingRecord) {
    for (const field of fields) {
      if (field === "projectName") {
        await this.selectMuiDropdown(this.projectNameDropdown, data.projectName);
      }
      if (field === "course") {
        await this.page.locator(this.courseInput).fill(data.course);
      }
      if (field === "trainerName") {
        await this.page.locator(this.trainerNameInput).fill(data.trainerName);
      }
      if (field === "trainingType") {
        await this.selectMuiDropdown(this.trainingTypeDropdown, data.trainingType);
      }
      if (field === "startDate") {
        await this.page.locator(this.startDateInput).fill(data.startDate);
      }
      if (field === "endDate") {
        await this.page.locator(this.endDateInput).fill(data.endDate);
      }
      if (field === "status") {
        await this.selectMuiDropdown(this.statusDropdown, data.status);
      }
      if (field === "percentCompleted") {
        await this.page.locator(this.percentCompletedInput).fill(data.percentCompleted);
      }

      logger.info(`Updated field "${field}"`);
      
    }
  }

  async clickUpdate() {
    logger.info("Clicking Update button");
    await this.page.locator(this.updateButton).click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickCancel() {
    logger.info("Clicking Cancel button");
    await this.page.locator(this.cancelButton).click();
  }

  // Table renders dates as d/m/yyyy (e.g. 2026-07-16 -> 16/7/2026)
  private formatDateForDisplay(dateStr: string): string {
    const parts = dateStr.split("-");
    const year = parts[0] ?? "";
    const month = parts[1] ?? "";
    const day = parts[2] ?? "";
    return `${parseInt(day, 10)}/${parseInt(month, 10)}/${year}`;
  }

  async verifyUpdatedRecord(data: TrainingRecord, fields: string[]) {
    const row = this.getRowByEmpName(data.employeeName);
    await expect(row).toBeVisible({ timeout: 60000 });

    for (const field of fields) {
      if (field === "projectName") {
        await expect(row).toContainText(data.projectName);
      }
      if (field === "course") {
        await expect(row).toContainText(data.course);
      }
      if (field === "trainerName") {
        await expect(row).toContainText(data.trainerName);
      }
      if (field === "trainingType") {
        await expect(row).toContainText(data.trainingType);
      }
      if (field === "status") {
        await expect(row).toContainText(data.status);
      }
      if (field === "percentCompleted") {
        await expect(row).toContainText(data.percentCompleted + "%");
      }
      if (field === "startDate") {
        await expect(row).toContainText(this.formatDateForDisplay(data.startDate));
      }
      if (field === "endDate") {
        await expect(row).toContainText(this.formatDateForDisplay(data.endDate));
      }
    }

    logger.info("Updated record verified successfully in the list");
  }
}