@changeLanguageMenu
Feature: Change language to english and check menu

    Background:
        Given user arrives on the Schul-Cloud homepage

    @adminAndTeacherChangesALanguageToEnglishAndChecksMenu
    Scenario Outline: check language as an admin and a teacher
        As an admin or teacher, I want to be able to change the language
        When '<role>' logs in with email '<username>' and password '<password>'
        And '<role>' accepts data protection
        Then login must be successful
		Then '<role>' goes to user settings
        And '<role>' changes language to '<language>'
        And '<role>' should see that all menu items are visible: '<menuItems>'
        Examples:
            | role |username         | password     | language | menuItems                                                                                                                       |
            | admin | admin@schul-cloud.org | Schulcloud1! | English | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LERN-STORE,ADD-ONS,HELP DESK,MANAGEMENT,HELP SECTION |
            | teacher | klara.fall@schul-cloud.org | Schulcloud1! | English | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LERN-STORE,ADD-ONS,MANAGEMENT,HELP SECTION |

    @studentChangesALanguageToEnglishAndChecksMenu
    Scenario Outline: check language as an student
        As an student, I want to be able to change the language
        When student logs in with email '<studentUsername>' and password '<password>'
        And student with full age accepts student's data protection with password '<newStudentPassword>'
        Then login must be successful
		Then student goes to user settings
        And student changes language to '<language>'
        And student should see that all menu items are visible: '<menuItems>'
        Examples:
            | studentUsername         | password     | newStudentPassword | language | menuItems                                                                                                                       |
            | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!! | English | DASHBOARD,COURSES,TEAMS,TASKS,MY FILES,NEWS,CALENDAR,LERN-STORE,ADD-ONS,HELP SECTION |
