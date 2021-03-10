@userSettings @language
Feature: Test set for user settings

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @changeLanguageMenu
    Scenario Outline: As a user, I want to be able to change the language
        Given <userRole> logs in with email '<username>' and password '<password>'
        #And <userRole> login is successful
        And <userRole> goes to user settings
        When <userRole> fill password in settings '<password>'
        And <userRole> changes language to '<language>'
        Then <userRole> should see that all menu items are visible: '<menuItems>'
        Examples:
            | userRole | username                          | password       | language | menuItems                                                                                                     |
            | admin    | olivier.admin.qa@schul-cloud.org  | Schulcloud1qa! | Englisch | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,MANAGEMENT,HELP SECTION           |
            | teacher  | dmitri.teacher.qa@schul-cloud.org | Schulcloud1qa! | Englisch | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,MANAGEMENT,HELP SECTION           |
            | student  | ole.bart.qa@schul-cloud.org       | Schulcloud1qa! | Englisch | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LEARNING STORE,ADD-ONS,HELP SECTION                      |
