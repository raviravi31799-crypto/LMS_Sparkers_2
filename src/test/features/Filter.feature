@Jothika
Feature: Filter records using different filters-Jothika (16/07/2026)

Description: This feature describes the functionality of different filters

Background:
Given the user launched the application 

Scenario Outline: Verify the validfilter functionality
And the user applied "<filters>" for different "<columns>" such as ProjectName,EmpId,Course etc
Then the application should display matching "<columns>" value for applied "<filters>"

Examples:
|filters | columns           |
|Project | ABC               |
|EmpId   | 12345             |
|Student | Sriram            |
|Course  | Java Automation   |
|Trainer | Ravi              |


@filter
Scenario: Verify filter functionality with non-existing values -updated 12/08/2026
When the user applies invalid filters from JSON
Then the application should not display any matching records


@filtertype
Scenario Outline: Verify filter functionality using Training Type -20/08/2026
    When the user selects "<TrainingType>" from the Training Type dropdown
    Then the application should display matching "<TrainingType>" value in Training Type column

Examples:
    | TrainingType |
    | Udemy        |
    | Coursera     |
    | Classroom    |
    | Virtual      |