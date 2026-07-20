import { When, Then, DataTable } from "@cucumber/cucumber";
import { EditTrainingPage } from "../pages/updatePage";
import { CustomWorld } from "../world/world";
import { TrainingRecord } from "../types/training.types";

When("the user clicks the edit icon of the last employee training record",async function (this: CustomWorld) {

        const editPage = new EditTrainingPage(this.page);

        await editPage.clickLastEditIcon();
    }
);

When("the user updates the employee training details",async function (this: CustomWorld, dataTable: DataTable) {

        const editPage = new EditTrainingPage(this.page);

        const data = dataTable.rowsHash() as Partial<TrainingRecord>;

        await editPage.editTraining(data);
    }
);

When("the user clicks the Update button",async function (this: CustomWorld) {

        const editPage = new EditTrainingPage(this.page);

        await editPage.clickUpdate();
    }
);

Then("the employee training record should be updated successfully",async function (this: CustomWorld) {

        const editPage = new EditTrainingPage(this.page);

        await editPage.verifyUpdated("AI-DS Updated");
    }
);