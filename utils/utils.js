const fs = require("fs/promises");

const parsePrice = (totalPriceString) => {
  return Number(totalPriceString.split("$")[1]);
};

const calculatePricesWithTax = (price, stateTax, localTax) => {
  const priceMaxIncrease = Math.ceil(price * ((stateTax + localTax) / 100) * 100) / 100;
  const maxPrice = Math.ceil((price + priceMaxIncrease) * 100) / 100;

  const priceMinIncrease = Math.floor(price * (stateTax / 100) * 100) / 100;
  const minPrice = Math.floor((price + priceMinIncrease) * 100) / 100;

  return [minPrice, maxPrice];
};

let indexOfScreenshot = 0;
const makeScreenshot = async (driver, message) => {
  const screenshotName = message.toLowerCase().split(" ").join("-");
  const date = new Date();

  const day = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const time = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  await driver.takeScreenshot().then((image) => {
    fs.writeFile(`./screenshots/error-in-test_${screenshotName}_${day}_${time}.png`, image, "base64");
  });
  indexOfScreenshot++;
};

module.exports = {
  parsePrice,
  calculatePricesWithTax,
  makeScreenshot,
};
