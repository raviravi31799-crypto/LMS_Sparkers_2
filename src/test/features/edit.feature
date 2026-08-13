@Subha
Feature: Updated_Employee Training Management_SUBHASHREE_R_12/8/2026

  Background:
   Given the user launched the application 

  @editSubha
  Scenario: Update all editable fields for an employee training record
  When the user clicks the edit icon for the employee training record
  And updates the following fields
    | Field             |
    | projectName       |
    | course            |
    | trainerName       |
    | trainingType      |
    | status            |
    | percentCompleted  |
    | StartDate         |
    | EndDate           |
  And clicks the Update button
  Then the training record list should display the updated values
  @bugSubha
  Scenario: Reject invalid % Completed value on edit
    Given the user edits the % Completed field with an invalid value
    When the user clicks Update
    Then the value should be rejected and the record should retain its original % Completed