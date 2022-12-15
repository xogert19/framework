const logger = require("../logger/logger");

const BasePage = require("./BasePage");

class CatalogPage extends BasePage {
  async selectColorFilter(color) {
    logger.info(`Applying filter: ${color} color.`);

    const xpath = `//input[contains(@value, "${color}") and contains(@class, "js-desktop-color-facet-input")]`;
    const element = await this.findByXpath(xpath);
    await this.scrollToElement(element);
    await this.clickOnElement(element);

    return this;
  }

  async selectSizeFilter(size) {
    logger.info(`Applying filter: ${size} size.`);

    const xpath = `//input[contains(@value, "${size}") and contains(@class, "js-desktop-size-facet")]`;
    const element = await this.findByXpath(xpath);
    await this.scrollToElement(element);
    await this.clickOnElement(element);

    return this;
  }

  async countFilters() {
    logger.info("Counting number of applied filters.");

    const filtersxpath = '//div[@class="row b--filtered b--desktop"]//span[@class="jws-fltrBox"]';
    const filters = await this.findMultipleElementsByXpath(filtersxpath);

    return filters.length;
  }

  async clearFilters() {
    logger.info("Clearing all filters.");

    const clearAllxpath = '//div[contains(@class, "b--filtered b--desktop")]/div/a';
    const clearAllFilters = await this.findByXpath(clearAllxpath);
    await this.clickOnElement(clearAllFilters);

    return this;
  }

  async getFiltersHTML() {
    logger.info("Getting innerHTML.");

    const filtersDivxpath = '//div[contains(@class, "b--filtered b--desktop")]';
    const filtersDiv = await this.findByXpath(filtersDivxpath);
    const filtersHTML = await filtersDiv.getAttribute("innerHTML");

    return filtersHTML;
  }
}

module.exports = CatalogPage;
