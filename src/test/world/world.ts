import { Browser, BrowserContext, Download, Page } from "@playwright/test";
import { deletePage } from "../pages/deletePage";
import { exportPage } from "../pages/exportpage";
import {editPage } from "../pages/editPage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    deletepage!:deletePage;
    ep!:exportPage;
    download!:Download

    editpage!:editPage;
}

