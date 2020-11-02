@changeLanguageMenu
Feature: Change language

    Background:
        Given user arrives on the Schul-Cloud homepage

    Scenario Outline: As a user, I want to be able to change the language
        When <userRole> logs in with email '<username>' and password '<password>'
        And '<userRole>' performs first login actions
        And <userRole> login is successful
        And <userRole> goes to user settings
        And <userRole> changes language to '<language>'
        Then <userRole> should see that all menu items are visible: '<menuItems>'
        Examples:
            | userRole | username                   | password     | language | menuItems                                                                                                 |
            | admin    | admin@schul-cloud.org      | Schulcloud1! | English  | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LERN-STORE,ADD-ONS,HELP DESK,MANAGEMENT,HELP SECTION |
            | teacher  | klara.fall@schul-cloud.org | Schulcloud1! | English  | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LERN-STORE,ADD-ONS,MANAGEMENT,HELP SECTION           |
            | student  | paula.meyer@schul-cloud.org| Schulcloud1! | English  | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LERN-STORE,ADD-ONS,HELP SECTION |