Feature: Login Functionality

  Scenario: User logs in with valid credentials
    Given the user is on the login screen
    When the user enters the email-id "test@testname.com"
    And the user enters the password "testmunk"
    And clicks on the login button
    Then the user should be logged in successfully

 