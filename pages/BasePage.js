const { By, until } = require("selenium-webdriver");
const { FINDING_ELEMENT_TIMEOUT } = require("../config/constants");

const logger = require("../logger/logger");

class BasePage {
  constructor(driver) {
    this.driver = driver;
  }

  async openPage(url) {
    logger.info(`Opening page with url: ${url}.`);
    await this.driver.get(url);

    return this;
  }

  async getPageURL() {
    logger.info("Getting url of the current page.");

    const url = await this.driver.getCurrentUrl();

    return url;
  }

  async closeCookiePopup() {
    logger.info("Closing cookie popup.");

    const xpath = `//*[@id="onetrust-close-btn-container"]/button`;
    const element = await this.findByXpath(xpath);
    await this.clickOnElement(element);

    return this;
  }

  async findByXpath(xpath) {
    logger.info("Searching for the element via xpath.");
    return this.driver.wait(until.elementLocated(By.xpath(xpath)), FINDING_ELEMENT_TIMEOUT);
  }

  async findMultipleElementsByXpath(xpath) {
    logger.info("Searching for the elements via xpath.");
    return this.driver.wait(until.elementsLocated(By.xpath(xpath)), FINDING_ELEMENT_TIMEOUT);
  }

  async findByID(id) {
    logger.info("Searching for the element via id.");
    return this.driver.wait(until.elementLocated(By.id(id)), FINDING_ELEMENT_TIMEOUT);
  }

  async scrollToElement(element) {
    logger.info("Scrolling to the element.");
    await this.driver.executeScript("arguments[0].scrollIntoView(true)", element);
  }

  async clickOnElement(element) {
    logger.info("Clicking on the element.");
    await this.driver.executeScript("arguments[0].click()", element);
  }

  async chooseOptionInSelect(selectElement, value) {
    logger.info("Choosing element from dropdown list.");
    await this.driver.executeScript(`arguments[0].value="${value}"`, selectElement);
  }
}

module.exports = BasePage;
