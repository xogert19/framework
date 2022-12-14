const { expect } = require("chai");

const DriverSingleton = require("../driver/DriverSingleton");

const TestDataReader = require("../services/TestDataReader");

const CartPage = require("../pages/CartPage");
const ProductPage = require("../pages/ProductPage");

const { TESTCASE_TIMEOUT } = require("../config/constants");
const { makeScreenshot } = require("../utils/utils");

describe("Filter items in catalog.", () => {
  before(async () => {
    const productProperties = await TestDataReader.getTestData("product.properties");
    const cartProperties = await TestDataReader.getTestData("cart.properties");
    for (const key in productProperties) {
      this[key] = productProperties[key];
    }
    for (const key in cartProperties) {
      this[key] = cartProperties[key];
    }
  });

  beforeEach(async () => {
    this.driver = await DriverSingleton.createDriver();
  });

  it("Should add backpack to cart.", async () => {
    const testMessage = "Should add backpack to cart";
    try {
      const productPageUrl = this.backpackUrl;
      const cartPageUrl = this.cartPageUrl;

      const productPage = new ProductPage(this.driver);
      await productPage.openPage(productPageUrl);
      await productPage.closeCookiePopup();

      const productNameInProductPage = await productPage.getProductName();
      await productPage.addToCart();

      const cartPage = new CartPage(this.driver);
      cartPage.openPage(cartPageUrl);

      const productNameInCartPage = await cartPage.getProductNameInCart();

      expect(productNameInProductPage).to.be.equal(productNameInCartPage);
    } catch {
      makeScreenshot(this.driver, testMessage);

      throw new Error(`Test failed: ${testMessage}`);
    }
  }).timeout(TESTCASE_TIMEOUT);

  afterEach(async () => {
    await DriverSingleton.killDriver();
  });
});
