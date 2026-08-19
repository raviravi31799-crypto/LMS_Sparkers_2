import { expect, Page } from "@playwright/test";
import { logger } from "../utils/winstonlogger";
import { TrainingRecord } from "../types/training.types";

export class EditTrainingPage {

    constructor(private page: Page) {}

    // Last employee record -> first button = Edit
    private editButton = "(//table//tbody/tr[last()]//button)[1]";

    // Form fields
    private courseInput = "//input[@name='course']";
    private trainerNameInput = "//input[@name='trainerName']";
    private percentCompletedInput = "//input[@name='percentCompleted']";

    // TODO: Replace this with a stable locator after checking the HTML
    private statusDropdown = "//*[@id='_r_1c_']";

    // Prefer button text instead of absolute XPath
    private updateButton = "//button[normalize-space()='Update']";

    // TODO: Replace this with the actual validation-message locator
    private courseValidationMessage =
        "//*[@id='root']/div/main/div[2]/div[3]/table/tbody/tr[129]";


    async clickLastEditIcon() {

        logger.info("Clicking last record edit icon");

        const editButton = this.page.locator(this.editButton);

        await expect(editButton).toBeVisible({ timeout: 10000 });

        await editButton.click();

        logger.info("Last record edit icon clicked");

        const courseInput = this.page.locator(this.courseInput);

        await expect(courseInput).toBeVisible({ timeout: 10000 });

        logger.info("Edit form displayed successfully");
    }


    async selectStatus(status: string) {

        logger.info(`Selecting status: ${status}`);

        const dropdown = this.page.locator(this.statusDropdown);

        await expect(dropdown).toBeVisible({ timeout: 10000 });

        await dropdown.click();

        const option = this.page.locator(
            `//li[normalize-space()='${status}']`
        );

        await expect(option).toBeVisible({ timeout: 10000 });

        await option.click();

        logger.info(`Status selected: ${status}`);
    }


    async editTraining(data: Partial<TrainingRecord>) {

        logger.info("Starting to edit training details");


        // Course
        // IMPORTANT:
        // !== undefined allows empty string ""
        // This is required for the negative test.
        if (data.course !== undefined) {

            logger.info(`Updating course: "${data.course}"`);

            const courseInput = this.page.locator(this.courseInput);

            await expect(courseInput).toBeVisible({ timeout: 10000 });

            await courseInput.fill(data.course);
        }


        // Trainer name
        if (data.trainerName !== undefined) {

            logger.info(`Updating trainer name: "${data.trainerName}"`);

            const trainerInput =
                this.page.locator(this.trainerNameInput);

            await expect(trainerInput).toBeVisible({ timeout: 10000 });

            await trainerInput.fill(data.trainerName);
        }


        // Status
        if (data.status !== undefined) {

            await this.selectStatus(data.status);
        }


        // Percentage
        if (data.percentCompleted !== undefined) {

            logger.info(
                `Updating percentage: "${data.percentCompleted}"`
            );

            const percentInput =
                this.page.locator(this.percentCompletedInput);

            await expect(percentInput).toBeVisible({ timeout: 10000 });

            await percentInput.fill(data.percentCompleted);
        }


        logger.info("Training details edited successfully");
    }


    async clickUpdate() {

        logger.info("Clicking Update button");

        const updateButton = this.page.locator(this.updateButton);

        await expect(updateButton).toBeVisible({ timeout: 30000 });

        await expect(updateButton).toBeEnabled({ timeout: 10000 });

        await updateButton.click();

        logger.info("Update button clicked");
    }


    async verifyUpdated(course: string) {

        logger.info(`Verifying updated course: ${course}`);

        const lastRow = this.page.locator(
            "//table//tbody/tr[last()]"
        );

        await expect(lastRow).toBeVisible({ timeout: 10000 });

        await expect(lastRow).toContainText(course, {
            timeout: 10000
        });

        logger.info("Updated record verified successfully");
    }


    async verifyCourseValidationMessage() {

        logger.info("Verifying course validation message");

        const validationMessage =
            this.page.locator(this.courseValidationMessage);

        await expect(validationMessage).toBeVisible({
            timeout: 10000
        });

        logger.info(
            "Course validation message displayed successfully"
        );
    }
}