import { Browser, BrowserContext, Download, Page } from "@playwright/test";
import { deletePage } from "../pages/deletePage";
import { exportPage } from "../pages/exportpage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    deletepage!:deletePage;
    ep!:exportPage;
    download!:Download

}

