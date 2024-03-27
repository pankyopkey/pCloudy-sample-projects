Feature: Flight Search Feature

  Scenario: Perform Flight Search
    Given the user has accepted the terms and conditions
    When the user clicks on the Flight button
    And the user selects 'Bangalore, India (BLR)' from the departure location
    And the user selects 'Pune, India (PNQ)' as the destination
    And the user chooses a one-way trip
    And the user selects the departure time
    Then clicks on the search flights button
    
    

 