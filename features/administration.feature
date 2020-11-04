@administration
@createNewStudent
Feature: Administrate pupils, classes and teachers
	As an admin on Schul-Cloud
	I want to be able to administrate pupils, teachers and classes

	Background:
		Given admin arrives on the Schul-Cloud homepage

	Scenario Outline: Admin creates a pupil
		Given admin logs in with email '<adminsUsername>' and password '<adminPassword>'
		And admin performs first login actions: data protection acceptance
		And admin goes to administration
		And admin goes to students administration
		When admin set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>'
		And admin sees that student with email '<studentEmail>' is visible on the list
		And admin manually submits consent for user with e-mail '<studentEmail>', thus generates a random password for him
		And admin logs out
		And student logs in with email '<studentEmail>' and password genarated by admin during manual submission of consent
		Then student should see that data protection is already accepted and performs first login actions: password change '<newPasswordStudent>'
		Examples:
			| firstName | secondName | studentEmail              | adminsUsername        | adminPassword   | newPasswordStudent |
			| Georg     | Georgmann  | georgmann@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      |

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
