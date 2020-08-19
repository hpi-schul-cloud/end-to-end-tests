@visibilityOfAdministrationTabsForAdmin


Feature: logging in as an administrator
I want to be able to perform administration options (e.g. options related to the school)
Background:
	Given admin arrives on the Schul-Cloud homepage
	Given admin is successfully logged in

Scenario:
    Then admin accepts data protection
    When The admin goes to the Administration page
    Then Verify if all required tabs are visible in Administration area
    | tabs   |
    |SCHÜLER | 
    | LEHRER | 
    | KURSE  |
    |KLASSEN |
    | TEAMS  |
    | SCHULE |
