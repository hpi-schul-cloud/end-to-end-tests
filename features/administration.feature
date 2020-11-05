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

