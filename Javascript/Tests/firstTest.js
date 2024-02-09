const puppeteer = require('puppeteer');
const Page = require('../Common/Page');

async function automateBrowser() {
  // Launch a headless browser
  const browser = await puppeteer.launch({ headless: false });

  // Open a new page
  const page = await browser.newPage();

  // Create an instance of the Page class
  const myPage = new Page(page);

  // Use the Page object to navigate to the desired web page
  await myPage.navigateTo('https://en.wikipedia.org');

  // You can perform additional automation actions using methods in the Page class

  // Close the browser
  await browser.close();
}

// Call the function to run the automation
automateBrowser();