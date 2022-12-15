const logger = require("../logger/logger");

const UserCreator = require("../services/UserCreator");

const BasePage = require("./BasePage");

class MainPage extends BasePage {
  static loginData;

  async getUserData() {
    logger.info("Getting correct user info.");
    MainPage.loginData = await UserCreator.withCredentialsFromProperties();
  }

  async getUserDataWithoutEmail() {
    logger.info("Getting user info without email.");
    MainPage.loginData = await UserCreator.getUserWithoutEmail();
  }

  async getUserDataWithoutPassword() {
    logger.info("Getting user info without password.");
    MainPage.loginData = await UserCreator.getUserWithoutPassword();
  }

  async login() {
    logger.info("Start login operation.");

    const xpath = '//a[@onClick="myLogin(true)"][@href="javascript:;"]';
    const loginButton = await this.findByXpath(xpath);
    await this.clickOnElement(loginButton);
  }

  async fulfillEmail() {
    logger.info("Fulfilling email.");

    const xpath = '//input[@id="gigya-loginID-122484309501181060"]';
    const emailInput = await this.findByXpath(xpath);

    await emailInput.sendKeys(MainPage.loginData.getEmail());
  }

  async fulfillPassword() {
    logger.info("Fulfilling password.");

    const xpath =
      '//input[@id="gigya-password-19356590126672680"][@data-screenset-element-id="gigya-password-19356590126672680"]';
    const passwordInput = await this.findByXpath(xpath);

    await passwordInput.sendKeys(MainPage.loginData.getPassword());
  }

  async signin() {
    logger.info("Click on 'Sign in' button.");

    const xpath = '//input[@value="SIGN IN"]';
    const signinButton = await this.findByXpath(xpath);
    await this.clickOnElement(signinButton);
  }

  async getGreeting() {
    logger.info("Getting greeting for logged in user.");

    const xpath = '//a[@href="/my-account/view"][@class="status-anchor"]';
    const linkToAccountView = await this.findByXpath(xpath);
    const greeting = await linkToAccountView.getText();

    return greeting;
  }
}

module.exports = MainPage;
