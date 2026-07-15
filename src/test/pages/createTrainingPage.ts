import { Page, expect } from "@playwright/test";
import { TrainingRecord } from "../types/training.types";
import { logger } from "../utils/winstonlogger";

export class CreateTrainingPage {
  page: Page;

  
  private addTrainingBtn = "//button[@aria-label='Add Training']";

  
  private empIdInput = "//input[@name='empId']";
  private employeeNameInput = "//input[@name='employeeName']";
  private courseInput = "//input[@name='course']";
  private trainerNameInput = "//input[@name='trainerName']";
  private startDateInput = "//input[@name='startDate']";
  private endDateInput = "//input[@name='endDate']";
  private percentCompletedInput = "//input[@name='percentCompleted']";

  
  private projectNameDropdown = "//input[@name='projectName']/ancestor::div[contains(@class,'MuiSelect-root')]/div[@role='combobox']";
  private trainingTypeDropdown = "//input[@name='trainingType']/ancestor::div[contains(@class,'MuiSelect-root')]/div[@role='combobox']";
  private statusDropdown = "//input[@name='status']/ancestor::div[contains(@class,'MuiSelect-root')]/div[@role='combobox']";

  
  private addBtn = "//button[text()='Add']";

  
  private tableRows = "//table//tbody/tr";

  constructor(page: Page) {
    this.page = page;
  }

  async clickAddTraining() {
    await this.page.locator(this.addTrainingBtn).click();
    await this.page.waitForSelector("input[name='projectName']", { state: "visible", timeout: 10000 });
  }

  private async selectDropdown(dropdownXPath: string, optionValue: string) {
    const combobox = this.page.locator(dropdownXPath);
    await combobox.waitFor({ state: "visible", timeout: 10000 });
    await combobox.scrollIntoViewIfNeeded();
    await combobox.click();

    const listbox = this.page.locator("[role='listbox']");
    await listbox.waitFor({ state: "visible", timeout: 5000 });

    const option = this.page.locator(`[role='option']:has-text("${optionValue}")`).first();
    await option.waitFor({ state: "visible", timeout: 5000 });
    await option.click();

    await listbox.waitFor({ state: "hidden", timeout: 3000 }).catch(() => {});
  }

  async fillForm(record: TrainingRecord) {
    logger.info(`Filling form: ${JSON.stringify(record)}`);
    await this.selectDropdown(this.projectNameDropdown, record.projectName);
    await this.page.locator(this.empIdInput).fill(record.empId);
    await this.page.locator(this.employeeNameInput).fill(record.employeeName);
    await this.page.locator(this.courseInput).fill(record.course);
    await this.page.locator(this.trainerNameInput).fill(record.trainerName);
    await this.selectDropdown(this.trainingTypeDropdown, record.trainingType);
    await this.page.locator(this.startDateInput).fill(record.startDate);
    await this.page.locator(this.endDateInput).fill(record.endDate);
    await this.selectDropdown(this.statusDropdown, record.status);
    await this.page.locator(this.percentCompletedInput).fill(record.percentCompleted);
    logger.info("Form fill complete");
  }

  async clickAdd() {
    await this.page.locator(this.addBtn).click();
  }

  async verifyTableHasRecords() {
    const rows = this.page.locator(this.tableRows);
    await expect(rows.first()).toBeVisible({ timeout: 10000 });
    const count = await rows.count();
    logger.info(`Table has ${count} records`);
    expect(count).toBeGreaterThan(0);
  }

  async verifyRecordExistsByName(name: string) {
    const row = this.page.locator(`//table//tbody/tr[contains(.,'${name}')]`);
    await expect(row).toBeVisible({ timeout: 10000 });
    logger.info(`Record verified: ${name}`);
  }
}
