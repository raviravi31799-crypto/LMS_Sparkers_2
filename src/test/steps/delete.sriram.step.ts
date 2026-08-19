import { When, Then } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";
import { CustomWorld } from "../world/world";
import { CreateTrainingPage } from "../pages/createTrainingPage";
import { logger } from "../utils/winstonlogger";

let createdEmpIdSriram: string;

When("the user clicks the Delete icon for Sriram", { timeout: 30000 }, async function (this: CustomWorld) {
    logger.info("Executing delete step for Sriram");
    const createTrainingPage = new CreateTrainingPage(this.page!);
    const filePath = path.join(process.cwd(), "testdata", "deleteData_sriram.json");

    let raw: any;
    if (fs.existsSync(filePath)) {
        raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } else {
        raw = {
            projectName: "ABC",
            empId: "3001",
            employeeName: "SriramDeleteTest",
            course: "AI-DS",
            trainerName: "Sriram",
            trainingType: "Udemy",
            today: "2026-08-19",
            endDate: "2026-08-25",
            status: "In Progress",
            percentCompleted: "10"
        };
    }

    const ts = Date.now();
    const record = {
        projectName: raw.projectName,
        empId: `${raw.empId}_${ts}`,
        employeeName: raw.employeeName,
        course: raw.course,
        trainerName: raw.trainerName,
        trainingType: raw.trainingType,
        startDate: raw.today,
        endDate: raw.endDate,
        status: raw.status,
        percentCompleted: raw.percentCompleted,
    };
    createdEmpIdSriram = record.empId;
    logger.info(`[Sriram] Creating employee with EMP ID: ${createdEmpIdSriram}`);
    await createTrainingPage.clickAddTraining();
    await createTrainingPage.fillForm(record);
    await createTrainingPage.clickAdd();
    logger.info(`[Sriram] Employee created: ${createdEmpIdSriram}`);
    await this.deletepagesriram.deleteEmployee(createdEmpIdSriram);
});

Then("the selected employee training record should not be displayed in the list for Sriram", { timeout: 15000 }, async function (this: CustomWorld) {
    logger.info(`[Sriram] Verifying deletion of employee: ${createdEmpIdSriram}`);
    await this.deletepagesriram.verifyEmployeeDeleted(createdEmpIdSriram);
});
