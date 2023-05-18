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
            path: './Test/TestCaseIosParallelDevices.js'
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

           
        pCloudy_DeviceFullName: 'APPLE_iPadPro4thGen_iOS_16.0.0_3a42d'
      }, {

             
        pCloudy_DeviceFullName: 'APPLE_iPadPro3rdGen_iOS_15.5.0_c727b' 
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


