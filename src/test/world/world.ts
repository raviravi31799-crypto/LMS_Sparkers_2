import { Browser, BrowserContext, Page } from "@playwright/test";
import { deletePage } from "../pages/deletePage";
import { Filterpage } from "../pages/filterpage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;


    deletepage!:deletePage;
    filterpage!:Filterpage;


}

