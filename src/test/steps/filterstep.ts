import { Given,When,Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";



Given('the user launched the application',{timeout:50000}, async function (this:CustomWorld) {
  await this.filterpage.launch();
});

When('the user applied {string} for different {string} such as ProjectName,EmpId,Course etc', async function (this:CustomWorld,filters, columns) {
  await this.filterpage.applyFilter(filters,columns);
});

Then('the application should display matching {string} value for applied {string}',{timeout:30000}, async function (this:CustomWorld,columns, filters) {
 await this.filterpage.Filterresults(filters,columns);
});
