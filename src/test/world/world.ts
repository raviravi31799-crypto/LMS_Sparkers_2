import { BasePage } from "../pages/Basepage";
import { CreateTrainingPage } from "../pages/createTrainingPage";

import { Browser, BrowserContext, Download, Page } from "@playwright/test";
import { deletePage } from "../pages/deletePage";
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
    filterpage!:Filterpage;

    ep!:exportPage;
    download!:Download

    editpage!:editPage;

    filterResults: {
        filters: string;
        columns: string;
        count: number;
    }[] = [];

}

