  require 'selenium/webdriver'
  require 'capybara/cucumber'

  # monkey patch to avoid reset sessions
  class Capybara::Selenium::Driver < Capybara::Driver::Base
    def reset!
      if @browser
        @browser.navigate.to('about:blank')
      end
    end
  end


  CONFIG_NAME ='singleDevice' 



  Capybara.register_driver :pcloudy do |app|
    caps={
          "appium:browserName" => "chrome",
          "appium:pCloudy_Username" => "Enter your Email-id",
          "appium:pCloudy_ApiKey" => "Enter your API Key",                
          "appium:pCloudy_DurationInMinutes" => "10",
          "appium:pCloudy_DeviceFullName" =>"SAMSUNG_GalaxyNote20_Android_12.0.0_dd2e9",
          "appium:platformName" =>  "Android",   
          "appium:automationName" => "uiautomator2",
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
