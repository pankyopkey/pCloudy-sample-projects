
## pCloudy-appium service
- Run Appium Automation over multiple devices of pCloudy.
- Launches App and takes screenshot through webdriverio.
- Saves screenshot of App launch inside screenshot folder.
- Know more about pCloudy www.pcloudy.com.


## Install

```shell


npm init

npm install pcloudy-appium-client --save

```

## Writing a script
```javascript

//1: Create screenshot directory.
//2: Create log directory.
//3: Create config.json file which has following fields.
//4: app file at current directory.

{
  "desiredCapabilities": {
    "launchTimeout" : 90000,
    "CommandTimeout" : 600,
    "appPackage" : "YOUR_APP_PACKAGE_NAME",
    "appActivity" : "YOUR_APP_LAUNCH_ACTIVITY_NAME",
    "rotatable" : true
  },
  "logLevel" : "verbose",
  "logOutput" : "./log/",
  "protocol" : "https",
  "host" : "device.pcloudy.com",
  "port" : 443,
  "coloredLogs" : true,
  "bail" : 0,
  "screenshotPath" : "./screenshot/",
  "screenshotOnReject" : false,
  "username" : "YOUR_PCLOUDY_USERNAME",
  "password" : "YOUR_PCLOUDY_ACCESS_KEY",
  "appname" : "YOUR_APP_NAME"
}

//create a file eg: index.js add with following code to select pCloudy Devices and run appium Automation.

var appiumpCloudy = require('pcloudy-appium-client');

instance = new appiumpCloudy();

instance.appiumInterface('config.json');


//node index.js
```

## Known issues / limitations
- more test scripts has to be written.


## Contact us
- muthuraj.bharathi@sstsinc.com

## Authors
- Muthu raj bharathi ([AppiumConnector_v1](https://github.com/pankyopkey/pCloudy-sample-projects/tree/master/NodeJS/AppiumConnector_v1))

## License

The MIT License (MIT)

Copyright (c) 2017 pCloudy
