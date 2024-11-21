const path = require('path');

module.exports = {
  plugins: {
    view: {
      module: 'nemo-view'
    }
  },
  output: {
    reports: path.resolve('test/functional', 'report')
  },
  profiles: {
    base: {
      tests: path.resolve('test/functional', '*test.js'),
      "driver": {
        "builders": {
          "usingServer": [ "https://device.pcloudy.com/appiumcloud/wd/hub" ],
          "withCapabilities": [{
            "browserName": "safari",
            "pCloudy_Username": "Enter your Email-id",
            "pCloudy_ApiKey": "Enter your API Key",
            "pCloudy_DurationInMinutes": "10",
            "pCloudy_DeviceFullName": "APPLE_iPhone11ProMax_iOS_15.0.0_b99a8",
            "platformName": "ios",
            "automationName": "XCUITest",
            "newCommandTimeout": "600",
            "launchTimeout": "90000",
            "pCloudy_EnableVideo" : "true",
          }]
        }
      },
      data: {
        baseUrl: 'https://device.pcloudy.com'
      },
      mocha: {
        timeout: 180000,
        reporter: 'mochawesome',
        reporterOptions: {
          quiet: true
        }
      }
    },
    
  }
}
