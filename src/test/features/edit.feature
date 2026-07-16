Feature: Employee Training Management_SUBHASHREE_R_16/7/2026

  Background:
    Given the user navigates to the Employee Training Records page

Scenario: Update all editable fields for an employee training record
  When the user clicks the edit icon for the employee training record
  And updates the following fields
    | Field         |
    | Project Name  |
    | Course        |
    | Trainer Name  |
    | Status        |
    | % Completed   |
    | Start Date    |
    | End Date      |
  And clicks the Update button
  Then the training record list should display the updated values