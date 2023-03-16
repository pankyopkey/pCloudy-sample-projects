require 'appium_capybara'

Capybara.register_driver(:pcloudy) do |app|
  Appium::Capybara::Driver.new app, capabilities: {
            "appium:browserName" => "",
            "appium:pCloudy_Username" => "abhinav.purokait@sstsinc.com",
            "appium:pCloudy_ApiKey" => "49zfjq28dxchvnxgg35nqpfd",  
            "appium:pCloudy_ApplicationName" => "pCloudyAppiumDemo-1674560861.apk",              
            "appium:pCloudy_DurationInMinutes" => "10",
            "appium:pCloudy_DeviceFullName" =>"GOOGLE_Pixel7Pro_Android_13.0.0_dbf82",
            "appium:platformVersion" =>  "Android",   
            "appium:automationName" => "uiautomator2",
            "appium:newCommandTimeout" => "600",
            "appium:launchTimeout" => "90000",
            "appium:appPackage" => "com.pcloudy.appiumdemo",
            "appium:appActivity" => "com.ba.mobile.LaunchActivity",
            "appium:pCloudy_EnableVideo" => "true",
  
    },
    appium_lib: { server_url: 'https://device.pcloudy.com/appiumcloud/wd/hub' },
    global_driver: false
end

Capybara.default_driver = :pcloudy

capy_driver = Capybara.current_session.driver
capy_driver.browser
