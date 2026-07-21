import { When, Then, DataTable } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import { TrainingRecord } from "../types/training.types";
import { readCSV } from "../utils/csvReader";

let csvData: TrainingRecord;
let fields: string[] = [];

When("the user clicks the edit icon for the employee training record",{timeout:30000},async function (this: CustomWorld) {
    const data = readCSV<TrainingRecord>("editData.csv");
    csvData = data[0]!;
    await this.editpage.clickEditIcon(csvData.employeeName);
  }
);

When("updates the following fields",{timeout:60000},async function (this: CustomWorld, table: DataTable) {
    fields = table.hashes().map((row) => row.Field!);
    await this.editpage.updateFields(fields, csvData);
  }
);

When("clicks the Update button", async function () {
    await this.editpage.clickUpdate();
});

Then("the training record list should display the updated values",{timeout:50000},async function () {
    await this.editpage.verifyUpdatedRecord(csvData, fields);
  }
);