import { Given,When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import deleteData from "../../../testdata/deleteData.json";

When('the user clicks the Delete icon', async function (this: CustomWorld) {
    await this.deletepage.deleteEmployee(deleteData.empId);
});

Then('the selected employee training record should not be displayed in the list', async function (this: CustomWorld) {
    await this.deletepage.verifyEmployeeDeleted(deleteData.empId);
});