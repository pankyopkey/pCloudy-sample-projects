    export const config = {

        protocol: 'https',
        hostname: 'device.pcloudy.com', 
        port: 443,    
        path: '/appiumcloud/wd/hub',

        //
        // ==================
        // Specify Test Files
        // ==================
        // Define which test specs should run. The pattern is relative to the directory
        // from which `wdio` was called. Notice that, if you are calling `wdio` from an
        // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
        // directory is where your package.json resides, so `wdio` will be called from there.
        //
      
      specs: [
          './test/specs/**/TestCaseAndroid.js'
        ],
      exclude: [
        // 'path/to/excluded/files'
      ],

        // ============
        // Capabilities
        // ============
        // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
        // time. Depending on the number of capabilities, WebdriverIO launches several test
        // sessions. Within your capabilities you can overwrite the spec and exclude options in
        // order to group specific specs to a specific capability.
        //
        // First, you can define how many instances should be started at the same time. Let's
        // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
        // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
        // files and you set maxInstances to 10, all spec files will get tested at the same time
        // and 30 processes will get spawned. The property handles how many capabilities
        // from the same test should run tests.
        //
    
      commonCapabilities: {      
          browserName: '', 
          pCloudy_Username: 'Enter your Email-id',
          pCloudy_ApiKey: 'Enter your API Key',                
          pCloudy_ApplicationName: 'pCloudyAppiumDemo.apk',
          pCloudy_DurationInMinutes: '10',
          //pCloudy_DeviceManafacturer: 'Google',
          //pCloudy_DeviceFullName is an optional capability
          //pCloudy_DeviceFullName: 'Samsung_GalaxyJ7_Android_6.0.1',
          //pCloudy_DeviceVersion is an optional capability
          //pCloudy_DeviceVersion: '8.1.0',
          platformName: 'Android',   
          automationName: 'uiautomator2',
          newCommandTimeout: '600',
          launchTimeout: '90000',
          appPackage: 'com.pcloudy.appiumdemo',                 
          appActivity: 'com.ba.mobile.LaunchActivity',         
        },

      capabilities: [{

        pCloudy_DeviceFullName: 'GOOGLE_Pixel3_Android_12.0.0_a6091'
      }, {

        pCloudy_DeviceFullName: 'GOOGLE_Pixel7_Android_13.0.0_81870' 
      }],

      sync: true,
        //
        // Level of logging verbosity: silent | verbose | command | data | result | error
        logLevel: 'silent',
        //
        // Enables colors for log output.
        coloredLogs: true,
        //
        // Warns when a deprecated command is used
        deprecationWarnings: true,
        //
        // If you only want to run your tests until a specific amount of tests have failed use
        // bail (default is 0 - don't bail, run all tests).
        bail: 1,
        //
        // Saves a screenshot to a given path if a command fails.
        screenshotPath: './errorShots/',
        //
        // Set a base URL in order to shorten url command calls. If your `url` parameter starts
        // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
        // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
        // gets prepended directly.
        baseUrl: 'https://device.pcloudy.com/quickappium/wd/hub',
        //
        // Default timeout for all waitFor* commands.
        waitforTimeout: 10000,
        //
        // Default timeout in milliseconds for request
        // if Selenium Grid doesn't send response
        connectionRetryTimeout: 90000,
        //
        // Default request retries count
        connectionRetryCount: 3,
        //
        // Initialize the browser instance with a WebdriverIO plugin. The object should have the
        // plugin name as key and the desired plugin options as properties. Make sure you have
        // the plugin installed before running any tests.
      
        // Test runner services
        // Services take over a specific job you don't want to take care of. They enhance
        // your test setup with almost no effort. Unlike plugins, they don't add new
        // commands. Instead, they hook themselves up into the test process.
        // Framework you want to run your specs with.
        // The following are supported: Mocha, Jasmine, and Cucumber
        // see also: http://webdriver.io/guide/testrunner/frameworks.html
        //
        // Make sure you have the wdio adapter package for the specific framework installed
        // before running any tests.
        framework: 'mocha',
        //
        // The number of times to retry the entire specfile when it fails as a whole
        // specFileRetries: 1,
        //
        // Delay in seconds between the spec file retry attempts
        // specFileRetriesDelay: 0,
        //
        // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
        // specFileRetriesDeferred: false,
        //
        // Test reporter for stdout.
        // The only one supported by default is 'dot'
        // see also: https://webdriver.io/docs/dot-reporter
        // reporters: ['dot'],
        reporters: [['allure', {outputDir: 'allure-results'}]],

        
        //
        // Options to be passed to Mocha.
        // See the full list at http://mochajs.org/
        mochaOpts: {
            ui: 'bdd',
            timeout: 60000
        }
        };

    // Code to support common capabilities
    config.capabilities.forEach(function(caps){
      for(var i in config.commonCapabilities) caps[i] = caps[i] || config.commonCapabilities[i];
    });
