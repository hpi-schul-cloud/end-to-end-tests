@management @managementClass @createClass
Feature: Set of tests to create classes

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createClassWithoutMembers
    Scenario Outline: As a user, I want to be able to create class without any members
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> goes to management
        And <userRole> goes to class management
        When <userRole> creates class with custom name '<customClassName>'
        Then <userRole> should see that class with name '<customClassName>' and '0' members is visible
        Examples:
            | userRole | username                         | password       | customClassName |
            | admin    | olivier.admin.qa@schul-cloud.org | Schulcloud1qa! | 11c             |
