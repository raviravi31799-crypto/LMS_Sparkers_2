import { expect, Page } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { TrainingRecord } from "../types/training.types";

export class EditTrainingPage {

    constructor(private page: Page) {}

    private editButton = "(//table//tbody/tr[last()]//button)[1]";

    private courseInput = "//input[@name='course']";

    private trainerNameInput = "//input[@name='trainerName']";

    private percentCompletedInput = "//input[@name='percentCompleted']";

    private statusDropdown = "//*[@id='_r_1c_']";

    private updateButton = "//*[@id='root']/div/main/div[2]/div/form/div[9]/button[2]";

    async clickLastEditIcon() {

        logger.info("Clicking last record edit icon");

        await this.page.locator(this.editButton).click();

        await this.page.waitForSelector(this.courseInput);
    }

    async selectStatus(status: string) {

        await this.page.locator(this.statusDropdown).click();

        await this.page.locator(`//li[normalize-space()='${status}']`).click();
    }

    async editTraining(data: Partial<TrainingRecord>) {

        if (data.course) {
            await this.page.locator(this.courseInput).fill(data.course);
        }

        if (data.trainerName) {
            await this.page.locator(this.trainerNameInput).fill(data.trainerName);
        }

        if (data.status) {
            await this.selectStatus(data.status);
        }

        if (data.percentCompleted) {
            await this.page.locator(this.percentCompletedInput).fill(data.percentCompleted);
        }

        logger.info("Training details edited");
    }

    async clickUpdate() {

        logger.info("Clicking Update button");

        await this.page.locator(this.updateButton).click();
    }

    async verifyUpdated(course: string) {

        await expect(this.page.locator("//table//tbody/tr[last()]"))
            .toContainText(course);

        logger.info("Updated record verified successfully");
    }
}