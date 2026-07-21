import{Page,expect} from "@playwright/test";
import { BasePage } from "./Basepage";
import { logger } from "../utils/winstonlogger";


export class Filterpage extends BasePage{
        constructor(page:Page){
        super(page);
    }

     private  empId = this.page.locator("//tr[2]/th[2]//input")
    private empName = this.page.locator("//tr[2]/th[3]//input")
    private  course = this.page.locator("//tr[2]/th[4]//input")
    private  trainer = this.page.locator("//tr[2]/th[5]//input")
    private  completed = this.page.locator("//tr[2]/th[10]//input")
    private  empIDCol = this.page.locator("//td[2]")
    private  empNameCol = this.page.locator("//td[3]")
    private  courseCol = this.page.locator("//td[4]")
    private  trainerCol = this.page.locator("//td[5]")
    private  completedCol = this.page.locator("//td[10]")
    private  table = this.page.locator("//tbody")


    

}