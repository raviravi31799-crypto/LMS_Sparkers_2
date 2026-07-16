import { Given, Then, When } from "@cucumber/cucumber";
import fs from "fs";
import path from "path";
import { BasePage } from "../pages/Basepage";
import { CreateTrainingPage } from "../pages/createTrainingPage";
import { logger } from "../utils/winstonlogger";
import { CustomWorld } from "../world/world";


When('the user clicks the Delete icon', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the selected employee training record should not be displayed in the list', async function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});