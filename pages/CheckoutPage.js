const logger = require("../logger/logger");

const CheckoutCreator = require("../services/CheckoutCreator");

const { parsePrice } = require("../utils/utils");

const BasePage = require("./BasePage");

class CheckoutPage extends BasePage {
  static checkout;

  async getCheckoutData() {
    logger.info("Getting checkout data from properties.");

    CheckoutPage.checkout = await CheckoutCreator.withInformationFromProperties();
  }

  async fulfillField(xpath, data) {
    logger.info("Fulfilling field with data.");
    const field = await this.findByXpath(xpath);
    await field.sendKeys(data);
  }

  async fulfillFirstName() {
    const xpath = CheckoutPage.checkout.getFirstNameXpath();
    const data = CheckoutPage.checkout.getFirstName();
    await this.fulfillField(xpath, data);
  }

  async fulfillLastName() {
    const xpath = CheckoutPage.checkout.getLastNameXpath();
    const data = CheckoutPage.checkout.getLastName();
    await this.fulfillField(xpath, data);
  }

  async fulfillAddress() {
    const xpath = CheckoutPage.checkout.getAddressXpath();
    const data = CheckoutPage.checkout.getAddress();
    await this.fulfillField(xpath, data);
  }

  async fulfillCity() {
    const xpath = CheckoutPage.checkout.getCityXpath();
    const data = CheckoutPage.checkout.getCity();
    await this.fulfillField(xpath, data);
  }

  async fulfillZip() {
    const xpath = CheckoutPage.checkout.getZipXpath();
    const data = CheckoutPage.checkout.getZip();
    await this.fulfillField(xpath, data);
  }

  async fulfillPhoneNumber() {
    const xpath = CheckoutPage.checkout.getPhoneNumberXpath();
    const data = CheckoutPage.checkout.getPhoneNumber();
    await this.fulfillField(xpath, data);
  }

  async fulfillEmail() {
    const xpath = CheckoutPage.checkout.getEmailXpath();
    const data = CheckoutPage.checkout.getEmail();
    await this.fulfillField(xpath, data);
  }

  async fulfillState() {
    const xpath = CheckoutPage.checkout.getStateXpath();
    const stateSelect = await this.findByXpath(xpath);
    const state = CheckoutPage.checkout.getStateValue();
    await this.chooseOptionInSelect(stateSelect, state);
  }

  async saveAndContinue() {
    logger.info("Click on 'Save and Continue' button.");

    const xpath = CheckoutPage.checkout.getSaveAndContinueButtonXpath();
    const submitButton = await this.findByXpath(xpath);
    await this.clickOnElement(submitButton);
  }

  async getTotalPrice() {
    logger.info("Getting total price of the product.");

    const xpath = CheckoutPage.checkout.getTotalPriceXpath();
    const totalPriceElements = await this.findMultipleElementsByXpath(xpath);
    const totalPriceElement = totalPriceElements[1];
    const totalPriceText = await totalPriceElement.getText();

    return parsePrice(totalPriceText);
  }
}

module.exports = CheckoutPage;
