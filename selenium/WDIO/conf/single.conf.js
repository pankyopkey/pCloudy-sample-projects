exports.config = {
  specs: ["./tests/specs/single_test.js"],
  exclude: [],

 capabilities: [
    {
      browserName: "chrome",
      browserVersion: "79",
      os: "Windows",
      osVersion: "8.1",
      clientName: "sridatta.pani@sstsinc.com",
      apiKey: "z4kuNbkRoFB2ZBNJqT",
      email: "sridatta.pani@sstsinc.com"
    }
  ],


  logLevel: "info",
  coloredLogs: true,
  screenshotPath: "./errorShots/",
  baseUrl: "",
  waitforTimeout: 100000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 0,
  path: "/seleniumcloud/wd/hub",
  protocol: 'https',
  hostname: "prod-browsercloud-in.pcloudy.com",
  port: 443,
  framework: "mocha",
  mochaOpts: {
    ui: "bdd"
  }
};
