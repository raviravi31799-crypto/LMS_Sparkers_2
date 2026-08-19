@Harini
Feature: Delete Records_Harini_16/7/2026

  Background:
    Given the user navigates to the Employee Training Records page
 @Delete
  Scenario: Verify the user can delete an employee training record
    When the user clicks the Delete icon
    Then the selected employee training record should not be displayed in the list
    
@Delete
Scenario: Verify deleting one employee record does not remove other records
  When the user clicks the Delete icon
  Then the selected employee training record should not be displayed in the list
  And other employee training records should still be displayed