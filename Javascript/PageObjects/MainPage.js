class MainPage {
    constructor(mainPage) {
      this.mainPage = mainPage;
    }
  
    async performSearch(url) {
        await this.mainPage.element(searchInput).sen
      await this.mainPage.goto(url);
    }
  
    async clickToElement(element){
      await this.mainPage.clickToElement(element);
    }
  
    // You can add more methods here for interacting with elements on the page
  }