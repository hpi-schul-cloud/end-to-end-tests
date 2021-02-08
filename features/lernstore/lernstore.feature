@lernstore
Feature: Set of tests for the lernstore
As a user I want to be able to use the Lernstore

Background: User opens Schul-cloud homepage Website
	Given user arrives on the Schul-Cloud homepage

    @searchLernstoreContent
    Scenario Outline: As a user, I want to be able to search for content
        Given <userRole> logs in with email '<username>' and password '<password>'
        When <userRole> goes to Lernstore
        And <userRole> searches for content '<contentName>'
        Then the returned result should be greater than '<expectedResults>'
    Examples:
			| userRole   |  username                     | password       | contentName | expectedResults |
			| admin      |  kai.admin.qa@schul-cloud.org | Schulcloud1qa! | Mathe       | 15000           |
