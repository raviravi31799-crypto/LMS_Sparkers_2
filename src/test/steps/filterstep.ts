import { Given,When,Then } from "@cucumber/cucumber";
import { CustomWorld } from "../world/world";
import invalidfiltersdata from "../../../testdata/invalidfilterdata.json";
import { logger } from "../utils/winstonlogger";
import {expect} from "@playwright/test";


Given('the user launched the application',{timeout:50000}, async function (this:CustomWorld) {
  await this.filterpage.launch();
});

When('the user applied {string} for different {string} such as ProjectName,EmpId,Course etc', async function (this:CustomWorld,filters, columns) {
  await this.filterpage.applyFilter(filters,columns);
});

Then('the application should display matching {string} value for applied {string}',{timeout:30000}, async function (this:CustomWorld,columns, filters) {
 await this.filterpage.Filterresults(filters,columns);
});
When('the user applies invalid filters from JSON', async function (this:CustomWorld) {
  

      
        this.filterResults = [];

        for (const data of invalidfiltersdata.invalidfilters) {

            logger.info(`Applying ${data.filters} = ${data.columns}`
            );

            await this.filterpage.applyFilter(
                data.filters,
                data.columns
            );

            // Wait for the UI to update, if required
            await this.page.waitForTimeout(500);

            const count = await this.filterpage.getRecordCount();

            this.filterResults.push({
                filters: data.filters,
                columns: data.columns,
                count: count
            });

           await this.filterpage.clearFilters();
        }
    }

);
        
    



Then('the application should not display any matching records',{ timeout: 50000 }, async function (this:CustomWorld) {
 for (const result of this.filterResults) {

     // logger.info(`${result.filters} = ${result.columns} → ${result.count} records`);
       logger.info("Then executed");
      expect(result.count).toBe(0);
    }
  }
);


