Feature: Login to pCloudy

  Scenario: User logs in with valid credentials
    Given the user navigates to 'https://device.pcloudy.com/'
    When the user enters the username 'test@testname.com'
    And the user enters the password 'testmunk'
    And clicks on the login button
