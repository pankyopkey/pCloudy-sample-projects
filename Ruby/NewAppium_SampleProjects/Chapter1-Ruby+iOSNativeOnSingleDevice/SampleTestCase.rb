$VERBOSE = nil
require 'appium_lib'
require 'test/unit'

# Configure call to Appium Server
# More information is available at http://appium.io/slate/en/master/?ruby#appium-server-capabilities.
class LoginClass < Test::Unit::TestCase

 def setup
    server_url = "https://device.pcloudy.com/appiumcloud/wd/hub"

    caps = {}
    caps['pCloudy_Username'] = 'EnterYourMailid'
    caps['pCloudy_ApiKey'] = 'EnterYourApiKey'
    caps['pCloudy_ApplicationName'] = 'TestmunkDemo.ipa'
    caps['pCloudy_DurationInMinutes'] = '10'
    caps['platformName'] = 'iOS'
    caps['pCloudy_DeviceManafacturer'] = 'Apple'
    #pCloudy_DeviceVersion is an optional capability
    #caps['pCloudy_DeviceVersion'] = '10.3.3'
    #pCloudy_DeviceFullName is an optional capability
    #caps['pCloudy_DeviceFullName'] = 'Apple_iPhone6S_Ios_11.2.0'   
    caps['newCommandTimeout'] = '600'
    caps['launchTimeout'] = '90000'
    caps['bundleId'] = 'com.pcloudy.TestmunkDemo'
    caps['usePrebuiltWDA'] = 'false'
    caps['acceptAlerts'] = 'true'
    caps['automationName'] = 'XCUITest'
   

    appium_driver = Appium::Driver.new({
                                           'caps' => caps,
                                           'appium_lib' => {
                                               :server_url => server_url
                                           }}, true)


    driver = appium_driver.start_driver
    Appium.promote_appium_methods Object
 end

 def test_login

    el1 = driver.find_element(:xpath, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]")
    el1.send_keys "test@testname.com"
    puts 'Email-id entered'
    el2 = driver.find_element(:xpath, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")
    el2.send_keys "testmunk"
    puts 'Password entered'
    el3 = driver.find_element(:xpath, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")
    el3.click
    puts 'login button clicked'

 end

 def teardown
    driver.quit
 end

end

