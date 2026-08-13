@sriram
Feature: Employee Training Management_SRIRAM_K_15/7/2026

  Background:
    Given the user navigates to the Employee Training Records page
    And the user clicks the Add Training button from sidebar

  Scenario: Verify the user can create a new employee training record

    And the user enters valid employee training details
    And the user clicks the Add button
    Then the employee training record should be created successfully
    And the employee training record should be displayed in the Employee Training list

  Scenario Outline: Verify that the user cannot create a new employee training record without providing the required details

  When the user enters "<project_name>", "<emp_id>", "<emp_name>", "<course_name>", "<trainer_name>", "<training_type>", "<start_date>", "<end_date>", "<status>", "<complete_percentage>" in the respective fields
  Then the user click the add button so they seen the warnning alert

  Examples:
  | project_name | emp_id | emp_name | course_name          | trainer_name | training_type | start_date | end_date   | status      | complete_percentage |
  | ABC          | 12345  | Sriram   | AI-DS                |              | Udemy         | 2026-08-01 | 2026-08-05 | Completed   | 100 |