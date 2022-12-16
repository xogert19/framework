const { Builder, Browser } = require("selenium-webdriver");

const { browser } = require("../config/env");

class DriverSingleton {
  static driver;

  static async createDriver() {
    switch (browser) {
      case "Chrome":
        this.driver = await this.createBrowserDriver(Browser.CHROME);
        break;
      case "Firefox":
        this.driver = await this.createBrowserDriver(Browser.FIREFOX);
        break;
      default:
        this.driver = await this.createBrowserDriver(Browser.CHROME);
    }

    return this.driver;
  }

  static async createBrowserDriver(browser) {
    const driver = await new Builder().forBrowser(browser).build();
    await driver.manage().window().maximize();

    return driver;
  }

  static async killDriver() {
    await new Promise((resolve) => {
      setTimeout(async () => {
        resolve();
      }, 1000);
    });

    await this.driver.quit();
  }
}

module.exports = DriverSingleton;
