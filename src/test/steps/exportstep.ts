import { Given,When, Then } from "@cucumber/cucumber";
import {expect} from '@playwright/test' 
import { CustomWorld } from "../world/world";

When('the user clicks the Export to Excel button', async function (this: CustomWorld) {
    this.download = await this.ep.clickExportButton();
});

Then('the Excel file should be downloaded successfully', async function (this: CustomWorld) {
    expect(this.download).toBeTruthy();
});
