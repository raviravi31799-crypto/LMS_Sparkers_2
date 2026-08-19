import { BasePage } from "../pages/Basepage";
import { CreateTrainingPage } from "../pages/createTrainingPage";

import { Browser, BrowserContext, Download, Page } from "@playwright/test";
import { deletePage } from "../pages/deletePage";
import { DeletePageSriram } from "../pages/delete.page.sriram";
import { editPage } from "../pages/editPage";
import { exportPage } from "../pages/exportpage";
import { Filterpage } from "../pages/filterpage";


export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    basePage!: BasePage;
    createTrainingPage!: CreateTrainingPage;



    deletepage!:deletePage;
    deletepagesriram!:DeletePageSriram;
    filterpage!:Filterpage;

    ep!:exportPage;
    download!:Download

    editpage!:editPage;

}

