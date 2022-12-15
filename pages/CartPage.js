const logger = require("../logger/logger");

const BasePage = require("./BasePage");

class CartPage extends BasePage {
  async getProductNameInCart() {
    logger.info("Getting name of the product in the cart.");

    const xpath = '//div[contains(@class, "p-name")]';
    const nameElement = await this.findByXpath(xpath);
    const name = await nameElement.getText();

    return name;
  }

  async checkout() {
    logger.info("Start checkout operation.");

    const xpath = '//a[@href="/checkout"][contains(@class, "TravisMathewMlogo")]';
    const checkoutButton = await this.findByXpath(xpath);
    await this.clickOnElement(checkoutButton);
  }
}

module.exports = CartPage;
