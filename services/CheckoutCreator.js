const TestDataReader = require("../services/TestDataReader");

const Checkout = require("../model/Checkout");

class CheckoutCreator {
  static async getInformationFromProperties() {
    const checkoutProperties = await TestDataReader.getTestData("checkout.properties");
    for (const key in checkoutProperties) {
      this[key] = checkoutProperties[key];
    }

    return this;
  }

  static async withInformationFromProperties() {
    await this.getInformationFromProperties();

    return new Checkout(
      this.firstName,
      this.lastName,
      this.address,
      this.city,
      this.state,
      this.zip,
      this.phoneNumber,
      this.email,
      this.firstNameXpath,
      this.lastNameXpath,
      this.addressXpath,
      this.cityXpath,
      this.stateXpath,
      this.zipXpath,
      this.phoneNumberXpath,
      this.emailXpath,
      this.saveAndContinueButtonXpath,
      this.totalPriceXpath,
      this.stateValue
    );
  }
}

module.exports = CheckoutCreator;
