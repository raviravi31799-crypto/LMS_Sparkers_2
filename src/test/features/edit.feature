@Subha
Feature: Employee Training Management_SUBHASHREE_R_16/7/2026

  Background:
    Given the user navigates to the Employee Training Records page

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