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
            path: './Test/TestCaseAndroidSingleDevice.js'
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
        pCloudy_Username: 'Enter Email',
        pCloudy_ApiKey: 'Enter API Key',
        pCloudy_ApplicationName: 'pCloudyAppiumDemo-1674560861.apk',
        pCloudy_DurationInMinutes: '10',
        pCloudy_DeviceFullName: 'GOOGLE_Pixel7_Android_13.0.0_81870',
        //pCloudy_DeviceManafacturer is an optional capability
        pCloudy_DeviceManafacturer: 'Google',
        //pCloudy_DeviceVersion is an optional capability
        pCloudy_DeviceVersion: '13.0.0',
        platformName: 'Android',
        automationName: 'uiautomator2',
        newCommandTimeout: '600',
        launchTimeout: '90000',
        appPackage: 'com.pcloudy.appiumdemo',
        appActivity: 'com.ba.mobile.LaunchActivity',
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