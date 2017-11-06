var logger = require('./helpers/logger.js'),
    pcloudyConnector = require('./api/services.js');
var utils = require('./helpers/utils.js'),
    utilServices = new utils(),
    readline = require('readline'),
    configPath = './configs/config-android.json',
    token = '';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var webdriverio = require('webdriverio');

utilServices.fileRead(configPath).then(function(configs) {

    try {
        configs = JSON.parse(configs.data);
        var cloudName = configs.host,
            email = configs.username,
            apiKey = configs.password,
            app = configs.appname;
        pcloudyConnectorServices = new pcloudyConnector(cloudName);
    } catch (e) {
        logger.info(" error initializing configs " + e);
    }
    pcloudyConnectorServices.AuthenticateUser(email, apiKey).then(function(resp) {
        //logger.log(JSON.stringify(resp));
        var response = JSON.parse(resp);
        logger.info(' token  ====== > ' + response.result.token);
        token = response.result.token; //saved in global variable
        rl.question('====================== choose any one platform  ========================= \n 1 : Android \n  ========= Enter 1 to choose ============= \n', (platform) => {
            logger.info(`You have chosen platform : ${platform}`);
            var platformName = platform,
                devOs = '';

            switch (platformName) {
                case '1':
                    devOs = 'Android';
                    break;
            }
            logger.info('chosen platform ' + devOs);
            rl.close();

            var present = false;
            pcloudyConnectorServices.GetAvailableApps(token, 0, 'all').then(function(filesinDrive) {
                var alreadyPresentfiles = JSON.parse(filesinDrive);
                //logger.info('op '+JSON.stringify(alreadyPresentfiles));
                alreadyPresentfiles = alreadyPresentfiles.result.files;
                //alreadyPresentfiles.forEach(function(k)
                for (var k = 0, len = alreadyPresentfiles.length; k < len; k++) {
                    var cloudfile = alreadyPresentfiles[k]['file'];
                    if (cloudfile == app) {
                        present = true;
                        logger.info("App with Same name " + cloudfile + " present in pCloudy cloud drive ");
                        break;
                    }
                }
                if(!present){

                    var apppath = __dirname+'/'+app;//current directory
                    logger.info('=============Uploading file ============== '+apppath);
                    pcloudyConnectorServices.UploadApp(token, app, 'raw', 'all').then(function(uploadStatus) {
                        var status = JSON.parse(uploadStatus),uploadedFile = status.result.file;
                        //logger.info('upload status : ' + JSON.stringify(status));
                        if (status.result.code == 200) {
                            logger.info('upload Success for file : ' + status.result.file);
                        }
                        //core
                        pcloudyConnectorServices.GetDevices(response.result.token, 10, devOs, "true").then(function(devices) {
                            //logger.log(JSON.stringify(devices));
                            var devDetails = JSON.parse(devices);
                            //logger.log(JSON.stringify(devDetails));
                            var allDevsavilable = devDetails.result.models,
                                availabledevs = [],
                                sessionname = '';
                            if (allDevsavilable.length) {
                                logger.info(" == Avialable devices == ");

                                allDevsavilable.forEach(function(entry) {
                                    logger.info("=========================================================================================");
                                    logger.info(" full name : " + entry.full_name);
                                    logger.info(" did  : " + entry.id);
                                    /*logger.log(" model : "+entry.model);
                                    logger.log(" display name : "+entry.display_name);
                                    logger.log(" version : "+entry.version);
                                    logger.log(" manufacturer : "+entry.manufacturer);
                                    logger.log(" platform : "+entry.platform);
                                    logger.log(" availability : "+entry.available);*/
                                });
                            } else {
                                logger.warn(" == There no devices available at this time try to book after some time == ");
                                process.exit(0);
                            }
                            try {
                                var chosenDevs = [];
                                var readdev = readline.createInterface({
                                    input: process.stdin,
                                    output: process.stdout
                                });
                                logger.info('================================================================ \n');
                                readdev.question('\n Enter did value as shown above to select devices (use comma for multiple devices) \n ', (answer) => {
                                    logger.info('================================================================ \n');

                                    logger.info(`You have chosen devices : ${answer}`);
                                    answer = answer.split(',');
                                    chosenDevs = answer;
                                    logger.info(' chosen Devices are ');
                                    readdev.close();
                                    var bookedDevsInfo = {};
                                    Object.keys(allDevsavilable).forEach(function(key) {
                                        //console.log(allDevsavilable[key].id);
                                        var did = allDevsavilable[key].id;
                                        if (chosenDevs.indexOf(did.toString()) >= 0) {
                                            bookedDevsInfo[did] = allDevsavilable[key];
                                        }
                                    });

                                    Object.keys(bookedDevsInfo).forEach(function(key) {
                                        logger.info(' device id ==> ' + bookedDevsInfo[key].id + ', Device name ==> ' + bookedDevsInfo[key].full_name);
                                    })
                                    pcloudyConnectorServices.BookDevicesForAppium(devDetails.result.token, 10, chosenDevs, devOs, 'pcloudytest-' + devOs, "true").then(function(bookDevstatus) {
                                        //logger.log('bookDev '+JSON.stringify(bookDevstatus));
                                        var bookedDevDetails = JSON.parse(bookDevstatus);

                                        var bookedDevices = bookedDevDetails.result.device_ids,
                                            rid = bookedDevices[0].rid;

                                        //logger.info("booked devices "+JSON.stringify(bookedDevices));
                                        var read = readline.createInterface({
                                            input: process.stdin,
                                            output: process.stdout
                                        });

                                        pcloudyConnectorServices.initAppiumHubForApp(bookedDevDetails.result.token, uploadedFile).then(function(initAppiumHubForAppStat) {
                                            var initHubresp = JSON.parse(initAppiumHubForAppStat);

                                            pcloudyConnectorServices.getAppiumEndPoint(initHubresp.result.token).then(function(getAppiumEndPointstat) {

                                                var endPoint = JSON.parse(getAppiumEndPointstat);
                                                logger.info(JSON.stringify(endPoint));
                                                logger.info(" ===================== Started Appium and Received Endpoint ================== \n ");
                                                logger.info(" endpoint  ==> " + endPoint.result.endpoint);
                                                var options = {};

                                                bookedDevices.forEach(function(i) {
                                                    options.desiredCapabilities = {};
                                                    options.desiredCapabilities.launchTimeout = configs.desiredCapabilities.host;
                                                    options.desiredCapabilities.CommandTimeout = configs.desiredCapabilities.CommandTimeout;
                                                    options.desiredCapabilities.deviceName = i.capabilities.deviceName;
                                                    options.desiredCapabilities.browserName = i.capabilities.browserName;
                                                    options.desiredCapabilities.platformName = i.capabilities.platformName;
                                                    options.desiredCapabilities.appPackage = configs.desiredCapabilities.appPackage;
                                                    options.desiredCapabilities.appActivity = configs.desiredCapabilities.appActivity;
                                                    options.desiredCapabilities.rotatable = configs.desiredCapabilities.rotatable;
                                                    options.logLevel = configs.loglevel;
                                                    options.logOutput = configs.logOutput;
                                                    options.protocol = configs.protocol;
                                                    options.host = configs.host;
                                                    options.port = configs.port;
                                                    options.coloredLogs = configs.coloredLogs;
                                                    options.bail = configs.bail;
                                                    options.screenshotPath = configs.screenshotPath;
                                                    options.screenshotOnReject = configs.screenshotOnReject;

                                                    var hubUrl = endPoint.result.endpoint + '/wd/hub';
                                                    var p = options.protocol + "://" + options.host;
                                                    options.path = hubUrl.split(p)[1];
                                                    var unixTime = timeConverter(Math.round(+new Date() / 1000));
                                                    unixTime = unixTime.split(' ').join('__');
                                                    var client = webdriverio.remote(options)
                                                        .init().saveScreenshot(configs.screenshotPath + '/pcloudy-' + i.manufacturer + '-' + i.model + '-' + i.version + '-' + i.capabilities.deviceName + '-' + unixTime + '.png')

                                                        /*################################################### Add your code for testing #####################################*/


                                                        /*################################################## Add your code ################################################*/
                                                        .end();
                                                    //logger.debug('devicename passed in desired capabilities '+i.capabilities.deviceName);
                                                    //logger.info("options passed to webdriver "+JSON.stringify(options));
                                                })
                                                /*###################========= Api to releaseAppiumsession / release all booked devices  After finishing your all test cases call this to release ####################################=====*/
                                                /*pcloudyConnectorServices.releaseAppiumsession(token,rid).then(function(releaseInstanceAccess){
                                                logger.log('installAndLaunchApp '+JSON.stringify(releaseInstanceAccess));
                                                },function(releaseInstanceAccessErr){
                                                logger.log('installAndLaunchAppErr '+JSON.stringify(releaseInstanceAccessErr));
                                                })*/
                                            }, function(getAppiumEndPointErr) {
                                                loggerr.info(JSON.stringify(getAppiumEndPointErr));
                                            })

                                        }, function(initAppiumHubForAppErr) {
                                            logger.info('initAppiumHubForAppErr ' + JSON.stringify(initAppiumHubForAppErr));
                                        })

                                    }, function(bookdevErr) {
                                        logger.info('bookdevErr ' + JSON.stringify(bookdevErr));
                                    })
                                }); //rl
                            } catch (exp) {
                                console.info("err " + exp);
                            }
                        }, function(getDevErr) {
                            logger.log(JSON.stringify(getDevErr));
                        })
                        //core

                    }, function(uploadErr) {
                        logger.info(' uploadErr Error ' + JSON.stringify(uploadErr));
                    })
                }else{
                    //var apppath = __dirname+'/'+app;//current directory
                    //pcloudyConnectorServices.UploadApp(token, app, 'raw', 'all').then(function(uploadStatus) {
                        //var status = JSON.parse(uploadStatus),uploadedFile ;
                        //logger.info('upload status : ' + JSON.stringify(status));
                        //if (status.result.code == 200) {
                        //    logger.info('upload Success for file : ' + status.result.file);

                        //}
                        //core
                        pcloudyConnectorServices.GetDevices(response.result.token, 10, devOs, "true").then(function(devices) {
                            //logger.log(JSON.stringify(devices));
                            var devDetails = JSON.parse(devices);
                            //logger.log(JSON.stringify(devDetails));
                            var allDevsavilable = devDetails.result.models,
                                availabledevs = [],
                                sessionname = '';
                            if (allDevsavilable.length) {
                                logger.info(" == Avialable devices == ");

                                allDevsavilable.forEach(function(entry) {
                                    logger.info("=========================================================================================");
                                    logger.info(" full name : " + entry.full_name);
                                    logger.info(" did  : " + entry.id);
                                    /*logger.log(" model : "+entry.model);
                                    logger.log(" display name : "+entry.display_name);
                                    logger.log(" version : "+entry.version);
                                    logger.log(" manufacturer : "+entry.manufacturer);
                                    logger.log(" platform : "+entry.platform);
                                    logger.log(" availability : "+entry.available);*/
                                });
                            } else {
                                logger.warn(" == There no devices available at this time try to book after some time == ");
                                process.exit(0);
                            }
                            try {
                                var chosenDevs = [];
                                var readdev = readline.createInterface({
                                    input: process.stdin,
                                    output: process.stdout
                                });
                                logger.info('================================================================ \n');
                                readdev.question('\n Enter did value as shown above to select devices (use comma for multiple devices) \n ', (answer) => {
                                    logger.info('================================================================ \n');

                                    logger.info(`You have chosen devices : ${answer}`);
                                    answer = answer.split(',');
                                    chosenDevs = answer;
                                    logger.info(' chosen Devices are ');
                                    readdev.close();
                                    var bookedDevsInfo = {};
                                    Object.keys(allDevsavilable).forEach(function(key) {
                                        //console.log(allDevsavilable[key].id);
                                        var did = allDevsavilable[key].id;
                                        if (chosenDevs.indexOf(did.toString()) >= 0) {
                                            bookedDevsInfo[did] = allDevsavilable[key];
                                        }
                                    });

                                    Object.keys(bookedDevsInfo).forEach(function(key) {
                                        logger.info(' device id ==> ' + bookedDevsInfo[key].id + ', Device name ==> ' + bookedDevsInfo[key].full_name);
                                    })
                                    pcloudyConnectorServices.BookDevicesForAppium(devDetails.result.token, 10, chosenDevs, devOs, 'pcloudytest-' + devOs, "true").then(function(bookDevstatus) {
                                        //logger.log('bookDev '+JSON.stringify(bookDevstatus));
                                        var bookedDevDetails = JSON.parse(bookDevstatus);

                                        var bookedDevices = bookedDevDetails.result.device_ids,
                                            rid = bookedDevices[0].rid;

                                        //logger.info("booked devices "+JSON.stringify(bookedDevices));
                                        var read = readline.createInterface({
                                            input: process.stdin,
                                            output: process.stdout
                                        });

                                        pcloudyConnectorServices.initAppiumHubForApp(bookedDevDetails.result.token, app).then(function(initAppiumHubForAppStat) {
                                            var initHubresp = JSON.parse(initAppiumHubForAppStat);

                                            pcloudyConnectorServices.getAppiumEndPoint(initHubresp.result.token).then(function(getAppiumEndPointstat) {

                                                var endPoint = JSON.parse(getAppiumEndPointstat);
                                                logger.info(JSON.stringify(endPoint));
                                                logger.info(" ===================== Started Appium and Received Endpoint ================== \n ");
                                                logger.info(" endpoint  ==> " + endPoint.result.endpoint);
                                                var options = {};

                                                bookedDevices.forEach(function(i) {
                                                    options.desiredCapabilities = {};
                                                    options.desiredCapabilities.launchTimeout = configs.desiredCapabilities.host;
                                                    options.desiredCapabilities.CommandTimeout = configs.desiredCapabilities.CommandTimeout;
                                                    options.desiredCapabilities.deviceName = i.capabilities.deviceName;
                                                    options.desiredCapabilities.browserName = i.capabilities.browserName;
                                                    options.desiredCapabilities.platformName = i.capabilities.platformName;
                                                    options.desiredCapabilities.appPackage = configs.desiredCapabilities.appPackage;
                                                    options.desiredCapabilities.appActivity = configs.desiredCapabilities.appActivity;
                                                    options.desiredCapabilities.rotatable = configs.desiredCapabilities.rotatable;
                                                    options.logLevel = configs.loglevel;
                                                    options.logOutput = configs.logOutput;
                                                    options.protocol = configs.protocol;
                                                    options.host = configs.host;
                                                    options.port = configs.port;
                                                    options.coloredLogs = configs.coloredLogs;
                                                    options.bail = configs.bail;
                                                    options.screenshotPath = configs.screenshotPath;
                                                    options.screenshotOnReject = configs.screenshotOnReject;

                                                    var hubUrl = endPoint.result.endpoint + '/wd/hub';
                                                    var p = options.protocol + "://" + options.host;
                                                    options.path = hubUrl.split(p)[1];
                                                    var unixTime = timeConverter(Math.round(+new Date() / 1000));
                                                    var client = webdriverio.remote(options)
                                                        .init().saveScreenshot(configs.screenshotPath + '/pcloudy-' + i.manufacturer + '-' + i.model + '-' + i.version + '-' + i.capabilities.deviceName + '-' + unixTime + '.png')

                                                        /*################################################### Add your code ############*/


                                                        /*################### your code ###################*/
                                                        .end();
                                                    //logger.debug('devicename passed in desired capabilities '+i.capabilities.deviceName);
                                                    //logger.info("options passed to webdriver "+JSON.stringify(options));
                                                })
                                                /*###################========= Api to releaseAppiumsession / release all booked devices  After finishing your all test cases call this to release ####################################=====*/
                                                /*pcloudyConnectorServices.releaseAppiumsession(token,rid).then(function(releaseInstanceAccess){
                                                logger.log('installAndLaunchApp '+JSON.stringify(releaseInstanceAccess));
                                                },function(releaseInstanceAccessErr){
                                                logger.log('installAndLaunchAppErr '+JSON.stringify(releaseInstanceAccessErr));
                                                })*/
                                            }, function(getAppiumEndPointErr) {
                                                loggerr.info(JSON.stringify(getAppiumEndPointErr));
                                            })

                                        }, function(initAppiumHubForAppErr) {
                                            logger.info('initAppiumHubForAppErr ' + JSON.stringify(initAppiumHubForAppErr));
                                        })

                                    }, function(bookdevErr) {
                                        logger.info('bookdevErr ' + JSON.stringify(bookdevErr));
                                    })
                                }); //rl
                            } catch (exp) {
                                console.info("err " + exp);
                            }
                        }, function(getDevErr) {
                            logger.log(JSON.stringify(getDevErr));
                        })
                        //core

                    //}, function(uploadErr) {
                    //    logger.info(' uploadErr Error ' + JSON.stringify(uploadErr));
                    //})
                }
            }, function(getAppsErr) {
                logger.info("getAvailable apps Error : " + JSON.stringify(getAppsErr));
            })

        }) //read line
    }, function(err) {
        logger.log("Error in Authenticating");
        logger.log(JSON.stringify(err));
    })

}, function(errRead) {
    logger.info('error reading config ' + errRead);
})

process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    process.exit(0);
});

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
