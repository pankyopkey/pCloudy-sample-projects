var fs = require('graceful-fs');
asyncPro = require("async"),
    webdriverio = require('webdriverio'),
    Promise = require('promise'),
    logger = require('./logger.js');
module.exports = function pcloudyServices(cloudName) {
    return {
        fileRead: function(fname) {
            var promise = new Promise(function(resolve, reject) {
                fs.readFile(fname, 'utf8', function(err, contents) {
                    if (err) {
                        reject({
                            "error": err
                        });
                    } else {
                        resolve({
                            "data": contents
                        });
                        //logger.info(contents);
                    }
                });
            })
            return promise;
        },
        startWebdriverIo: function(configs, bookedDevs, endPoint) {
            var pointer = this;
            var promise = new Promise(function(resolve, reject) {
                webDriver = function(dev, callback) {
                    try {
                        var options = {};
                        options.desiredCapabilities = {};
                        options.desiredCapabilities.launchTimeout = configs.desiredCapabilities.host;
                        options.desiredCapabilities.CommandTimeout = configs.desiredCapabilities.CommandTimeout;
                        options.desiredCapabilities.deviceName = bookedDevs[dev].capabilities.deviceName;
                        options.desiredCapabilities.browserName = bookedDevs[dev].capabilities.browserName;
                        options.desiredCapabilities.platformName = bookedDevs[dev].capabilities.platformName;
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
                        try {
                            var client = webdriverio.remote(options)
                                .init()
                                .saveScreenshot(configs.screenshotPath + '/pcloudy-' + bookedDevs[dev].capabilities.deviceName + '.png')
                                //.end();
                            // ########### WRITE YOUR CODE HERE ################


                            // ######## RELEASE THE pCLOUDY DEVICE HERE ##########
                        } catch (er) {
                            logger.info("error webdriver " + er);
                        }
                        logger.info(" started webdriver " + bookedDevs[dev].capabilities.deviceName);
                    } catch (error) {
                        logger.error(" error : " + error);
                    }
                    callback(null);
                }

                asyncPro.eachSeries(Object.keys(bookedDevs), webDriver, function(error) {
                    if (error) {
                        logger.error("error forming options : " + error);
                        var stat = {
                            'error': error
                        };
                        reject(JSON.stringify(stat));
                    } else {
                            logger.info(" initialized webdriver for all devices ");
                            var stat = {
                                'status': 'done'
                            };
                            resolve(JSON.stringify(stat));
                            logger.info('done ');
                    }
                })



            })//promise
            return promise;
        }
    }
}
