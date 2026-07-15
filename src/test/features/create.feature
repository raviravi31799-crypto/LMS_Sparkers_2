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
