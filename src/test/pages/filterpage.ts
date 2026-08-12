import{Page,expect} from "@playwright/test";
import { BasePage } from "./Basepage";
import { logger } from "../utils/winstonlogger";


export class Filterpage extends BasePage{
        constructor(page:Page){
        super(page);
    }
    private project = this.page.locator("//tr[2]/th[1]//input");
    private  empId = this.page.locator("//tr[2]/th[2]//input")
    private empName = this.page.locator("//tr[2]/th[3]//input")
    private  course = this.page.locator("//tr[2]/th[4]//input")
    private  trainer = this.page.locator("//tr[2]/th[5]//input")
    
    private projectCol = this.page.locator("//td[1]");
    private  empIDCol = this.page.locator("//td[2]")
    private  empNameCol = this.page.locator("//td[3]")
    private  courseCol = this.page.locator("//td[4]")
    private  trainerCol = this.page.locator("//td[5]")
   
    
     


    async launch(){
        await this.navigateToApp();
        logger.info("Launched to application successfully");
    }

    async applyFilter(filters:string,columns: string) {

    switch(filters){
        case "Project":
            await this.project.fill(columns);
            logger.info("Filtering records using Project");
            break;
        case "EmpId":
            await this.empId.fill(columns);
            logger.info("applying filter to EmpId");
            break;
        case "Student":
            await this.empName.fill(columns);
            logger.info("Filtering records with StudentName");
            break;
        case "Course":
            await this.course.fill(columns);
            logger.info("Filtering records with Course");
            break;
        case "Trainer":
            await this.trainer.fill(columns);
            logger.info("Filtering records using TrainerName");
            break;
    
    }
}
    async Filterresults(filters:string,columns:string){

    switch(filters){
        case "Project":
             await expect(this.projectCol.first()).toContainText(columns);
             logger.info("Records are filtered successfully using Project");
             break;

        case "EmpId":
            await expect(this.empIDCol.first()).toContainText(columns);
            logger.info("Records are filtered successfully with EmpId");
            break;
        case "Student":
            await expect(this.empNameCol.first()).toContainText(columns);
            logger.info("Records are filtered using StudentNames successfully");
            break;
        case "Course":
            await expect(this.courseCol.first()).toContainText(columns);
            logger.info("Course filtering is successful")
            break;
        case "Trainer":
            await expect(this.trainerCol.first()).toContainText(columns);
            logger.info("Records are filtered using Trainername");
            break;
    }
    }
}


