const { expect } = require("chai");

const DriverSingleton = require("../driver/DriverSingleton");

const TestDataReader = require("../services/TestDataReader");

const MainPage = require("../pages/MainPage");

const { TESTCASE_TIMEOUT } = require("../config/constants");
const { makeScreenshot } = require("../utils/utils");

describe("Filter items in catalog.", () => {
  before(async () => {
    const userProperties = await TestDataReader.getTestData("user.properties");
    for (const key in userProperties) {
      this[key] = userProperties[key];
    }
  });

  beforeEach(async () => {
    this.driver = await DriverSingleton.createDriver();
  });

  it("Should login correctly", async () => {
    const testMessage = "Should login correctly";
    try {
      const pageUrl = this.loginPageUrl;

      const mainPage = new MainPage(this.driver);
      await mainPage.getUserData();
      await mainPage.openPage(pageUrl);
      await mainPage.closeCookiePopup();
      await mainPage.login();
      await mainPage.fulfillEmail();
      await mainPage.fulfillPassword();
      await mainPage.signin();

      const greeting = await mainPage.getGreeting();

      expect(greeting).to.be.contain(`Hi ${this.username}`);
    } catch {
      makeScreenshot(this.driver, testMessage);

      throw new Error(`Test failed: ${testMessage}`);
    }
  }).timeout(TESTCASE_TIMEOUT);

  it("Should fail login because of empty field", async () => {
    const testMessage = "Should fail login because of empty field";
    try {
      const pageUrl = this.loginPageUrl;

      const mainPage = new MainPage(this.driver);
      await mainPage.getUserDataWithoutEmail();
      await mainPage.openPage(pageUrl);
      await mainPage.closeCookiePopup();
      await mainPage.login();
      await mainPage.fulfillEmail();
      await mainPage.fulfillPassword();
      await mainPage.signin();

      const greeting = await mainPage.getGreeting();
      expect(greeting).to.be.contain(`Hi ${this.username}`);
    } catch {
      makeScreenshot(this.driver, testMessage);

      throw new Error(`Test failed: ${testMessage}`);
    }
  }).timeout(TESTCASE_TIMEOUT);

  it("Should fail login because of empty password", async () => {
    const testMessage = "Should fail login because of empty password";
    try {
      const pageUrl = this.loginPageUrl;

      const mainPage = new MainPage(this.driver);
      await mainPage.getUserDataWithoutPassword();
      await mainPage.openPage(pageUrl);
      await mainPage.closeCookiePopup();
      await mainPage.login();
      await mainPage.fulfillEmail();
      await mainPage.fulfillPassword();
      await mainPage.signin();

      const greeting = await mainPage.getGreeting();
      expect(greeting).to.be.contain(`Hi ${this.username}`);
    } catch {
      makeScreenshot(this.driver, testMessage);

      throw new Error(`Test failed: ${testMessage}`);
    }
  }).timeout(TESTCASE_TIMEOUT);

  it("Should fail login because of wrong password", async () => {
    const testMessage = "Should fail login because of wrong password";
    try {
      const pageUrl = this.loginPageUrl;

      const mainPage = new MainPage(this.driver);
      await mainPage.getUserDataWithWrongPassword();
      await mainPage.openPage(pageUrl);
      await mainPage.closeCookiePopup();
      await mainPage.login();
      await mainPage.fulfillEmail();
      await mainPage.fulfillPassword();
      await mainPage.signin();

      const greeting = await mainPage.getGreeting();
      expect(greeting).to.be.contain(`Hi ${this.username}`);
    } catch {
      makeScreenshot(this.driver, testMessage);

      throw new Error(`Test failed: ${testMessage}`);
    }
  }).timeout(TESTCASE_TIMEOUT);

  afterEach(async () => {
    await DriverSingleton.killDriver();
  });
});
