@managment @managmentClass @class @createClass
Feature: Set of tests to create classes

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createClassWithoutMembers
    Scenario Outline: As a user, I want to be able to create class without any members
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> performs first login actions: data protection acceptance
        And <userRole> goes to managment
        And <userRole> goes to Manage classes
        When <userRole> creates class with custom name '<customClassName>'
        Then <userRole> should see that class with name '<customClassName>' and '<membersNumber>' members is visible
        Examples:
            | userRole | username              | password     | customClassName | membersNumber |
            | admin    | admin@schul-cloud.org | Schulcloud1! | 11c             | 0             |
