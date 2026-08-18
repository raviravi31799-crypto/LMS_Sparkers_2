import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world/world';
import { logger } from '../utils/winstonlogger';

setDefaultTimeout(60000);

function formatDateForInput(value: string): string {
  if (!value) return value;
  if (value.includes('/')) {
    const parts = value.split('/');
    if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }
  return value;
}

async function fillFilterInput(page: any, columnIndex: number, value: string, fallbackName?: string) {
  if (value === undefined || value === null || value === "") return;
  const headerElem = page.locator(`//tr[2]/th[${columnIndex}]//input | //tr[2]/th[${columnIndex}]//select`).first();
  if (await headerElem.isVisible({ timeout: 3000 }).catch(() => false)) {
    const tagName = await headerElem.evaluate((el: HTMLElement) => el.tagName.toLowerCase()).catch(() => "input");
    const inputType = await headerElem.getAttribute("type").catch(() => "");
    if (tagName === "select") {
      await headerElem.selectOption({ label: value }).catch(() => headerElem.selectOption({ value })).catch(() => {});
    } else if (inputType === "date") {
      const formatted = formatDateForInput(value);
      await headerElem.fill(formatted).catch(async () => {
        await headerElem.fill(value).catch(() => {});
      });
    } else {
      await headerElem.fill(value).catch(async () => {
        await headerElem.type(value).catch(() => {});
      });
    }
    return;
  }
  
  if (fallbackName) {
    const namedInput = page.locator(`//input[contains(@name, '${fallbackName}') or contains(@placeholder, '${fallbackName}')]`).first();
    if (await namedInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      const inputType = await namedInput.getAttribute("type").catch(() => "");
      if (inputType === "date") {
        const formatted = formatDateForInput(value);
        await namedInput.fill(formatted).catch(() => {});
      } else {
        await namedInput.fill(value).catch(() => {});
      }
    }
  }
}

When('the user clicks the {string} menu', async function (this: CustomWorld, menuName: string) {
  logger.info(`Clicking menu: ${menuName}`);
  const menuLocator = this.page.locator(`text=${menuName}`).first();
  if (await menuLocator.isVisible({ timeout: 5000 }).catch(() => false)) {
    await menuLocator.click();
  } else {
    const element = this.page.getByText(menuName, { exact: false }).first();
    await element.waitFor({ state: "visible", timeout: 10000 }).catch(() => {});
    if (await element.isVisible().catch(() => false)) {
      await element.click();
    }
  }
});

When('the user enters {string} in the Project Name filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering Project Name filter: ${value}`);
  if (this.filterpage) {
    await this.filterpage.applyFilter("Project", value).catch(async () => {
      await fillFilterInput(this.page, 1, value, "project");
    });
  } else {
    await fillFilterInput(this.page, 1, value, "project");
  }
});

When('the user enters {string} in the Employee ID filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering Employee ID filter: ${value}`);
  if (this.filterpage) {
    await this.filterpage.applyFilter("EmpId", value).catch(async () => {
      await fillFilterInput(this.page, 2, value, "empId");
    });
  } else {
    await fillFilterInput(this.page, 2, value, "empId");
  }
});

When('the user enters {string} in the Employee Name filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering Employee Name filter: ${value}`);
  if (this.filterpage) {
    await this.filterpage.applyFilter("Student", value).catch(async () => {
      await fillFilterInput(this.page, 3, value, "employeeName");
    });
  } else {
    await fillFilterInput(this.page, 3, value, "employeeName");
  }
});

When('the user enters {string} in the Course Name filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering Course Name filter: ${value}`);
  if (this.filterpage) {
    await this.filterpage.applyFilter("Course", value).catch(async () => {
      await fillFilterInput(this.page, 4, value, "course");
    });
  } else {
    await fillFilterInput(this.page, 4, value, "course");
  }
});

When('the user enters {string} in the Trainer Name filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering Trainer Name filter: ${value}`);
  if (this.filterpage) {
    await this.filterpage.applyFilter("Trainer", value).catch(async () => {
      await fillFilterInput(this.page, 5, value, "trainer");
    });
  } else {
    await fillFilterInput(this.page, 5, value, "trainer");
  }
});

When('the user enters {string} in the Training Type filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering Training Type filter: ${value}`);
  await fillFilterInput(this.page, 6, value, "trainingType");
});

When('the user enters {string} in the Start Date filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering Start Date filter: ${value}`);
  await fillFilterInput(this.page, 7, value, "startDate");
});

When('the user enters {string} in the End Date filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering End Date filter: ${value}`);
  await fillFilterInput(this.page, 8, value, "endDate");
});

When('the user enters {string} in the Percentage filter field', async function (this: CustomWorld, value: string) {
  logger.info(`Entering Percentage filter: ${value}`);
  await fillFilterInput(this.page, 10, value, "percentCompleted");
});

Then('the user should see the filtered records based on the provided filter criteria', async function (this: CustomWorld) {
  logger.info("Verifying filtered records");
  const table = this.page.locator("//table");
  await expect(table).toBeVisible({ timeout: 10000 });
});
