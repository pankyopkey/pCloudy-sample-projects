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
        './test/specs/**/testCaseios.js'
        ],
    
        exclude: [
            // 'path/to/excluded/files'
        ],
        //
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
        // If you have trouble getting all important capabilities together, check out the
        //
        capabilities: [{
        
            browserName: 'safari',
            pCloudy_Username: 'Enter Email',
            pCloudy_ApiKey: 'Enter API-KEY',               
            pCloudy_DurationInMinutes: '10',
            pCloudy_DeviceFullName: 'APPLE_iPhone14Plus_iOS_16.0.3_1bff0',
            platformName: 'iOS',   
            platformVersion: '16.0',
            automationName: 'XCUITest',
            newCommandTimeout: '600',
            launchTimeout: '90000',                                
        }],
        //
        // ===================
        // Test Configurations
        // ===================
        // Define all options that are relevant for the WebdriverIO instance here
        //
        // By default WebdriverIO commands are executed in a synchronous way using
        // the wdio-sync package. If you still want to run your tests in an async way
        // e.g. using promises you can set the sync option to false.
        sync: true,
        //
        //Level of logging verbosity: silent | verbose | command | data | result | error
        //logLevel: 'silent',
        //Enables colors for log output.
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
        // baseUrl: '(http://127.0.0.1:4723/wd/hub)',
        baseUrl: 'https://device.pcloudy.com',
        //
        // Default timeout for all waitFor* commands.
        waitforTimeout: 10000,
        //
        // Default timeout in milliseconds for request
        // if Selenium Grid doesn't send response
        connectionRetryTimeout: 90000,
        //
        // Default request retries count
        // connectionRetryCount: 3,
        //
        // Initialize the browser instance with a WebdriverIO plugin. The object should have the
        // plugin name as key and the desired plugin options as properties. Make sure you have
        // the plugin installed before running any tests. 
        //
        // Test runner services
        // Services take over a specific job you don't want to take care of. They enhance
        // your test setup with almost no effort. Unlike plugins, they don't add new
        // commands. Instead, they hook themselves up into the test process.
        //services: ['appium'],
        
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
        reporeporters: [['allure', {outputDir: 'allure-results'}]],

        
        //
        // Options to be passed to Mocha.
        // See the full list at http://mochajs.org/
        mochaOpts: {
            ui: 'bdd',
            timeout: 60000
        }
        
    }

