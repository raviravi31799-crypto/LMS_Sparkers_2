import { Given, Then, When } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";
import { logger } from "../utils/winstonlogger";
import { CustomWorld } from "../world/world";

let employeeName = "";

Given("the user navigates to the Employee Training Records page", async function (this: CustomWorld) {
  await this.basePage.navigateToApp();
  await this.basePage.waitForPageLoad();
});

Given("the user clicks the Add Training button from sidebar", async function (this: CustomWorld) {
  await this.createTrainingPage.clickAddTraining();
});

When("the user enters valid employee training details", async function (this: CustomWorld) {
  const filePath = path.join(process.cwd(), "testdata", "trainingData.json");
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

  employeeName = record.employeeName;
  logger.info(`Record: ${JSON.stringify(record)}`);
  await this.createTrainingPage.fillForm(record);
});

When("the user clicks the Add button", async function (this: CustomWorld) {
  await this.createTrainingPage.clickAdd();
});

Then("the employee training record should be created successfully", async function (this: CustomWorld) {
  await this.createTrainingPage.verifyTableHasRecords();
});

Then("the employee training record should be displayed in the Employee Training list", async function (this: CustomWorld) {
  await this.createTrainingPage.verifyRecordExistsByName(employeeName);
});
