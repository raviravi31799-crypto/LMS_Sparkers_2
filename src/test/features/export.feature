@Harini
Feature: Export Employee Data to Excel

  Background:
      Given the user navigates to the Employee Training Records page
  Scenario: Verify Export to Excel functionality 
    When the user clicks the Export to Excel button
    Then the Excel file should be downloaded successfully