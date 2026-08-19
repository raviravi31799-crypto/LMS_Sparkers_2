@sriram @Delete
Feature: Delete Records - Sriram

  Background:
    Given the user navigates to the Employee Training Records page

  @Delete_Sriram
  Scenario: Verify the user can delete an employee training record for Sriram
    When the user clicks the Delete icon for Sriram
    Then the selected employee training record should not be displayed in the list for Sriram
