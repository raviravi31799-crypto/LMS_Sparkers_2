import { Given, Then, When } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";
import { BasePage } from "../pages/Basepage";
import { CreateTrainingPage } from "../pages/createTrainingPage";
import { logger } from "../utils/winstonlogger";
import { CustomWorld } from "../world/world";
let alertMessage = "";

let basePage: BasePage;
let createTrainingPage: CreateTrainingPage;
let employeeName = "";

Given("the user navigates to the Employee Training Records page", async function (this: CustomWorld) {
  basePage = new BasePage(this.page!);
  createTrainingPage = new CreateTrainingPage(this.page!);
  await basePage.navigateToApp();
  await basePage.waitForPageLoad();
});

Given("the user clicks the Add Training button from sidebar", async function () {
  await createTrainingPage.clickAddTraining();
});

When("the user enters valid employee training details", async function () {
  const filePath = path.join(process.cwd(), "testdata", "trainingData.json");
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const ts = Date.now();
  const now = new Date();
  
  

  const record = {
  projectName: raw.projectName,
  empId: `${raw.empId}_${ts}`,
  employeeName: raw.employeeName,
  course: raw.course,
  trainerName: raw.trainerName,
  trainingType: raw.trainingType,
  startDate: raw.startDate,
  endDate: raw.endDate,
  status: raw.status,
  percentCompleted: raw.percentCompleted,
  invalidPercentCompleted: raw.invalidPercentCompleted,
};

  employeeName = record.employeeName;
  logger.info(`Record: ${JSON.stringify(record)}`);
  await createTrainingPage.fillForm(record);
});

When("the user clicks the Add button", async function () {
  await createTrainingPage.clickAdd();
});

Then("the employee training record should be created successfully", async function () {
  await createTrainingPage.verifyTableHasRecords();
});

Then("the employee training record should be displayed in the Employee Training list", async function () {
  await createTrainingPage.verifyRecordExistsByName(employeeName);
});

When('the user enters {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string}, {string} in the respective fields', async function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10) {
  // Write code here that turns the phrase above into concrete actions
  await createTrainingPage.invalForm(string, string2, string3, string4, string5, string6, string7, string8, string9, string10);

});

Then('the user click the add button so they seen the warnning alert', { timeout: 15000 }, async function () {
  // Write code here that turns the phrase above into concrete actions
  await createTrainingPage.clickAddAndGetAlert()
});

