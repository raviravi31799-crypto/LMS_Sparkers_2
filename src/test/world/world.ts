import { Browser, BrowserContext, Page } from "@playwright/test";
import { deletePage } from "../pages/deletePage";
import {editPage } from "../pages/editPage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    deletepage!:deletePage;
    editpage!:editPage;
}

