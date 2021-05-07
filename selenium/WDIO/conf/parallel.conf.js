exports.config = {
 
  specs: [
    './tests/specs/single_test.js'
  ],
  exclude: [],

  maxInstances: 10,
  commonCapabilities: {
      clientName: "your email id",
      apiKey: "your Api key",
      email: "your email id"
  },

  capabilities: [
    {
      browserName: "chrome",
      browserVersion: "79",
      os: "Windows",
      osVersion: "8.1"
    },
    {
      browserName: "chrome",
      browserVersion: "84",
      os: "Windows",
      osVersion: "8.1"
    }
  ],

  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  protocol: 'https',
  path: "/seleniumcloud/wd/hub",
  hostname: "prod-browsercloud-in.pcloudy.com",
  port: 443,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd"
  }
};

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
