var https = require("https");
module.exports = {
  "@tags": ["test"],
  Google: function(client) {
    client
      .url("https://www.google.com/ncr")
      .waitForElementPresent("body", 10000)
      .setValue("input[type=text]", "pcloudy\n")
      .pause(1000)
      .end();
  },
  after: function(browser) {
    console.log("Closing down...");
  }
};
