require 'appium_capybara'

Capybara.register_driver(:pcloudy) do |app|
  Appium::Capybara::Driver.new app, capabilities: {
            "appium:browserName" => "",
            "appium:pCloudy_Username" => "abhinav.purokait@sstsinc.com",
            "appium:pCloudy_ApiKey" => "49zfjq28dxchvnxgg35nqpfd",  
            "appium:pCloudy_ApplicationName" => "TestmunkDemo_Resigned1675153426.ipa",              
            "appium:pCloudy_DurationInMinutes" => "10",
            "appium:pCloudy_DeviceFullName" =>"APPLE_iPhone11ProMax_iOS_15.0.0_b99a8",
            "appium:platformName" => "ios",
            "appium:platformVersion" =>  "15.0.0",   
            "appium:automationName" => "XCUITest",
            "appium:newCommandTimeout" => "600",
            "appium:launchTimeout" => "90000",
            "appium:bundleId" => "com.pcloudy.TestmunkDemo",
            "appium:acceptAlerts" => "true",
            "appium:pCloudy_EnableVideo" => "true",
  
    },
    appium_lib: { server_url: 'https://device.pcloudy.com/appiumcloud/wd/hub' },
    global_driver: false
end

Capybara.default_driver = :pcloudy

capy_driver = Capybara.current_session.driver
capy_driver.browser
