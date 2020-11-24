@management @managementClass @editClass
Feature: I want to edit a class

	Background:
		Given user arrives on the Schul-Cloud homepage

	@editClassNameAndSchoolYear
	Scenario Outline: As a user, I want to be able to edit a class
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to management
		And <userRole> goes to class management
		When <userRole> creates class with custom name '<customClassName>'
		And <userRole> edits custom class name to '<newCustomClassName>' and class school year to '<schoolYear>'
		And <userRole> opens classes tab with name '<schoolYear>'
		Then <userRole> should see that class with name '<newCustomClassName>' and teacher lastname '<teacherLastname>' is visible
		Examples:
			| userRole | username                   | password     | customClassName | newCustomClassName | schoolYear | teacherLastname |
			| teacher  | klara.fall@schul-cloud.org | Schulcloud1! | 8a              | 4d                 | 2021/22    | Fall        |