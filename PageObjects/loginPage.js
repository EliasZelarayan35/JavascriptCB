// pageObjects/loginPage.js

class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://example.com/login';
  }

  async navigateToLoginPage() {
    await this.page.goto(this.url);
  }

  async login(user) {
    await this.page.type('#username', user.username);
    await this.page.type('#password', user.password);
    await this.page.click('#login-button');
  }
}

module.exports = { LoginPage };
