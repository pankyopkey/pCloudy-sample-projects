$VERBOSE = nil
require 'rubygems'
require 'appium_lib'
require './AppiumConnector'
require './SampleTestCase'
require './CommonMethods'
require 'json'
require 'uri'


# Auth Details
cloudUrl = 'https://device.pcloudy.com/api'
emailId = 'Enter Email Id'
apiKey = 'Enter API Key'

# Session Details
SessioName = 'Appium Session'   #provide a valid name for session
ExpectedDurationOfSession = 30 #provide expected duration of test run in minutes
Platfrom = 'Android'           #provide platform name as Android or iOS

# DeviceDetails   ( Enter the variable value based on )
manufacturerName = 'Samsung'
maxCount = 4   # No. of devices
fromLowerVersion = 5.0  # Lower end of OS version
toHigherVersion = 7.0 # Higher end of OS Version
devicesList = ['Samsung_GalaxyTabS2-9.7_Android_7.0.0','Samsung_GalaxyS3_Android_4.3.0']   #if you need run on fixed device list

# App details
AppName = 'pCloudyAppiumDemo.apk'  #this file should be available in pCloudy Drive

# Create Appium Connection
authToken = authentication(cloudUrl, emailId, apiKey)

# Select Devices

aSelectedDevices = chooseDevicesAmongManufacturer(authToken, Platfrom, manufacturerName, maxCount)
# aSelectedDevices = chooseDevicesBetweenVersion(authToken, Platfrom, low, high, maxCount)
# aSelectedDevices = chooseFixedDevicesList(authToken, Platfrom, devicesList)
# aSelectedDevices = chooseDevicesFromfulllist(authToken, Platfrom, bookDuration)

aBookedDevices = bookDevicesForAppium(authToken, Platfrom, aSelectedDevices, ExpectedDurationOfSession, SessioName)
puts "Device Booked Successfully"

# Intiate Appium Hub
endPoint = getServerUrl(authToken, AppName)
puts "Appium Endpoint #{endPoint}"
server_url = endPoint

def test1(aBookedDevices, server_url, i, authToken)

  rid=aBookedDevices['result']['device_ids'][i]['rid']
  begin

    caps = {}
    caps['appPackage'] = 'com.pcloudy.appiumdemo'
    caps['appActivity'] = 'com.ba.mobile.LaunchActivity'
    caps['deviceName'] = aBookedDevices['result']['device_ids'][i]['capabilities']['deviceName']
    caps['platformName'] = Platfrom

    appium_driver = Appium::Driver.new({
                                           'caps' => caps,
                                           'appium_lib' => {
                                               :server_url => server_url
                                           }}, true)


    driver = appium_driver.start_driver
    Appium.promote_appium_methods Object
    sleep(5)
    #Start TestCase Execution
    testCase1(driver)
    #Release The Device from LiveView
    releaseSession(authToken,rid)

  rescue StandardError => msg

    releaseSession(authToken,rid)
    puts msg

  end
end

threads = (0..aSelectedDevices.length - 1).map do |i|
  Thread.new(i) do |i|
    test1(aBookedDevices, server_url, i, authToken)
  end
end
threads.each {|t| t.join}
