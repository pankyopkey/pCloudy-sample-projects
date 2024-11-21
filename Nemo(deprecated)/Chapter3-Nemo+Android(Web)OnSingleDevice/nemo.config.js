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
            "browserName": "chrome",
            "pCloudy_Username": "Enter your Email-id",
            "pCloudy_ApiKey": "Enter your API Key",
            "pCloudy_DurationInMinutes": "10",
            "pCloudy_DeviceFullName": "GOOGLE_Pixel7Pro_Android_13.0.0_dbf82",
            "platformName": "Android",
            "automationName": "uiautomator2",
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
