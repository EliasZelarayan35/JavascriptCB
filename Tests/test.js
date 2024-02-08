// test.js

const assert = require('assert');
const puppeteer = require('puppeteer');
const { User } = require('./model');
const { LoginPage } = require('./pageObjects/loginPage');
const fs = require('fs');
const nodemailer = require('nodemailer');

class LoginTest {
  constructor() {
    this.browser = null;
    this.page = null;
    this.report = [];
  }

  async setup() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async teardown() {
    await this.browser.close();
  }

  async captureScreenshot(stepName) {
    const screenshotPath = `screenshots/${stepName}.png`;
    await this.page.screenshot({ path: screenshotPath });
    this.report.push({ step: stepName, screenshot: screenshotPath });
  }

  async generateReport() {
    const reportPath = 'test-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(this.report, null, 2));
    console.log(`Test report generated: ${reportPath}`);
  }

  async sendEmailReport() {
    // ... (unchanged)
  }

  async run() {
    try {
      await this.setup();

      // Use the Page Object to navigate to the login page
      const loginPage = new LoginPage(this.page);
      await loginPage.navigateToLoginPage();
      await this.captureScreenshot('1_navigate_to_login_page');

      // Create a user using the model
      const user = new User('your_username', 'your_password');

      // Use the Page Object to perform actions
      await loginPage.login(user);
      await this.captureScreenshot('2_login_attempt');

      // You can add assertions or further test steps here
      const title = await this.page.title();
      assert.strictEqual(title, 'Expected Title');
      await this.captureScreenshot('3_after_assertion');

      console.log('Test passed successfully.');
      this.report.push({ step: 'Test passed successfully', status: 'pass' });
    } catch (error) {
      console.error('Test failed:', error);
      this.report.push({ step: 'Test failed', status: 'fail', error: error.toString() });
    } finally {
      await this.generateReport();
      await this.sendEmailReport();
      await this.teardown();
    }
  }
}

// Run the test
const loginTest = new LoginTest();
loginTest.run();
