@adminCrossSchoolPermission
Feature:
    I as an admin I should only have access to the students attached to my own school

    Background:
	    Given an admin is logged in
	    Given an admin are able to request information about students from own school

    Scenario Outline:
	    When admin tries to request information about students from other school
	    Then admin should be given a status 403 forbidden
    Examples:
			|username|password|
			|admin@schul-cloud.org|Schulcloud1!|