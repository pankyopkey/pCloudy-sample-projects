#include the needed gems

$VERBOSE = nil
require 'rubygems'
require 'appium_lib'
require './Auth'
require 'json'
require 'uri'

# Configure call to Appium Server
# More information is available at http://appium.io/slate/en/master/?ruby#appium-server-capabilities.

emailId='shibu.prasad@sstsinc.com'
apiKey='5vgzqqp4zrd2hdrgymbqz8yq'
bookDuration=1;

authToken = authenticateUser(emailId,apiKey)

getDevices(authToken,10,'Android',true)

puts 'Select Single Device'
puts '===================='

response = gets.chomp
array = response.split(/,/)


aDevice = bookDevices(authToken,'Android',array,bookDuration,'Appium Session')
puts "Device Booked Successfully"

rid=aDevice['rid']

initAppiumHubForApp(authToken,'pCloudy Appium Demo.apk')
endPoint=getAppiumEndpoint(authToken)
puts "Appium Endpoint #{endPoint}"
server_url = endPoint

desired_caps = {
   caps:  {
        platformName:    aDevice['capabilities']['platformName'],
        platformVersion:   aDevice['version'],
        deviceName:      aDevice['capabilities']['deviceName'],
	appPackage:'com.pcloudy.appiumdemo',
	appActivity:'com.ba.mobile.LaunchActivity',
    },
    appium_lib: {
           wait_timeout: 30,
	   server_url:server_url
         }

}


# Create a new Appium specific driver with helpers availabe
appium = Appium::Driver.new(desired_caps,true)

driver=appium.start_driver


# Promote appium method to class instance methods
# Without promoting we would need to make all calls with the @appium_driver, example:
# After promoting to a class instance method we can the method directly, example:
# find_element(:id, 'lst-ib')
Appium.promote_appium_methods Object

sleep(5)

driver.find_element(:id => 'com.pcloudy.appiumdemo:id/accept').click
#driver.find_element(:xpath,"//android.widget.Button[@resource-id='com.pcloudy.appiumdemo:id/accept' and @text='Accept']").click
puts 'Accept Button Clicked'

# Properly close down the driver
driver_quit
#Properly release the Appium Session
releaseSession(authToken,rid)

# Print test pass success message
puts "Tests Succeeded"
