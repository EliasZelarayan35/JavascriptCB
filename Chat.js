const { Builder, By, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const edge = require('selenium-webdriver/edge');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class DriverManager {
    constructor() {
        this.driver = null;
    }

    static async getDriver(browser = 'chrome') {
        if (!this.driver) {
            this.driver = await new DriverManager()._createDriver(browser);
            await this.driver.manage().window().maximize();
            await this._log('Driver maximized');
        }
        return this.driver;
    }

    async _createDriver(browser) {
        let driver;
        switch (browser) {
            case 'chrome':
                driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).build();
                break;
            case 'firefox':
                driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options().headless()).build();
                break;
            case 'edge':
                driver = await new Builder().forBrowser('edge').setEdgeOptions(new edge.Options().headless()).build();
                break;
            default:
                throw new Error('Unsupported browser');
        }
        return driver;
    }

    static async _log(message) {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const logFileName = `TestResults/${timestamp}_log.txt`;
        const logMessage = `${timestamp} - ${message}\n`;
        fs.appendFileSync(logFileName, logMessage);
        const screenshot = await this.driver.takeScreenshot();
        fs.writeFileSync(`TestResults/${timestamp}_screenshot.png`, screenshot, 'base64');
    }
}

class WikipediaPage {
    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get('https://www.wikipedia.org');
        await DriverManager._log('STEP: Opened Wikipedia');
    }

    async search(query) {
        const searchInput = await this.driver.findElement(By.name('search'));
        await searchInput.sendKeys(query, Key.RETURN);
        await DriverManager._log(`STEP: Searched for '${query}'`);
    }

    async verifyResultsPage() {
        const title = await this.driver.getTitle();
        if (!title.includes('Search results for')) {
            throw new Error('Not on the results page');
        }
        await DriverManager._log('STEP: Verified results page');
    }
}

async function basicTest() {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const logFileName = `TestResults/basic_test_${timestamp}.txt`;
    fs.writeFileSync(logFileName, ''); // Creating empty log file

    try {
        const driver = await DriverManager.getDriver();
        const wikiPage = new WikipediaPage(driver);

        await wikiPage.open();
        await wikiPage.search('elias');
        await wikiPage.verifyResultsPage();

        fs.appendFileSync(logFileName, 'Basic Test: Passed');
    } catch (error) {
        fs.appendFileSync(logFileName, `Basic Test: Failed - ${error.message}`);
    }
}

// Create TestResults folder if not exists
const testResultsFolderPath = path.join(__dirname, 'TestResults');
if (!fs.existsSync(testResultsFolderPath)) {
    fs.mkdirSync(testResultsFolderPath);
}

basicTest();
