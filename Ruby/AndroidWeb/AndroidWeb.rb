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
bookDuration=5

authToken = authenticateUser(emailId,apiKey)

getDevices(authToken,10,'Android',true)

puts 'Select Single Device'
puts '===================='

response = gets.chomp
array = response.split(/,/)


aDevice = bookDevices(authToken,'Android',array,bookDuration,'Appium Session')
puts "Devices booked successfully"

rid=aDevice['rid']

initAppiumHubForBrowser(authToken,'Chrome')
endPoint=getAppiumEndpoint(authToken)
puts "Appium Endpoint #{endPoint}"

server_url = endPoint

desired_caps = {
   caps:  {
        platformName:    aDevice['capabilities']['platformName'],
        platformVersion:   aDevice['version'],
        deviceName:      aDevice['capabilities']['deviceName'],
        browserName:     'Chrome',
	#appPackage:'com.ba.mobile',
	#appActivity:'com.ba.mobile.LaunchActivity',
	#custom_url:server_url
    },
    appium_lib: {
           wait_timeout: 30,
	   server_url:server_url
         }

}


# Create a new Appium specific driver with helpers availabe
appium = Appium::Driver.new(desired_caps,true)

# Standard Selenium driver without any Appium methods.
# Need to convert to Selenium driver to make "get" call
# since Appium doesn't support "get" method.

driver=appium.start_driver

# Promote appium method to class instance methods
# Without promoting we would need to make all calls with the @appium_driver, example:
#   @appium_driver.find_element(:id, 'lst-ib')
# After promoting to a class instance method we can the method directly, example:
#   find_element(:id, 'lst-ib')
Appium.promote_appium_methods Object

# Open web page
driver.get("http://www.google.com/")
# Extra time to allow webpage to load
sleep(5)

# Find Search Box element, click on it, type in Search Query
element = find_element(:id, 'lst-ib')
element.click
element.send_keys 'Steven Miller Dentedghost Appium'

# Extra pause for demostration
sleep(2)

# Find Search Button element, click on it
element = find_element(:id, 'tsbb')
element.click

# Extra time to allow webpage to load
sleep (5)

# Properly close down the driver
driver_quit

#Properly release the Appium Session
releaseSession(authToken,rid)

# Print test pass success message
puts "Tests Succeeded"
