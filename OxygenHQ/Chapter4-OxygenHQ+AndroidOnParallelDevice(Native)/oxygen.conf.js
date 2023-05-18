const path = require('path');

 module.exports  = {
    //
    // ======
    // Suites
    // ======
    // Define your test suites here. 
    //
    suites: [{
        name: 'Appium',
        cases: [{
            path: './Test/TestCaseAndroidParallelDevices.js'
        }]        
    }],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. 
    // If "concurrency" value is greater than 1, tests with different capabilities will be executed in parallel.
    //
    
    concurrency: 2,
    capabilities: [{

        pCloudy_DeviceFullName: 'GOOGLE_Pixel3_Android_12.0.0_a6091'
      }, {
    
        pCloudy_DeviceFullName: 'GOOGLE_Pixel7Pro_Android_13.0.0_dbf82' 
      }],

    appiumUrl: "https://device.pcloudy.com/appiumcloud/wd/hub" ,

    framework: 'oxygen',
    //
    // =========
    // Reporting
    // =========
    // Define test reporter format and corresponding options. 
    // Multiple reporter formats can be specified.
    // Available reporters: json | html | junit | excel | pdf | xml
    //
    reporting: {
        outputDir: path.join(__dirname, 'reports'),
        reporters: ['html'],
    },
};

// config.capabilities.forEach(function(caps){
//     for(var i in config.commonCapabilities) caps[i] = caps[i] || config.commonCapabilities[i];
//   });

