const path = require('path');

module.exports = {
    //
    // ======
    // Suites
    // ======
    // Define your test suites here. 
    //
    suites: [{
        name: 'Appium',
        cases: [{
            path: './Test/TestCaseIosSingleDevice.js'
        }]        
    }],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. 
    // If "concurrency" value is greater than 1, tests with different capabilities will be executed in parallel.
    //
    concurrency: 1,
    capabilities: [{
        browserName: '',
        pCpCloudy_Username: 'Enter Email',
        pCloudy_ApiKey: 'Enter API Key',              
	    pCloudy_ApplicationName: 'TestmunkDemo_Resigned1675153426.ipa',
        pCloudy_DurationInMinutes: '10',
        pCloudy_DeviceFullName: 'APPLE_iPadPro4thGen_iOS_16.0.0_3a42d',
        //pCloudy_DeviceManafacturer is an optional capability
        //pCloudy_DeviceManafacturer: 'Apple',
        //pCloudy_DeviceVersion is an optional capability
        //pCloudy_DeviceVersion: '11.2.0',
        platformName: 'iOS',   
        platformVersion: '16.0',
        automationName: 'XCUITest',
        newCommandTimeout: '600',
        launchTimeout: '90000',
        bundleId: 'com.pcloudy.TestmunkDemo',     
        pCloudy_EnableVideo : "true",
    }  ],

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