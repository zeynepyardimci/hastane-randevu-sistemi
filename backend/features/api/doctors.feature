Feature: Doctors API
  As a client
  I want to manage doctors
  So that I can keep track of medical staff

  Scenario: List all doctors
    Given the following doctors exist:
      | name             | specialty        |
      | Dr. Gregory House| Diagnostic Medicine |
      | Dr. Meredith Grey| General Surgery     |
    When I send a GET request to "/api/v1/doctors"
    Then the response status should be 200
    And the response should contain 2 doctors
    And the first doctor's name should be "Dr. Gregory House"

  Scenario: Create a new doctor
    When I send a POST request to "/api/v1/doctors" with the following:
      """
      {
        "doctor": {
          "name": "Dr. John Dorian",
          "specialty": "Internal Medicine"
        }
      }
      """
    Then the response status should be 201
    And the response should contain the doctor "Dr. John Dorian"
