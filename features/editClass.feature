@administration @class
Feature: I want to edit a class

	Background:
		Given user arrives on the Schul-Cloud homepage

	@editClass
	Scenario Outline: As a user, I want to be able to edit a class
		When <userRole> logs in with email '<teachersUsername>' and password '<teachersPassword>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to administration
		And <userRole> goes to class administration
		When <userRole> creates class with custom name '<customClassName>'
		And <userRole> edits custom class name to '<newCustomClassName>'
		And <userRole> opens classes tab with name '<className>'
		Then <userRole> should see that class with name '<newCustomClassName>' and teacher named 'Fall' is visible
		Examples:
			| userRole | teachersUsername           | teachersPassword | customClassName | newCustomClassName | className |
			| teacher  | klara.fall@schul-cloud.org | Schulcloud1!     | 8a              | 4d                 | 2020/21   |
