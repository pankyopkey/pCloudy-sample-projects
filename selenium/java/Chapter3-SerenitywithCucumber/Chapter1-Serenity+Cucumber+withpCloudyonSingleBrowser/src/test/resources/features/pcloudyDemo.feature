Feature: Login to pCloudy

  Scenario: User logs in with valid credentials
    Given the user navigates to 'https://device.pcloudy.com/'
    When the user enters the username and password
    And clicks on the login button
    Then the user should be logged in successfully