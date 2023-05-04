var config = {
        commonCapabilities: {
              browserName: "",
              pCloudy_Username:"Enter-Email",
              pCloudy_ApiKey: "Enter API KEY",
              pCloudy_ApplicationName: "pCloudyAppiumDemo.apk",
              pCloudy_DurationInMinutes: "10",
              platformName: "Android",
              automationName: "uiautomator2",
              newCommandTimeout: "600",
              launchTimeout : "90000",
              appPackage: "com.pcloudy.appiumdemo",
              appActivity: "com.ba.mobile.LaunchActivity",
              pCloudy_EnableVideo : "true",
        },
        multiCapabilities: [
          {
              "pCloudy_DeviceFullName": "GOOGLE_Pixel7Pro_Android_13.0.0_dbf82",
          },
          {
              "pCloudy_DeviceFullName": "MOTOROLA_Edge30Ultra_Android_12.0.0_15b11",
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
      