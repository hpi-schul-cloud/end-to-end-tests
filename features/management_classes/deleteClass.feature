@management @managementClass @deleteClass
Feature: I want to delete a class

	Background:
		Given user arrives on the Schul-Cloud homepage

	@deletedClassNotVisibleAnymore
	Scenario Outline: As a teacher I want to delete a class I don't need anymore
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> login is successful
		And <userRole> goes to management
		And <userRole> goes to class management
		Then <userRole> should see that class with name '<ClassName>' and teacher lastname '<teacherLastname>' is visible
		When <userRole> clicks delete class
		Then <userRole> should see that class with name '<ClassName>' and teacher lastname '<teacherLastname>' is not visible

		Examples:
			| userRole | username                  		 | password       | ClassName | teacherLastname |
			| teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | 8a    	  | Herzog          |
