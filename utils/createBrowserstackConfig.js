const fs = require("fs/promises");

const { browser } = require("../config/env");

const createBrowserstackConfig = async () => {
  const config = `userName: siarhei_PZnKCE
accessKey: uC6xmcW8zPMtWKaMB2xR
platforms:
  - os: Windows
    osVersion: 10
    browserName: ${browser}
    browserVersion: latest
parallelsPerPlatform: 1
browserstackLocal: true
buildName: browserstack-build-1
projectName: BrowserStack Sample
debug: false
networkLogs: false
consoleLogs: errors
`;

  fs.writeFile("./browserstack.yml", config, "utf-8");
};

createBrowserstackConfig();
