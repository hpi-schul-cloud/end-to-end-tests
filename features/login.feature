@login
Feature: Log in as an admin, as a teacher, as a student

    Background:
        Given user arrives on the Schul-Cloud homepage

    @adminLogin
    Scenario Outline: admin logs in
        As an admin, I want to be able to login
        When admin logs in with email <adminUsername> and password <password>
        And admin accepts data protection
        Then login must be successful
        And dashboard should have the correct school
        And dashboard should have the correct name and profession
        And admin should see that all menu items are visible: <menuItems>

        Examples:
            | adminUsername         | password     | menuItems                                                                                                                       |
            | admin@schul-cloud.org | Schulcloud1! | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, HELPDESK, VERWALTUNG, HILFEBEREICH |

    @teacherLogin
    Scenario Outline: teacher logs in
        As a teacher, I want to be able to login
        When teacher logs in with email <teacherUsername> and password <password>
        And teacher accepts data protection
        Then login must be successful
        And dashboard should have the correct school
        And dashboard should have the correct name and profession
        And teacher should see that all menu items are visible: <menuItems>

        Examples:
            | teacherUsername            | password     | menuItems                                                                                                             |
            | klara.fall@schul-cloud.org | Schulcloud1! | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, VERWALTUNG, HILFEBEREICH |


    @studentLogin
    Scenario Outline: student logs in
        As a student, I want to be able to login
        When student logs in with email <studentUsername> and password <password>
        And student with full age accepts student's data protection with password <newStudentPassword>
        Then login must be successful
        And dashboard should have the correct school
        And dashboard should have the correct name and profession
        And student should see that all menu items are visible: <menuItems>

        Examples:
            | studentUsername             | password     | newStudentPassword | menuItems                                                                                                 |
            | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, HILFEBEREICH |


    @wrongPasswordAdminLogin
    Scenario Outline: student logs in with the correct username and a wrong password
        admin should not be able to login with a wrong password
        When admin logs in with email <adminUsername> and password <wrongPassword>
        Then login must fail
        # doesn't work
        # Then the login-page should look like it looked before for <adminUsername>

        Examples:
            | adminUsername         | wrongPassword            |
            | admin@schul-cloud.org | wrongPasswordPlaceholder |
