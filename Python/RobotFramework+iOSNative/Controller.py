import requests
import json
import os
import time

class Connector:
    def __init__(self, url):
        self.base_url = url
        self.auth_key = None
        self.headers = {
            'Content-Type': 'application/json',
        }

    def authenticateUser(self, emailid, apikey):
        auth_token = None
        try:
            response = requests.get(self.base_url + '/access', verify=False, auth=(emailid, apikey))
            response_json = response.text
            response_dict = json.loads(response_json)
            auth_token = response_dict["result"]["token"]
        except:
            raise KeyError
        return auth_token

    def getDevices(self, authToken, duration_minutes, platform, showOnlyAvailable):
        data = {"token": authToken, "duration": 5, "platform": platform, "available_now": showOnlyAvailable}
        response = requests.post('https://device.pcloudy.com/api/devices', headers=self.headers, data=json.dumps(data),
                                 verify=False)
        response_json = response.text
        response_dict = json.loads(response_json)
        devices = response_dict["result"]["models"]
        devices = sorted(devices, key=lambda k: k['version'], reverse=True)
        return devices

    def chooseMultipleDevices(self, authToken, platform):

        devices = self.getDevices(authToken, 1, platform, True)
        for i, device in enumerate(devices):
            print "{}) {} {}  version : {}".format(i + 1, device["manufacturer"], device["display_name"],
                                                   device["version"])

        selectedDevices = raw_input("choose multiple devices(comma separated) \n").split(",")
        selected_device = []
        for deviceIndex in selectedDevices:
            selected_device.append(devices[int(deviceIndex) - 1])
        return selected_device

    def getAvailableAppIfUploaded(self, authToken, appName):
        availableApps = self.getAvailableApps(authToken, appName)
        for appData in availableApps:
            if (appData['file'] == appName):
                return appData
        return None

    def getAvailableApps(self, authToken, appName):
        data = {"token": authToken, "limit": 0, "filter": "all"}
        response = requests.post('https://device.pcloudy.com/api/drive', headers=self.headers, data=json.dumps(data),
                                 verify=False)

        file_name = json.loads(response.text)
        return file_name["result"]["files"]

    def uploadApp(self, authToken, app_path, printUploadProgress):
        return self.uploadAppCloud(authToken, app_path, printUploadProgress, "all")

    def uploadAppCloud(self, authToken, file_path, showProgressBar, fileTypeFilter):
        files = {
            'file': open(file_path, 'rb'),
            'source_type': (None, 'raw'),
            'token': (None, authToken),
            'filter': (None, fileTypeFilter)
        }
        response = requests.post('https://device.pcloudy.com/api/upload_file', files=files, verify=False)
        uploaded_file = json.loads(response.text)
        return uploaded_file["result"]

    def revokeTokenPrivileges(self, authToken):
        data = {'token': authToken}
        response = requests.post('https://device.pcloudy.com/api/exit', headers=self.headers, data=json.dumps(data),
                                 verify=False)

    def releaseDevice(self, authToken, rid):
        data = {"token": authToken, "rid": rid}
        print data
        response = requests.post('https://device.pcloudy.com/api/release_device', headers=self.headers,
                                 data=json.dumps(data), verify=False)


class AppiumConnector(Connector):
    def __init__(self, url):
        Connector.__init__(self, url)

    def bookDeviceForAppium(self, authToken, duration, platform, deviceList, sessionname):
        get_id = lambda device: device['id']
        deviceIDList = list(map(get_id, deviceList))

        data = {"token": authToken, "duration": duration, "platform": platform, "devices": deviceIDList,
                "session": sessionname, "overwrite_location": "true"}

        response = requests.post('https://device.pcloudy.com/api/appium/init', headers=self.headers,
                                 data=json.dumps(data), verify=False)
        result = json.loads(response.text)

        for i in range(len(deviceList)):
            deviceList[i]['id'] = result["result"]["device_ids"][i]["capabilities"]["deviceName"]
        return result["result"]["device_ids"]

    def initAppiumHubForApp(self, authToken, filename):
        data = {"token": authToken, "app": filename}
        print "Start Init " + time.strftime("%X")
        response = requests.post('https://device.pcloudy.com/api/appium/execute', headers=self.headers,
                                 data=json.dumps(data), verify=False)
        time.sleep(5)
        print "End Init " + time.strftime("%X")

    def getAppiumEndpoint(self, authToken):
        data = {"token": authToken}
        response = requests.post('https://device.pcloudy.com/api/appium/endpoint', headers=self.headers,
                                 data=json.dumps(data), verify=False)
        result = json.loads(response.text)
        return result["result"]["endpoint"]

    def getAppiumReportFolder(self, authToken):
        data = {"token": authToken}
        response = requests.post('https://device.pcloudy.com/api/appium/folder', headers=self.headers,
                                 data=json.dumps(data), verify=False)
        result = json.loads(response.text)
        return result["result"]["folder"]

    def releaseDeviceAppium(self, authToken, rid):
        data = {"token": authToken, "rid": rid, "release_after": 0}
        response = requests.post('https://device.pcloudy.com/api/appium/update_session', headers=self.headers,
                                 data=json.dumps(data), verify=False)
        result = json.loads(response.text)


con = AppiumConnector("https://device.pcloudy.com/api/")
try:
    auth_token = con.authenticateUser("Enter your Email-id", "Enter your password")
    print "User Authenticated"
except KeyError:
    print "Wrong UserId or Api Key"

file_to_upload = "./TestmunkDemo.ipa"


selected_device = con.chooseMultipleDevices(auth_token, "iOS")
print '\n'
session_name = selected_device[0]["display_name"] + " Appium Session";
bookedDevices = con.bookDeviceForAppium(auth_token, 10, "iOS", selected_device, session_name)

print "Devices booked succesfully"

alreadyUploadedApp = con.getAvailableAppIfUploaded(auth_token, os.path.basename(file_to_upload))

if (alreadyUploadedApp == None):
    print "Uploading app", os.path.abspath(file_to_upload)
    uploaded_file = con.uploadApp(auth_token, os.path.abspath(file_to_upload), False)
    alreadyUploadedApp = uploaded_file
    print "App uploaded Successfully"
else:
    print "App already Present"

con.initAppiumHubForApp(auth_token, alreadyUploadedApp['file'])
endpoint = con.getAppiumEndpoint(auth_token)
print "Appium endpoint :", endpoint
report_folder = con.getAppiumReportFolder(auth_token)
print "Appium Report folder :", report_folder

shellScriptFile = open(os.path.join(os.getcwd(), 'Sample.sh'), 'w+')
shellScriptFile.write('pabot ')
j=0
for i in range(len(bookedDevices)):
   j = j+1
   aDevice = bookedDevices[i]
   f = open(os.path.join(os.getcwd(), 'args'+aDevice['capabilities']['deviceName']+'.txt'), 'w')
   f.write('--variable deviceName:'+aDevice['capabilities']['deviceName'])
   f.write("\n")
   f.write('--variable endPoint:'+endpoint+'/wd/hub')
   f.close()
   shellScriptFile.write('--argumentfile'+str(j)+' args'+aDevice['capabilities']['deviceName']+'.txt ')

shellScriptFile.write('test.txt')
shellScriptFile.close()


import subprocess, sys

shellScriptFile = open(os.path.join(os.getcwd(), 'Sample.sh'), 'r')
command = shellScriptFile.read()
print command
time.sleep(20)
p = subprocess.Popen(command, shell=True, stderr=subprocess.PIPE)

while True:
    out = p.stderr.read(1)
    if out == '' and p.poll() != None:
        break
    if out != '':
        sys.stdout.write(out)
        sys.stdout.flush()


for i in range(len(bookedDevices)):
     aDevice = bookedDevices[i]
     con.releaseDeviceAppium(auth_token, aDevice['rid'],)

print "Execution Completed..."
