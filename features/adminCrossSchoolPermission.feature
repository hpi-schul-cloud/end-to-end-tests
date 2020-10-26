@adminCrossSchoolPermission
Feature: I as an admin I should only have access to the students attached to my own school

	Background:
		Given admin arrives on the Schul-Cloud homepage

	Scenario Outline:
		Given admin logs in with email '<adminsUsername>' and password '<password>'
		Given admin accepts data protection
		Then an admin are able to request information about students from own school
		When admin tries to request information about students from other school
		Then admin should be given a empty object
		Examples:
			| adminsUsername        | password     |
			| admin@schul-cloud.org | Schulcloud1! |
