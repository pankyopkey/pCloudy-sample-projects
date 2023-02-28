exports.config = {

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
      pCloudy_Username: 'EnterYourEmailId', 
      pCloudy_ApiKey: 'EnterYourApiKey',                 
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

    pCloudy_DeviceFullName: 'Samsung_GalaxyJ7_Android_6.0.1'
  }, {

    pCloudy_DeviceFullName: 'SAMSUNG_GalaxyA9Pro_Android_7.0.0' 
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
    framework: 'jasmine',
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/reporters/dot.html
    // reporters: ['dot'],
    //
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
    //
    // Jasmine default timeout
    defaultTimeoutInterval: 360000,
    // The Jasmine framework allows interception of each assertion in order to log the state of the application
    // or website depending on the result. For example, it is pretty handy to take a screenshot every time
    // an assertion fails.
    expectationResultHandler: function(passed, assertion) {
      }
    },
    
    onPrepare: function (config, capabilities) {
        console.log('<<< NATIVE APP TESTS STARTED >>>');
    },  
     
    onComplete: function(exitCode, config, capabilities) {
        console.log('<<< TEST FINISHED >>>');
    	}
  	};

// Code to support common capabilities
exports.config.capabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
