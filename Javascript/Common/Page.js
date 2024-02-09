class Page {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async clickToElement(element){
    await this.page.clickToElement(element);
  }

  // You can add more methods here for interacting with elements on the page
}

module.exports = Page;