Feature: Appointments API
  As a client
  I want to manage appointments
  So that I can schedule visits

  Scenario: Create a new appointment
    Given the following doctors exist:
      | name             | specialty        |
      | Dr. House        | Diagnostics      |
    And the following patients exist:
      | name      | email            |
      | John Doe  | john@example.com |
    When I send a POST request to "/api/v1/appointments" with the following:
      """
      {
        "appointment": {
          "doctor_id": 1,
          "patient_id": 1,
          "appointment_date": "2025-12-25T10:00:00Z"
        }
      }
      """
    Then the response status should be 201
    And the response should contain the appointment date "2025-12-25T10:00:00.000Z"
