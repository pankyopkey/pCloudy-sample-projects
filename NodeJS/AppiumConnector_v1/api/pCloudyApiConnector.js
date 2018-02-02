var logger = require('.././helpers/logger.js'),
Promise = require('promise'),
request = require('request'),
fs = require('graceful-fs'),
exec = require('child_process').exec,
headers = {
  'Content-Type': 'application/json',
  'User-Agent': 'Super Agent/0.0.1'
  //'Content-Type': 'text/plain',
  //'Content-Type':     'application/x-www-form-urlencoded'
},
webdriverio = require('webdriverio');

module.exports = function pcloudyServices(cloudName) {
  return {
    initWebdriver : function(options){
      var promise = new Promise(function(resolve,reject){
        try{
          logger.info("called init"+options.desiredCapabilities.deviceName);
          var client = webdriverio.remote(options);
          resolve({"client":client});
        }catch(e){
          reject({"error":e});
        }
      })
      return promise;
    },
    fileRead : function(fname){
      var promise = new Promise(function(resolve,reject){
        fs.readFile(fname, 'utf8', function(err, contents){
          if(err){
            resolve({"error":err});
          }else{
            resolve({"data":contents});
            //logger.info(contents);
          }
        });
      })
      return promise;
    },
    AuthenticateUser : function(email,apiKey){
      // Start the request
      // Configure the request
      var pointer = this,
      auth = "Basic " + new Buffer(email + ":" + apiKey).toString("base64"),

      options = {
        url: 'https://'+cloudName+'/api/access',
        method: 'GET',
        headers: {
          "Authorization" : auth
        }
      };
      var promise = new Promise(function(resolve,reject){
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          } else{
            reject({'error':error});
          }
        })
      });
      return promise;
    },
    GetDevices: function(token,duration,platform,available_now){
      var options = {
        url: 'https://'+cloudName+'/api/devices',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token,'duration': duration,'platform':platform,'available_now':available_now})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          }else{
            reject(error);
          }
        })
      })
      return promise;
    },
    BookDevicesForAppium: function(token,duration,devices,platform,session,overwrite_location){
      //logger.debug("BookDevicesForAppium : "+'https://'+cloudName+'/api/appium/init');
      var options = {
        url: 'https://'+cloudName+'/api/appium/init',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token,'duration': duration,'platform':platform,'devices': devices,'session':session,'overwrite_location':overwrite_location})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          }else{
            reject(error);
          }
        })
      })
      return promise;
    },
    initAppiumHubForApp: function(token,app){

      var options = {
        url: 'https://'+cloudName+'/api/appium/execute',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token,'app': app})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        logger.info(" \n\n ---- Starting Appium hub please wait ---");
        try {
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              // Print out the response body
              resolve(body);
            }else{

              reject(error);
            }
          })
        }catch(e){
          logger.info('initHub '+e);
        }
      })
      return promise;
    },
    installAndLaunchApp: function(token,rid,filename){

      var options = {
        url: 'https://'+cloudName+'/api/install_app',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token,'rid': rid,'filename':filename})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          }else{
            reject(error);
          }
        })
      })
      return promise;
    },
    releaseInstanceAccessBooking: function(token,rid){

      var options = {
        url: 'https://'+cloudName+'/api/release_device',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token,'rid': rid})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          }else{
            reject(error);
          }
        })
      })
      return promise;
    },
    getAppiumEndPoint : function(token){
      var options = {
        url: 'https://'+cloudName+'/api/appium/endpoint',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          }else{
            reject(error);
          }
        })
      })
      return promise;
    },
    getScreenShot : function(token,rid,skin){
      var options = {
        url: 'https://'+cloudName+'/api/capture_device_screenshot',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token,'rid':rid,'skin':skin})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          }else{
            reject(error);
          }
        })
      })
      return promise;
    },
    releaseAppiumsession: function(token,rid,releaseAfter){

      var options = {
        url: 'https://'+cloudName+'/api/appium/update_session',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token,'rid': rid,'release_after':releaseAfter})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        request(options, function (error, response, body) {

          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          }else{
            reject(error);
          }
        })
      })
      return promise;
    }
    ,
    GetAvailableApps : function(token,limit,filter){

      try{
      var options = {
        url: 'https://'+cloudName+'/api/drive',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        form: JSON.stringify({'token': token,"limit": limit, "filter": filter})
      };

      var promise = new Promise(function(resolve,reject){
        // Start the request
        request(options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            // Print out the response body
            resolve(body);
          }else{
            reject(error);
          }
        })
      })
    }catch(e){
      logger.info('e '+e);
    }
    return promise;
  },
   UploadApp : function(token, file, sourcetype, filter){
     var promise = new Promise(function(resolve, reject){
       try {
	 var cmd = '"' + __dirname + '/upload.sh"' + ' "' + file + '" ' + token + ' ' + cloudName;

         logger.debug("Upload Command: " + cmd);
         exec(cmd, function(err, stdout, stderr) {
            if (err) {
              console.error(err);
              reject(err);
            }
            console.log(stdout);
            var res = stdout;
            resolve(res);
         });
       } catch(e){
         logger.info('exp : '+e);
       }
     })
     return promise;
   }
  }
}
