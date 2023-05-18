var Promise = require('promise'),
logger = require('./helpers/logger.js'),
pcloudyConnector = require('./api/pCloudyApiConnector.js');

var utils = require('./helpers/utils.js'),
utilServices = new utils(),
readline = require('readline'),
configPath = './configs/config-android.json',
configs = {},
token = '';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout

  });
var webdriverio = require('webdriverio');

module.exports = function appiumPcloudy() {
  return {
    appiumInterface : function(configPath){
      var pointer = this;
      utilServices.fileRead(configPath).then(function(configs) {
          try {
              configs = JSON.parse(configs.data);
              var cloudName = configs.host,
              email = configs.username,
              apiKey = configs.password,
              app = configs.appname;
              pcloudyConnectorServices = new pcloudyConnector(cloudName);
          } catch (e) {
              logger.error(" error initializing configs " + e);
          }
          pcloudyConnectorServices.AuthenticateUser(email, apiKey).then(function(resp) {
              //logger.log(JSON.stringify(resp));
              var response = JSON.parse(resp);
              if(response.result.hasOwnProperty('error')){
                  logger.error("Error in Authenticating : "+response.result.error);
                  process.exit(0);
              } else {
                  logger.info(' token  ====== > ' + response.result.token);
                  token = response.result.token; //saved in global variable
                  rl.question('====================== choose platform  ========================= \n 1 : Android \n  ========= Enter 1 to choose ============= \n', (platform) => {
                      //logger.info(`You have chosen platform : ${platform}`);
                      var platformName = platform,
                      devicePlatform = '-NOT-SELECTED-';

                      switch (platformName) {
                          case '1':
                          devicePlatform = 'Android';
                          break;
                      }
                      logger.info('Chosen platform ' + devicePlatform);
                      rl.close();
                      var present = false;
                                      pcloudyConnectorServices.GetAvailableApps(token, 0, 'all').then(function(filesinDrive) {
                                          var alreadyPresentfiles = JSON.parse(filesinDrive);
                                          alreadyPresentfiles = alreadyPresentfiles.result.files;
                                          //logger.info('op '+JSON.stringify(alreadyPresentfiles));
                                          if(alreadyPresentfiles.hasOwnProperty('error')){
                                              logger.error("getAvailable apps Error : "+alreadyPresentfiles.error);
                                              pointer.terminate();
                                          }
                                          else{

                                              for (var k = 0, len = alreadyPresentfiles.length; k < len; k++) {
                                                  var cloudfile = alreadyPresentfiles[k]['file'];
                                                  //logger.log(" cloudfile : "+cloudfile + " app "+app);
                                                  if (cloudfile == app) {
                                                      present = true;
                                                      logger.info("App with Same name '" + cloudfile + "' already present in pCloudy Cloud Drive");
                                                      break;
                                                  }

                                                  if(k == (len-1)){
                                                    logger.debug("last "+k + " exit ");
                                                    //pointer.terminate()
                                                  }
                                              }
                                              if(!present){
                                                  //if app is not present in pcloudy cloud drive
                                                  var apppath = __dirname+'/'+app;//current directory
                                                  logger.info('=============Uploading file ============== '+apppath);
                                                  pcloudyConnectorServices.UploadApp(token, app, 'raw', 'all').then(function(uploadStatus) {
                                                      var status = JSON.parse(uploadStatus),uploadedFile = status.result.file;
                                                      status = status.result;
                                                      logger.info('Upload Status : ' + JSON.stringify(status));
                                                      try {
                                                      if(status.hasOwnProperty('error')){
                                                          logger.error("Error while uploading app : "+status.error);
                                                          pointer.terminate();
                                                      }
                                                      else{
                                                          if (status.code == 200) {
                                                              logger.info('Upload Success for file : ' + status.file);
                                                              //core
                                                              pointer.appiumCore(token,devicePlatform,uploadedFile,configs).then(function(appiumLaunchStatus){
                                                                  logger.info("Status of pcloudy Appium Service Launch == > "+appiumLaunchStatus.status);
                                                              },function(appiumLaunchErr){
                                                                  logger.error("Service Launch error : "+appiumLaunchErr);
                                                                  var releaseStat = JSON.parse(appiumLaunchErr);
                                                                  logger.error('Error Status of Appium session release : '+releaseStat.result.msg);
                                                              })
                                                              //core
                                                          }else{
                                                              logger.info('could not upload  file : ' + status.file );
                                                              pointer.terminate();
                                                          }
                                                      }//else

                                                  }catch(err){
                                                      logger.debug("upload app sec err "+err);
                                                  }
                                                  }, function(uploadErr) {
                                                      logger.info(' uploadErr Error ' + JSON.stringify(uploadErr));
                                                  })
                                              } else {
                                                  //without upload when app is already present in pcloudy cloud drive
                                                  //core
                                                  pointer.appiumCore(token,devicePlatform,app,configs).then(function(appiumLaunchStatus){
                                                      logger.info("Status of pcloudy Appium Service Launch == > "+appiumLaunchStatus.status);
                                                  },function(appiumLaunchErr){
                                                      logger.debug("appium core reject 2 : "+appiumLaunchErr);
                                                      logger.error("Service Launch error : "+JSON.stringify(appiumLaunchErr));
                                                      pointer.terminate();
                                                  })
                                                  //core
                                              }
                                         }//getapps
                                      }, function(getAppsErr) {
                                          logger.debug("getAvailable apps Error : " + JSON.stringify(getAppsErr));
                                          pointer.terminate();
                                      })
                  }) //read line
              }//else
          }, function(err) {
              logger.debug("Error in Authenticating "+JSON.stringify(err));
              pointer.terminate();
          })
      }, function(errRead) {
          logger.warn('error reading config ' + errRead);
          pointer.terminate();
      })
    },
      appiumCore : function(token, platform, uploadedApp, configs) {
          logger.debug(" token " + token +" p " + platform + " a " + uploadedApp);
          //uploadedApp = "'" + uploadedApp + "'";
          var pointer = this;
          var promise = new Promise(function(resolve, reject) {
              try{
              pcloudyConnectorServices.GetDevices(token, 10, platform, "true").then(function(devices) {
                  var devDetails = JSON.parse(devices);
                  devDetails = devDetails.result;
                  if(devDetails.hasOwnProperty('error')){
                      logger.error("Error getting Devices list : "+devDetails.error);
                  } else{
                      var allDevsavilable = devDetails.models,
                      availabledevs = [],
                      sessionname = '';
                      if (allDevsavilable.length) {
                          logger.info(" == Available devices == ");

                          allDevsavilable.forEach(function(entry) {
                              logger.info("=========================================================================================");
                              logger.info(" Full Name : " + entry.full_name);
                              logger.info(" Device_ID  : " + entry.id);
                              /*logger.log(" model : "+entry.model);
                              logger.log(" display name : "+entry.display_name);
                              logger.log(" version : "+entry.version);
                              logger.log(" manufacturer : "+entry.manufacturer);
                              logger.log(" platform : "+entry.platform);
                              logger.log(" availability : "+entry.available);*/
                          });
                      } else {
                          logger.warn(" == There no devices available at this time try to book after some time == ");
                          pointer.terminate();
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
                              logger.info('\n\n ======= chosen Devices are =======');
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
                              pcloudyConnectorServices.BookDevicesForAppium(devDetails.token, 5, chosenDevs, platform, 'pcloudytest-' + platform, "true").then(function(bookDevstatus) {
                                  //logger.log('bookDev '+JSON.stringify(bookDevstatus));

                                  var bookedDevDetails = JSON.parse(bookDevstatus);
                                  bookedDevDetails = bookedDevDetails.result;
                                  if(bookedDevDetails.hasOwnProperty('error')){
                                      logger.error("Error while booking devices : "+bookedDevDetails.error);
                                  }
                                  else {
                                      var bookedDevices = bookedDevDetails.device_ids;
                                      logger.info("\n\n ============= Booked devices are ================== ");
                                      bookedDevices.forEach(function(i,index){
                                          logger.info(index+1 +": ==> "+i.manufacturer +"__"+ i.model +"__"+ i.version + ",  " + " Devicename :"+i.capabilities.deviceName + ", BrowserName : "+i.capabilities.browserName);
                                      })
                                      //logger.info('app passed ' + uploadedApp);
                                      pcloudyConnectorServices.initAppiumHubForApp(bookedDevDetails.token, uploadedApp).then(function(initAppiumHubForAppStat) {
                                                        var initHubresp = JSON.parse(initAppiumHubForAppStat);
                                                        initHubresp = initHubresp.result;
                                                        //logger.debug("initHubresp : "+JSON.stringify(initHubresp));
                                                        if(initHubresp.hasOwnProperty('error')){
                                                            logger.error("Error in initiating Appium hub "+initHubresp.error);
                                                            reject(initHubresp.error);
                                                            //terminate();
                                                        } else {
                                                            pcloudyConnectorServices.getAppiumEndPoint(initHubresp.token).then(function(getAppiumEndPointstat) {
                                                                var endPoint = JSON.parse(getAppiumEndPointstat);
                                                                logger.debug("getAppiumEndPoint : "+JSON.stringify(endPoint));
                                                                endPoint = endPoint.result;
                                                                if(endPoint.hasOwnProperty('error')){
                                                                    logger.error("getAppiumEndPoint Error : "+endPoint.error);
                                                                    reject(endPoint.error);
                                                                } else {
                                                                    //logger.info(JSON.stringify(endPoint));
                                                                    logger.info("\n ===================== Started Appium and Received Endpoint ================== \n ");
                                                                    logger.info(" endpoint  ==> " + endPoint.endpoint);
                                                                    var options = {};
                                                                    try{
                                                                    var totalBokkedDevs = bookedDevices.length;

                                                                        bookedDevices.forEach(function(i, index, bookedDevices) {

                                                                            options.desiredCapabilities = {};
                                                                            options.desiredCapabilities.launchTimeout = configs.desiredCapabilities.host;
                                                                            options.desiredCapabilities.CommandTimeout = configs.desiredCapabilities.CommandTimeout;
                                                                            options.desiredCapabilities.deviceName = i.capabilities.deviceName;
                                                                            options.desiredCapabilities.browserName = i.capabilities.browserName;
                                                                            options.desiredCapabilities.platformName = i.capabilities.platformName;
                                                                            options.desiredCapabilities.appPackage = configs.desiredCapabilities.appPackage;
                                                                            options.desiredCapabilities.appActivity = configs.desiredCapabilities.appActivity;
                                                                            options.desiredCapabilities.rotatable = configs.desiredCapabilities.rotatable;
                                                                            options.logLevel = configs.logLevel;
                                                                            options.logOutput = configs.logOutput;
                                                                            options.protocol = configs.protocol;
                                                                            options.host = configs.host;
                                                                            options.port = configs.port;
                                                                            options.coloredLogs = configs.coloredLogs;
                                                                            options.bail = configs.bail;
                                                                            options.screenshotPath = configs.screenshotPath;
                                                                            options.screenshotOnReject = configs.screenshotOnReject;

                                                                            var hubUrl = endPoint.endpoint + '/wd/hub';
                                                                            var p = options.protocol + "://" + options.host;
                                                                            options.path = hubUrl.split(p)[1];
                                                                            var unixTime = Math.round(+new Date() / 1000);
                                                                            pointer.timeConverter(unixTime).then(function(readableTime) {
                                                                                unixTime = readableTime;
                                                                            })

                                                                            var client = webdriverio.remote(options)
                                                                            .init().saveScreenshot(configs.screenshotPath + '/pcloudy-' + i.manufacturer + '-' + i.model + '-' + i.version + '-' + i.capabilities.deviceName + '-' + unixTime + '.png');


                                                                            logger.info("*################################################### Add your Appium Code Here  #####################################*");

                                                                            var model = i.model,rid = i.rid;
                                                                            setTimeout(function(){
                                                                                logger.info('Going to end webdriver client of '+model);
                                                                                client.end();
                                                                                pcloudyConnectorServices.releaseAppiumsession(token,rid,0).then(function(releaseAppiumsession){
      									                                                              logger.info('\n\n Releasing the Appium Session of '+model);
                                                                                      var releaseStat = JSON.parse(releaseAppiumsession);
                                                                                      releaseStat = releaseStat.result;
                                                                                      if(releaseStat.hasOwnProperty('error')){
                                                                                          logger.error("\n\n There was a error while releasing appium session "+releaseStat.error);
                                                                                      }else{
                                                                                          logger.info('\n\n Status of Appium session release for model : '+model + ' ==  '  +releaseStat.msg);
                                                                                      }
                                                                                  },function(releaseAppiumsessionErr){
                                                                                      logger.error('\n releaseAppiumsession '+JSON.stringify(releaseAppiumsessionErr));
                                                                                  })

                                                                            },60000)
                                                                            /*################################################## Add your code ################################################*/

                                                                            logger.debug(" Webdriver Init : " + i.model);
                                                                            if(bookedDevices[index + 1]){
                                                                                var next = bookedDevices[index + 1].manufacturer+'--'+bookedDevices[index + 1].model;
                                                                                logger.debug("Webdriver Init Next : " + ((bookedDevices.length - 1 === index) ? resolve({'status':'done'}) : next));
                                                                            }
                                                                        })
                                                                    }catch(errrr){
                                                                        logger.error("options set Each err : "+errrr);
                                                                    }
                                                                }
                                                            }, function(getAppiumEndPointErr) {
                                                                logger.Error(" getAppiumEndPointErr : "+JSON.stringify(getAppiumEndPointErr));
                                                                reject(getAppiumEndPointErr);
                                                            })
                                                        }
                                                    }, function(initAppiumHubForAppErr) {
                                                        logger.error('initAppiumHubForAppErr ' + JSON.stringify(initAppiumHubForAppErr));
                                                        reject(initAppiumHubForAppErr);
                                                    })
                                  }//else
                          }, function(bookdevErr) {
                              logger.debug('bookdevErr ' + JSON.stringify(bookdevErr));
                              reject(bookdevErr);
                          })
                      }); //rl
                  } catch (exp) {
                      logger.info("Err in appium core : " + exp);
                  }
              }//else
          }, function(getDevErr) {
              logger.debug('getDevices Err : ' + JSON.stringify(getDevErr));
              reject(getDevErr);
          })
      }catch(err){
          logger.error("Error : "+err);
      }
      })
      return promise;
      },
      timeConverter : function(UNIX_timestamp) {
          var promise = new Promise(function(resolve, reject) {
              var a = new Date(UNIX_timestamp * 1000);
              var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              var year = a.getFullYear();
              var month = months[a.getMonth()];
              var date = a.getDate();
              var hour = a.getHours();
              var min = a.getMinutes();
              var sec = a.getSeconds();
              var time = date + '__' + month + '__' + year + '__' + hour + ':' + min + ':' + sec;
              resolve(time);
          })
          return promise;
      },
      terminate : function(){
          process.exit(0);
      }
}
}
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
    process.exit(0);
});
