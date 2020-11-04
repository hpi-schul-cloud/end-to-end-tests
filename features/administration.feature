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
		And admin accepts data protection
		And admin goes to administration
		When admin goes to students administration
		And admin clicks edit-student-button 
		And new page with page title Schüler bearbeiten opens
		And admin clicks Abbrechen button to open popup
		Then admin clicks Abbrechen inside popup 
		And admin clicks Abbrechen button to open popup
		And admin clicks Änderung verwerfen inside popup 
		Then admin returns to administration page
		And admin clicks edit-student-button 
		When admin changes firstname to '<firstName>'
		And admin changes lastname to '<lastName>' 
		And admin changes email to '<email>'
		And admin changes birthdate to '<birthdate>'
		And admin clicks Save-changes
		Then admin returns to administration page 
		When admin validates that changes have been saved
		And admin clicks edit-student-button
		Then birthdate is '<birthdate>' 

		Examples:
			| firstName | lastName | email              		 | adminsUsername        | adminsPassword | birthdate  |
			| Nils      | Nilsen   | nils.nilsen@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!   | 24.12.2004 | 
