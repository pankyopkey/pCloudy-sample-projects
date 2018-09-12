require 'rubygems'
require './AppiumConnector'

def testCase1(driver)

  sleep(5)

  driver.find_element(:id => 'com.pcloudy.appiumdemo:id/accept').click
  puts 'Accept Button Clicked'

  sleep(5)

  driver.find_element(:id => 'com.pcloudy.appiumdemo:id/flightButton').click
  puts 'Booked a flight button clicked'

  sleep(5)

  driver.find_element(:id => 'com.pcloudy.appiumdemo:id/searchFlights').click
  puts 'Search flights Button Clicked'

  sleep(5)
  driver.quit

end

