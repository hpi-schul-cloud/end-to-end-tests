@management @managementSchool @school
Feature: Set of tests to manage school

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@crossSchoolPermission
	Scenario Outline: As a user, I want to be able to access to the students attached to my own school
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		Then <userRole> should be able to get information about students of his schools on request
		And <userRole> should not be able to get information about students from other schools on request
		And <userRole> should be given a empty object
		Examples:
			| userRole | username              | password     |
			| admin    | admin@schul-cloud.org | Schulcloud1! |
