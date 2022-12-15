const { expect } = require("chai");

const DriverSingleton = require("../driver/DriverSingleton");

const TestDataReader = require("../services/TestDataReader");

const CartPage = require("../pages/CartPage");
const ProductPage = require("../pages/ProductPage");
const CheckoutPage = require("../pages/CheckoutPage");
const CheckoutLoginPage = require("../pages/CheckoutLoginPage");

const { TESTCASE_TIMEOUT } = require("../config/constants");
const { makeScreenshot, calculatePricesWithTax } = require("../utils/utils");

describe("Filter items in catalog.", () => {
  before(async () => {
    const checkoutProperties = await TestDataReader.getTestData("checkout.properties");
    const productProperties = await TestDataReader.getTestData("product.properties");
    const cartProperties = await TestDataReader.getTestData("cart.properties");
    const taxesProperties = await TestDataReader.getTestData("taxes.properties");
    for (const key in checkoutProperties) {
      this[key] = checkoutProperties[key];
    }
    for (const key in productProperties) {
      this[key] = productProperties[key];
    }
    for (const key in cartProperties) {
      this[key] = cartProperties[key];
    }
    for (const key in taxesProperties) {
      this[key] = Number(taxesProperties[key]);
    }
  });

  beforeEach(async () => {
    this.driver = await DriverSingleton.createDriver();
  });

  it("Should check if total cost changes when shipping to a specific state.", async () => {
    const testMessage = "Should check if total cost changes when shipping to a specific state";
    try {
      // Adding backpack to the cart
      const productPageUrl = this.backpackUrl;
      const cartPageUrl = this.cartPageUrl;

      const productPage = new ProductPage(this.driver);
      await productPage.openPage(productPageUrl);
      await productPage.closeCookiePopup();

      const price = await productPage.getProductPrice();

      await productPage.addToCart();

      // Going to cart page & start checkout operation
      const cartPage = new CartPage(this.driver);
      cartPage.openPage(cartPageUrl);

      await this.driver.sleep(1000);

      cartPage.checkout();

      // Fulfilling checkout data
      const checkoutLoginPage = new CheckoutLoginPage(this.driver);
      await checkoutLoginPage.loginAsGuest();

      const checkoutPage = new CheckoutPage(this.driver);
      await checkoutPage.getCheckoutData();
      await checkoutPage.fulfillFirstName();
      await checkoutPage.fulfillLastName();
      await checkoutPage.fulfillAddress();
      await checkoutPage.fulfillCity();
      await checkoutPage.fulfillState();
      await checkoutPage.fulfillZip();
      await checkoutPage.fulfillPhoneNumber();
      await checkoutPage.fulfillEmail();
      await checkoutPage.saveAndContinue();

      const totalPrice = await checkoutPage.getTotalPrice();

      const [minPrice, maxPrice] = calculatePricesWithTax(price, this.texasStateTax, this.texasMaxLocalTax);
      expect(totalPrice).to.be.greaterThanOrEqual(minPrice);
      expect(totalPrice).to.be.lessThanOrEqual(maxPrice);
    } catch {
      makeScreenshot(this.driver, testMessage);

      throw new Error(`Test failed: ${testMessage}`);
    }
  }).timeout(TESTCASE_TIMEOUT);

  afterEach(async () => {
    await DriverSingleton.killDriver();
  });
});
