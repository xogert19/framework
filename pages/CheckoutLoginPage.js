const logger = require("../logger/logger");

const BasePage = require("./BasePage");

class CheckoutLoginPage extends BasePage {
  async loginAsGuest() {
    logger.info("Choosing 'Login as Guest' option.");

    const xpath = '//button[text()="Continue as Guest"]';
    const loginButton = this.findByXpath(xpath);
    await this.clickOnElement(loginButton);

    return this;
  }
}

module.exports = CheckoutLoginPage;
