const { expect } = require("chai");

const DriverSingleton = require("../driver/DriverSingleton");

const TestDataReader = require("../services/TestDataReader");

const CatalogPage = require("../pages/CatalogPage");

const { TESTCASE_TIMEOUT, COLORS, SIZES } = require("../config/constants");
const { makeScreenshot } = require("../utils/utils");

describe("Filter items in catalog.", () => {
  before(async () => {
    const properties = await TestDataReader.getTestData("catalog.properties");
    for (const key in properties) {
      this[key] = properties[key];
    }
  });

  beforeEach(async () => {
    this.driver = await DriverSingleton.createDriver();
  });

  it("Should add filters.", async () => {
    const testMessage = "Should add filters";
    try {
      const pageUrl = this.womenPageUrl;
      const expectedURL = this.urlWithFilters;
      const expectedNumberOfFilters = 3;

      const catalogPage = new CatalogPage(this.driver);
      await catalogPage.openPage(pageUrl);

      await catalogPage.closeCookiePopup();

      await catalogPage.selectColorFilter(COLORS.BLACK);
      await catalogPage.selectColorFilter(COLORS.BLUE);
      await catalogPage.selectSizeFilter(SIZES.M);

      const pageWithFiltersURL = await catalogPage.getPageURL();

      const numberOfFilters = await catalogPage.countFilters();

      expect(numberOfFilters).to.be.equal(expectedNumberOfFilters);
      expect(pageWithFiltersURL).to.be.equal(expectedURL);
    } catch {
      makeScreenshot(this.driver, testMessage);

      throw new Error(`Test failed: ${testMessage}`);
    }
  }).timeout(TESTCASE_TIMEOUT);

  it("Should remove filters.", async () => {
    const testMessage = "Should remove filters";
    try {
      const pageWithoutFiltersURL = this.urlWithoutFilters;
      const pageWithFiltersURL = this.urlWithFilters;

      const emptyFiltersHTML = "\n ";

      const catalogPage = new CatalogPage(this.driver);
      await catalogPage.openPage(pageWithFiltersURL);

      await catalogPage.closeCookiePopup();

      await catalogPage.clearFilters();

      const url = await catalogPage.getPageURL();

      const filtersHTML = await catalogPage.getFiltersHTML();

      expect(filtersHTML).to.be.equal(emptyFiltersHTML);
      expect(url).to.be.equal(pageWithoutFiltersURL);
    } catch {
      makeScreenshot(this.driver, testMessage);

      throw new Error(`Test failed: ${testMessage}`);
    }
  }).timeout(TESTCASE_TIMEOUT);

  afterEach(async () => {
    await DriverSingleton.killDriver();
  });
});
