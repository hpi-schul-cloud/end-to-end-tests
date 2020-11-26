@management @managementClass @deleteClass
Feature: I want to delete a class

	Background:
		Given user arrives on the Schul-Cloud homepage

	@deletedClassNotVisibleAnymore
	Scenario Outline: As a teacher I want to delete a class I don't need anymore
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to management
		And <userRole> goes to class management
		When <userRole> creates class with custom name '<customClassName>'
		And <userRole> edits custom class name to '<newCustomClassName>' and class school year to '<schoolYear>'
		And <userRole> opens classes tab with name '<schoolYear>'
		Then <userRole> should see that class with name '<newCustomClassName>' and teacher lastname '<teacherLastname>' is visible
		Then <userRole> clicks delete class with name '<newCustomClassName>'
		Then <userRole> should see that class with name '<newCustomClassName>' and teacher lastname '<teacherLastname>' is not visible

		Examples:
			| userRole | username                   | password     | customClassName | newCustomClassName | schoolYear | teacherLastname |
			| teacher  | klara.fall@schul-cloud.org | Schulcloud1! | 8a              | 4d                 | 2021/22    | Fall        	 |
