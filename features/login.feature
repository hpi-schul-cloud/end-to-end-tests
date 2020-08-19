@login
Feature: Log in as an admin, as a teacher, as a student

    Background:
        When user arrives on the Schul-Cloud homepage

    @adminLogin
    Scenario Outline: admin logs in
        As an admin, I want to be able to login
        When admin logs in with email <adminUsername> and password <password>
        Then admin accepts data protection
        Then the admin-dashboard should have the admin initials
        Then the admin-dashboard should have the correct school
        Then the admin-dashboard should have the admin name and profession
        Then the admin-dashboard should have the following tabs
            | tabs           |
            | ÜBERSICHT      |
            | KURSE          |
            | TEAMS          |
            | AUFGABEN       |
            | MEINE DATEIEN  |
            | NEUIGKEITEN    |
            | TERMINE        |
            | LERN-STORE     |
            | HELPDESK       |
            | ADMINISTRATION |

        Examples:
            | adminUsername         | password     |
            | admin@schul-cloud.org | Schulcloud1! |

    @teacherLogin
    Scenario Outline: teacher logs in
        As a teacher, I want to be able to login
        When teacher logs in with email <teacherUsername> and password <password>
        Then teacher accepts data protection
        Then the teacher-dashboard should have an icon with the teacher's initials

        Examples:
            | teacherUsername            | password     |
            | klara.fall@schul-cloud.org | Schulcloud1! |


    @studentLogin
    Scenario Outline: student logs in
        As a student, I want to be able to login
        When student logs in with email <studentUsername> and password <password>
        And student with full age accepts student's data protection
        Then a pupil should see the dashboard

        Examples:
            | studentUsername             | password     |
            | paula.meyer@schul-cloud.org | Schulcloud1! |


    @wrongPasswordAdminLogin
    Scenario Outline: student logs in with the correct username and a wrong password
        admin should not be able to login with a wrong password
        When admin logs in with email <adminUsername> and password <wrongPassword>
        Then the login must fail
        # doesn't work
        # Then the login-page should look like it looked before for <adminUsername>

        Examples:
            | adminUsername         | wrongPassword            |
            | admin@schul-cloud.org | wrongPasswordPlaceholder |
