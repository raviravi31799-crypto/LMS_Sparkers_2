@Harini
Feature: Delete Records_Harini_16/7/2026

  Background:
    Given the user navigates to the Employee Training Records page
 @Delete
  Scenario: Verify the user can delete an employee training record
    When the user clicks the Delete icon
    Then the selected employee training record should not be displayed in the list
    
@DeleteValidation
Scenario: Verify deleting one employee record does not remove other records
  When the user clicks the Delete icon
  Then the selected employee training record should not be displayed in the list
  And other employee training records should still be displayed

@FilterDelete
Scenario: Verify delete functionality after filtering by Classroom
  When the user filters the records using Classroom "<trainigType>"
  And the user deletes the first record from the filtered results
  Then the first record should be deleted successfully
  And other employee training records should still be displayed

Examples:
  | trainingType |
  | Udemy       |