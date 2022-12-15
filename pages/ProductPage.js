const logger = require("../logger/logger");

const BasePage = require("./BasePage");

const { parsePrice } = require("../utils/utils");

class ProductPage extends BasePage {
  async addToCart() {
    logger.info("Adding product to the cart.");

    const xpath = '//button[contains(@class, "callListrak")]';
    const buttonAddToCart = await this.findByXpath(xpath);

    await this.clickOnElement(buttonAddToCart);
    await this.driver.sleep(2000);

    return this;
  }

  async getProductName() {
    logger.info("Getting name of the product.");

    const xpath = '//h1[contains(@class, "jws-rtPdt-title")]';
    const nameElements = await this.findMultipleElementsByXpath(xpath);
    const nameElement = nameElements[0];

    const name = await nameElement.getText();
    return name;
  }

  async getProductPrice() {
    logger.info("Getting price of the product.");

    const xpath = '//p[@class="jws-rtPdt-price"][contains(text(), "$")]';
    const priceElements = await this.findMultipleElementsByXpath(xpath);
    const priceElement = priceElements[0];
    const priceText = await priceElement.getText();

    return parsePrice(priceText);
  }
}

module.exports = ProductPage;
