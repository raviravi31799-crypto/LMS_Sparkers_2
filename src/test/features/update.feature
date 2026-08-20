@jagadeep

Feature: Employee Training Management_Update_JAGADEEP_KC

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


Scenario: Verify the user cannot update the training record with an empty course

    When the user clicks the edit icon of the last employee training record

    And the user updates the employee training details
        | course           |                |
        | trainerName      | ARUN Updated   |
        | status           | Completed      |
        | percentCompleted | 100            |

    And the user clicks the Update button

    Then the course validation message should be displayed