import { When, Then } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";
import { CustomWorld } from "../world/world";
import { CreateTrainingPage } from "../pages/createTrainingPage";

let createdEmpId: string;

When("the user clicks the Delete icon", { timeout: 15000 }, async function (this: CustomWorld) {

    const createTrainingPage = new CreateTrainingPage(this.page!);
    const filePath = path.join(process.cwd(), "testdata", "deleteData.json");

    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));

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

    createdEmpId = record.empId;

    console.log(`Creating employee with EMP ID: ${createdEmpId}`);

    await createTrainingPage.clickAddTraining();
    await createTrainingPage.fillForm(record);
    await createTrainingPage.clickAdd();

    console.log(`Employee created: ${createdEmpId}`);

    await this.deletepage.deleteEmployee(createdEmpId);
});


Then("the selected employee training record should not be displayed in the list", { timeout: 15000 }, async function (this: CustomWorld) {

    await this.deletepage.verifyEmployeeDeleted(createdEmpId);

});


Then("other employee training records should still be displayed", async function (this: CustomWorld) {

    const rows = this.page.locator("tbody tr");

    const count = await rows.count();

    if (count === 0) {
        throw new Error("No other employee training records are displayed");
    }

    console.log(`Other employee training records displayed: ${count}`);
});
When(
    'the user filters the records using Classroom {string}',
    { timeout: 15000 },
    async function (this: CustomWorld, classroom: string) {

        await this.deletepage.filterByClassroom(classroom);
    }
);
When(
    'the user deletes the first record from the filtered results',
    { timeout: 15000 },
    async function (this: CustomWorld) {

        await this.deletepage.deleteFirstFilteredRecord();
    }
);
Then(
    'the first record should be deleted successfully',
    { timeout: 15000 },
    async function (this: CustomWorld) {

        await this.deletepage.verifyFirstFilteredRecordDeleted();
    }
);