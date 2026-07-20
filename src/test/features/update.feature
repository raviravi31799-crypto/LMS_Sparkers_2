@jagadeep
Feature: Employee Training Management_SRIRAM_K_15/7/2026

  Background:
    Given the user navigates to the Employee Training Records page

  Scenario: Verify the user can edit the last employee training record

    When the user clicks the edit icon of the last employee training record
    And the user updates the employee training details
      | course           | AI-DS Updated |
      | trainerName      | ARUN Updated  |
      | status           | Completed     |
      | percentCompleted | 100           |
    And the user clicks the Update button
    Then the employee training record should be updated successfully