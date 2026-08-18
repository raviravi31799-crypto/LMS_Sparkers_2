import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { Browser, chromium } from "@playwright/test";
import fs from "fs";
import path from "path";
import { BasePage } from "../pages/Basepage";
import { CreateTrainingPage } from "../pages/createTrainingPage";
import { logger } from '../utils/winstonlogger';
import { CustomWorld } from "../world/world";

import { deletePage } from "../pages/deletePage";
import { exportPage } from "../pages/exportpage";
import { Filterpage } from "../pages/filterpage";

import { editPage } from "../pages/editPage";

const defaultTimeout = parseInt(process.env.CUCUMBER_TIMEOUT || '60000', 10);
setDefaultTimeout(defaultTimeout);

const HEADLESS = process.env.CI === "true" || process.env.HEADLESS === "true";

let browser: Browser;
BeforeAll({ timeout: defaultTimeout }, async () => {
    logger.info("Launching browser");
    browser = await chromium.launch({ headless: HEADLESS });
});

Before({ timeout: defaultTimeout }, async function (this: CustomWorld, scenario) {
    logger.info(`Starting scenario:${scenario.pickle.name}`);
    this.browser = browser;
    this.context = await browser.newContext();
    logger.info("Context created successfully");
    this.page = await this.context.newPage();
    logger.info("Page created successfully");
    this.basePage = new BasePage(this.page);
    this.createTrainingPage = new CreateTrainingPage(this.page);
    logger.info("Page objects created successfully");

    this.deletepage = new deletePage(this.page);
    this.filterpage = new Filterpage(this.page);
    this.ep = new exportPage(this.page);
    this.editpage = new editPage(this.page);
});

After({ timeout: defaultTimeout }, async function (this: CustomWorld, scenario) {
    if (scenario.result?.status === "FAILED") {
        const screenshotsDir = path.join(process.cwd(), "reports", "screenshots");
        fs.mkdirSync(screenshotsDir, { recursive: true });
        const screenshotPath = path.join(screenshotsDir, `${Date.now()}.png`);
        if (this.page) {
            await this.page.screenshot({ path: screenshotPath });
        }
        logger.error(`Screenshot FAILED:${scenario.pickle.name}`);
        logger.error(`Screenshot saved:${screenshotPath}`);
    } else {
        logger.info(`Scenario PASSED:${scenario.pickle.name}`);
    }
    if (this.page) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
});

AfterAll({ timeout: defaultTimeout }, async () => {
    logger.info("closing browser");
    if (browser) {
        await browser.close();
    }
});
