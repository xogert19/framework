const fs = require("fs/promises");

const { browser, browserstackUsername, browserstackAccessKey } = require("../config/env");

const createBrowserstackConfig = async () => {
  const config = `userName: ${browserstackUsername}
accessKey: ${browserstackAccessKey}
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
