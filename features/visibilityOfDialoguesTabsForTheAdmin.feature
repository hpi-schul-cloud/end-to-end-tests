@visibilityOfAdministrationTabsForAdmin


Feature: logging in as an administrator
I want to be able to perform administration options (e.g. options related to the school)
Background:
	Given The admin arrives on the Schul-Cloud page
	Given The admin is logged in successfully

Scenario:
    Then The admin is supposed to accept the data protection agreement
    When The admin goes to the Administration page
    Then Verify if all required tabs are visible in Administration area
    | tabs   |
    |SCHÜLER | 
    | LEHRER | 
    | KURSE  |
    |KLASSEN |
    | TEAMS  |
    | SCHULE |
