@visibilityOfAdministrationTabsForAdmin

Feature: logging in as an administrator
I want to be able to perform administration options (e.g. options related to the school)
Background:
	Given admin arrives on the Schul-Cloud homepage
	Given admin logs in
    Given admin accepts data protection

Scenario:
    When click left navigation item "administration"
    Then Verify if all required tabs are visible in Administration area
    | tabs   |
    |SCHÜLER | 
    | LEHRER | 
    | KURSE  |
    |KLASSEN |
    | TEAMS  |
    | SCHULE |
