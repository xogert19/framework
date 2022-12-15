const { Builder, Browser } = require("selenium-webdriver");

const { browser } = require("../config/env");

class DriverSingleton {
  static driver;

  static async createDriver() {
    const capabilities = {
      "bstack:options": {
        os: "Windows",
        osVersion: "10",
        browserVersion: "latest",
        buildName: "browserstack-build-1",
        sessionName: "Parallel test 1",
      },
      browserName: browser,
    };

    // switch (browser) {
    //   case "chrome":
    //     this.driver = await this.createBrowserDriver(Browser.CHROME);
    //     break;
    //   case "firefox":
    //     this.driver = await this.createBrowserDriver(Browser.FIREFOX);
    //     break;
    //   default:
    //     this.driver = await this.createBrowserDriver(Browser.CHROME);
    // }

    this.driver = await new Builder()
      .usingServer("http://siarhei_PZnKCE:uC6xmcW8zPMtWKaMB2xR@hub-cloud.browserstack.com/wd/hub")
      .withCapabilities({
        ...capabilities,
        ...(capabilities["browser"] && { browserName: capabilities["browser"] }),
      })
      .build();

    await this.driver.manage().window().maximize();

    return this.driver;
  }

  // static async createBrowserDriver(browser) {
  //   const driver = await new Builder().forBrowser(browser).build();
  //   await driver.manage().window().maximize();

  //   return driver;
  // }

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
