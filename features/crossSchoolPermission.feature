@administration
@crossSchoolPermission
Feature: I as an admin I should only have access to the students attached to my own school

	Background:
		Given user arrives on the Schul-Cloud homepage

	Scenario Outline: As a user, I want to be able to access to the students attached to my own school
		When <userRole> logs in with email '<adminsUsername>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		Then <userRole> should be able to get information about students of his schools on request
		And <userRole> should not be able to get information about students from other schools on request
		And <userRole> should be given a empty object
		Examples:
			| userRole | adminsUsername        | password     |
			| admin    | admin@schul-cloud.org | Schulcloud1! |
