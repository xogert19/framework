const browser = process.env.BROWSER.toLowerCase();
const mode = process.env.MODE.toLowerCase();

module.exports = {
  browser: browser[0].toUpperCase() + browser.slice(1),
  mode: mode,
};
