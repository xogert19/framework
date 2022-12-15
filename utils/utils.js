const fs = require("fs/promises");

const parsePrice = (totalPriceString) => {
  return Number(totalPriceString.split("$")[1]);
};

const calculatePricesWithTax = (price, stateTax, localTax) => {
  const minPrice = price * (stateTax / 100) + price;
  const maxPrice = price * ((stateTax + localTax) / 100) + price;

  return [minPrice, maxPrice];
};

let indexOfScreenshot = 0;
const makeScreenshot = async (driver, message) => {
  const screenshotName = message.toLowerCase().split(" ").join("-");

  await driver.takeScreenshot().then((image) => {
    fs.writeFile(`./screenshots/error-in-test-${screenshotName}.png`, image, "base64");
  });
  indexOfScreenshot++;
};

module.exports = {
  parsePrice,
  calculatePricesWithTax,
  makeScreenshot,
};
