Given /^Open App$/ do 
    
end

When /^Enter Username$/ do 
  Capybara.current_session.driver.appium_driver.find_element(:xpath,'//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeTextField[1]')
  .send_keys("test@pcloudy.com")
end

When /^Enter Password$/ do 
  Capybara.current_session.driver.appium_driver.find_element(:xpath, '//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeSecureTextField[1]')
  .send_keys("test@123")
end

When /^Click on Login$/ do 
  Capybara.current_session.driver.appium_driver.find_element(:xpath, '//XCUIElementTypeApplication[1]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[1]/XCUIElementTypeButton[1]')
  .click
end  


