@sriram
Feature: Verify filter functionality for different columns

  Background:
    Given the user navigates to the Employee Training Records page

  Scenario Outline: Verify filter functionality for different columns
    When the user clicks the "Training Summary" menu
    And the user enters "<project name>" in the Project Name filter field
    And the user enters "<emp id>" in the Employee ID filter field
    And the user enters "<emp name>" in the Employee Name filter field
    And the user enters "<course name>" in the Course Name filter field
    And the user enters "<trainer name>" in the Trainer Name filter field
    And the user enters "<training type>" in the Training Type filter field
    And the user enters "<start date>" in the Start Date filter field
    And the user enters "<end date>" in the End Date filter field
    And the user enters "<percentage>" in the Percentage filter field
    Then the user should see the filtered records based on the provided filter criteria

    Examples:
      | project name | emp id | emp name | course name | trainer name | training type | start date | end date   | percentage |
      | Project A    | EMP001 | Sriram   | Java        | Trainer A    | Online        | 01/08/2026 | 10/08/2026 | 80         |
      | Project B    | EMP002 | Kumar    | Selenium    | Trainer B    | Offline       | 05/08/2026 | 15/08/2026 | 90         |
      | Project C    | EMP003 | Ravi     | JMeter      | Trainer C    | Online        | 10/08/2026 | 18/08/2026 | 75         |