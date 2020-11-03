#This feature caused errors for other tests and have been temporary ignored
#Error: ERROR webdriver: Request failed due to invalid session id
@createNewStudent
Feature: Administrate pupils, classes and teachers
	As an admin on Schul-Cloud
	I want to be able to administrate pupils, teachers and classes

	Background:

		Given admin arrives on the Schul-Cloud homepage

	Scenario Outline: Admin creates a pupil

		When admin logs in with email '<adminsUsername>' and password '<adminsPassword>'
		When admin performs first login actions: data protection acceptance
		When admin goes to administration
		When admin goes to students administration
		And admin set student firstname '<firstName>', lastname '<lastName>', email '<studentEmail>'
		And the admin should see new pupil with email '<studentEmail>' among his pupils
		And admin manually submits a consent '<studentEmail>'
		And admin logs out
		#Then new pupil '<studentEmail>' can log in with default password
		#And student should see that data protection is already accepted and set a new password '<newPasswordStudent>'

		Examples:
			| firstName | lastName | studentEmail              | adminsUsername        | adminsPassword | newPasswordStudent |
	    	| Georg     | Georgmann  | georgmann@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!   | Schulcloud1!!      |
