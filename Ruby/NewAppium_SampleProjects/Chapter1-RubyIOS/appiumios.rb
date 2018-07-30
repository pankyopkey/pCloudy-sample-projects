$VERBOSE = nil
require 'appium_lib'
require 'test/unit'

# Configure call to Appium Server
# More information is available at http://appium.io/slate/en/master/?ruby#appium-server-capabilities.
class LoginClass < Test::Unit::TestCase

 def setup
    server_url = "https://device.pcloudy.com/appiumcloud/wd/hub"

    caps = {}
    caps['pCloudy_Username'] = 'Enter your Email-id'
    caps['pCloudy_ApiKey'] = 'Enter your API Key'
    caps['pCloudy_ApplicationName'] = 'TestmunkDemo.ipa'
    caps['pCloudy_DurationInMinutes'] = '10'
    caps['platformName'] = 'ios'
    caps['pCloudy_DeviceVersion'] = '10.3.3'
    caps['pCloudy_DeviceFullName'] = ''
    caps['pCloudy_DeviceManafacturer'] = "Apple"
    caps['newCommandTimeout'] = '600'
    caps['launchTimeout'] = '90000'
    caps['browserName'] = 'Safari'
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
    #sleep(5)
 end

 def test_login

    el1 = driver.find_element(:xpath, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]")
    el1.send_keys "test@testname.com"
    puts 'email id inserted'
    el2 = driver.find_element(:xpath, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]")
    el2.send_keys "testmunk"
    puts 'password inserted'
    el3 = driver.find_element(:xpath, "//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]")
    el3.click
    puts 'login button clicked'

 end

 def teardown
    #driver.quit
 end

end

