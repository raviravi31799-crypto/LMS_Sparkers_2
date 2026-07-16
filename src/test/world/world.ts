import { Browser, BrowserContext, Page } from "@playwright/test";
import { deletePage } from "../pages/deletePage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    deletepage!:deletePage;

}

