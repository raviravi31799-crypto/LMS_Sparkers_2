@Jothika
Feature: Filter records using different filters-Jothika

Description: This feature describes the functionality of different filters

Background:
Given the user launched the application 

Scenario Outline: Verify the filter functionality
And the user applied "<filters>" for different "<columns>" such as ProjectName,EmpId,Course etc
Then the application should display matching "<columns>" value

Examples:
|filters | columns |
|Project | ABC     |
|EmpId   | 1002    |
|Student | Sriram  |
|Course  | AI-DS   |
|Trainer | Arun    |

