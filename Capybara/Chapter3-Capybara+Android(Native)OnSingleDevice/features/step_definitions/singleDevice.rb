Given /^Open App$/ do 
    
end

When /^Click on accept button$/ do 
  Capybara.current_session.driver.appium_driver.find_element(:id, 'com.pcloudy.appiumdemo:id/accept')
  .click
end

When /^Click on flight button$/ do 
  Capybara.current_session.driver.appium_driver.find_element(:id, 'com.pcloudy.appiumdemo:id/flightButton')
  .click
end




