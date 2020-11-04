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
		And admin set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>'
		And the admin should see new pupil with email '<studentEmail>' among his pupils
		And admin manually submits a consent '<studentEmail>'
		And admin logs out
		Then new pupil '<studentEmail>' can log in with default password
		Then student should see that data protection is already accepted and set a new password '<newPasswordStudent>'
		Examples:
			| firstName | secondName | studentEmail              | adminsUsername        | adminsPassword | newPasswordStudent |
	    	| Georg     | Georgmann  | georgmann@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!   | Schulcloud1!!      |

	@editStudent
	Scenario Outline: Admin edits a student

		When admin logs in with email '<adminsUsername>' and password '<adminsPassword>'
		When admin performs first login actions: data protection acceptance
		And admin goes to administration
		When admin goes to students administration
		And admin clicks edit-student button 
		And admin clicks cancel button
		Then admin clicks cancel inside popup 
		And admin clicks cancel button
		And admin clicks discard change inside popup
		And admin clicks edit-student button 
		When admin changes student firstname to '<firstName>'
		And admin changes student lastname to '<lastName>' 
		And admin changes student email to '<email>'
		And admin changes student birthdate to '<birthdate>'
		And admin clicks Save-changes
		When admin validates that firstname is edited firstname
		And admin validates that lastname is edited lastname
		And admin validates that email is edited email
		And admin clicks edit-student button
		Then birthdate is '<birthdate>' 

		Examples:
			| firstName | lastName | email              		 | adminsUsername        | adminsPassword | birthdate  |
			| Nils      | Nilsen   | nils.nilsen@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!   | 24.12.2004 | 
