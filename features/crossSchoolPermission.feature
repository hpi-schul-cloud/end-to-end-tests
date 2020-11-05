@administration 
@crossSchoolPermission
Feature: I as an admin I should only have access to the students attached to my own school

	Background:
		Given admin arrives on the Schul-Cloud homepage

	Scenario Outline:
		Given admin logs in with email '<adminsUsername>' and password '<password>'
		And admin performs first login actions: data protection acceptance
		Then admin should be able to get information about students of his schools on request
		When admin should not be able to get information about students from other schools on request
		Then admin should be given a empty object
		Examples:
			| adminsUsername        | password     |
			| admin@schul-cloud.org | Schulcloud1! |
