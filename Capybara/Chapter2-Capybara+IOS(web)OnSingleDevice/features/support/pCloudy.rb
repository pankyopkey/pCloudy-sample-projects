  require 'selenium/webdriver'
  require 'capybara/cucumber'



  CONFIG_NAME ='singleDevice' 



  Capybara.register_driver :pcloudy do |app|
    caps={
      "appium:browserName" => "safari",
      "appium:pCloudy_Username" => "abhinav.purokait@sstsinc.com",
      "appium:pCloudy_ApiKey" => "49zfjq28dxchvnxgg35nqpfd",                
      "appium:pCloudy_DurationInMinutes" => "10",
      "appium:pCloudy_DeviceFullName" =>"APPLE_iPadPro3rdGen_iOS_15.5.0_c727b",
      "appium:platformName" =>  "ios",   
      "appium:automationName" => "XCUITest",
      "appium:newCommandTimeout" => "600",
      "appium:launchTimeout" => "90000",
      "appium:pCloudy_EnableVideo" => "true",
          }


    Capybara::Selenium::Driver.new(app,
      :url => "https://device.pcloudy.com/appiumcloud/wd/hub",
      :capabilities=> caps
    )
  end

  Capybara.default_driver = :pcloudy
  Capybara.run_server = false
