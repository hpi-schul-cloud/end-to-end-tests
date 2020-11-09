@administration @class
Feature: As teacher of a class
	I want to edit a class
	So that I can change school year and class description.

	Background:
		Given user arrives on the Schul-Cloud homepage

	@editClass
	Scenario Outline:
		Given teacher logs in with email '<teachersUsername>' and password '<teachersPassword>'
		And teacher performs first login actions: data protection acceptance
		And teacher goes to administration
		And teacher goes to class administration
		When teacher creates class with custom name '<customClassName>'
		And teacher edits custom class name to '<newCustomClassName>'
		And teacher opens classes tab with name '2020/21'
		Then teacher should see that class with name '<newCustomClassName>' and teacher named 'Fall' is visible

		Examples:
			| teachersUsername           | teachersPassword | customClassName |newCustomClassName |
			| klara.fall@schul-cloud.org | Schulcloud1!     | 8a              |4d                 |
