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
    caps['pCloudy_ApplicationName'] = 'pCloudyAppiumDemo.apk'
    caps['pCloudy_DurationInMinutes'] = '10'
    caps['platformName'] = 'Android'
    caps['pCloudy_DeviceManafacturer'] = "Samsung"
   #caps['pCloudy_DeviceFullName'] = 'Samsung_GalaxyTabA_Android_7.1.1'
   #caps['pCloudy_DeviceVersion'] = '7.1.1'   
    caps['newCommandTimeout'] = '600'
    caps['launchTimeout'] = '90000'
    caps['appPackage'] = 'com.pcloudy.appiumdemo'
    caps['appActivity'] = 'com.ba.mobile.LaunchActivity'

   

    appium_driver = Appium::Driver.new({
                                           'caps' => caps,
                                           'appium_lib' => {
                                               :server_url => server_url
                                           }}, true)


    driver = appium_driver.start_driver
    Appium.promote_appium_methods Object
    
 end

 def test_login
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/accept').click
    sleep(2)
    puts 'Accept Button Clicked'
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/flightButton').click
    sleep(2)
    puts 'Booked a flight button clicked'
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/spinnerfrom').click
    sleep(2)
    puts 'drop down clicked'
    driver.find_element(:xpath => "//android.widget.CheckedTextView[@text='Bangalore, India (BLR)']").click
    sleep(2)
    puts 'from location selected'
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/spinnerto').click
    sleep(2)
    puts 'drop down clicked'
    driver.find_element(:xpath => "//android.widget.CheckedTextView[@text='Pune, India (PNQ)']").click
    sleep(2)
    puts 'to location selected'
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/singleTrip').click
    sleep(2)
    puts 'radio button for single trip clicked'
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/txtdepart',:text => 'Departs').click
    sleep(2)
    puts 'departure is clicked'
    driver.find_element(:id => 'android:id/button1',:text => 'OK').click
    sleep(2)
    puts 'depature date is selected'
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/spinnerflight').click
    sleep(2)
    puts 'drop down is clicked'
    driver.find_element(:id => 'android:id/text1',:text => 'Premium Economy').click
    sleep(2)
    puts 'flight class premium economy is selected'
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/spinnerticket').click
    sleep(2)
    puts 'spinner ticket drop down is clicked'
    driver.find_element(:id => 'android:id/text1',:text => 'Lowest').click
    sleep(2)
    puts 'lowest spinner ticket is selected'
    driver.find_element(:id => 'com.pcloudy.appiumdemo:id/searchFlights').click
    sleep(2)
    puts 'Search flights Button Clicked'
    puts "Tests Succeeded"
 end

 def teardown
    driver.quit
 end

end

