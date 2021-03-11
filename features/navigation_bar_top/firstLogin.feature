@topNavigationBar @firstLogin @login
Feature: Set of tests to first login

    Background:
        Given user arrives on the Schul-Cloud homepage

    @teacherAdminFirstLogin
    Scenario Outline: As a user, I want to be able to log in
        When <userRole> logs in with email '<username>' and password '<password>'
        Then <userRole> login is successful
        And <userRole> should see that school name is correct
        And <userRole> should see that user name and role is correct
        And <userRole> should see that all menu items are visible: '<menuItems>'
        Examples:
            | userRole | username                         | password       | menuItems                                                                                                             |
            | admin    | kai.admin.qa@schul-cloud.org     | Schulcloud1qa! | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, VERWALTUNG, HILFEBEREICH |
            | teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, VERWALTUNG, HILFEBEREICH |

    @studentFirstLogin
    Scenario Outline: As a student I want to be able to log in
        When student logs in with email '<studentUsername>' and password '<password>'
        And student performs first login actions: data protection acceptance
        Then student login is successful
        And student should see that school name is correct
        And student should see that user name and role is correct
        And student should see that all menu items are visible: '<menuItems>'
        Examples:
            | studentUsername                      | password       | menuItems                                                                                                 |
            | peter.wisse.noDPA.qa@schul-cloud.org | Schulcloud1qa! | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, HILFEBEREICH |
