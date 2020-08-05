@login
Feature: Log in as an admin, as a teacher, as a student

    Background:
        When user arrives on the Schul-Cloud homepage

    @adminLogin
    Scenario Outline: admin logs in
        As an admin, I want to be able to login
        When admin logs in with email <username> and password <password>
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
            | username              | password     |
            | admin@schul-cloud.org | Schulcloud1! |

    @teacherLogin
    Scenario Outline: teacher logs in
        As a teacher, I want to be able to login
        When teacher logs in logs in with email <username> and password <password>
        Then teacher accepts data protection
        Then the teacher-dashboard should have an icon with the teacher's initials

        Examples:
            | username                   | password     |
            | klara.fall@schul-cloud.org | Schulcloud1! |


    @studentLogin
    Scenario Outline: student logs in
        As a student, I want to be able to login
        When student logs in with email <username> and password <password>
        And student with full age accepts student's data protection
        Then a pupil should see the dashboard

        Examples:
            | username                    | password     |
            | paula.meyer@schul-cloud.org | Schulcloud1! |
            