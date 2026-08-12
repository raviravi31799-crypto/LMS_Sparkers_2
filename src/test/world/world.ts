import { Browser, BrowserContext, Page } from "@playwright/test";
import { BasePage } from "../pages/Basepage";
import { CreateTrainingPage } from "../pages/createTrainingPage";

export class CustomWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    basePage!: BasePage;
    createTrainingPage!: CreateTrainingPage;
}

