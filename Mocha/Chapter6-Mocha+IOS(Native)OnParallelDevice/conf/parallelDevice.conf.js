var config = {
        commonCapabilities: {
          "browserName": "",
          "pCloudy_Username": "Enter-Email",
          "pCloudy_ApiKey": "Enter API-Key", 
          "pCloudy_ApplicationName": "TestmunkDemo_Resigned1675153426.ipa",
          "pCloudy_DurationInMinutes": "10",
          "platformName": "ios",
          "automationName": "XCUITest",
          "newCommandTimeout": "600",
          "launchTimeout": "90000",
          "bundleId": "com.pcloudy.TestmunkDemo",
          "acceptAlerts":"true",
          "pCloudy_EnableVideo" : "true"
        },
        multiCapabilities: [
          {
            "pCloudy_DeviceFullName": "APPLE_iPadPro3rdGen_iOS_15.5.0_c727b",
          },
          {
            "pCloudy_DeviceFullName": "APPLE_iPhoneXR_iOS_16.0.0_dfb5a",
          }
        ]
      };
      
      exports.capabilities = [];
      
      // Code to support common capabilities
      config.multiCapabilities.forEach(function(caps) {
        var temp_caps = JSON.parse(JSON.stringify(config.commonCapabilities));
        for (var i in caps) temp_caps[i] = caps[i];
        exports.capabilities.push(temp_caps);
      });
      