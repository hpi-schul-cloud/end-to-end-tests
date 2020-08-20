#This feature caused errors for other tests and have been temporary ignored
#Error: ERROR webdriver: Request failed due to invalid session id
@createNewStudent
Feature: Administrate pupils, classes and teachers
	As an admin on Schul-Cloud
	I want to be able to administrate pupils, teachers and classes

	Background:

		Given admin arrives on the Schul-Cloud homepage

	Scenario Outline: Admin creates a pupil
		When admin logs in with email <adminsUsername> and password <password>
		When admin accepts data protection
		When admin goes to administration
		When admin goes to students administration
		And an admin puts in <firstName> and <secondName> and <studentEmail> of the new pupil
		And the admin should see new pupil with email <email> among his pupils
		And admin manually submits a consent <studentEmail>
		And admin logs out
		Then new pupil <studentEmail> can log in with default password
		Then student with full age accepts student's data protection with password <newPasswordStudent>

		Examples:
			| firstName | secondName | studentEmail              | adminsUsername        | adminsPassword | newPasswordStudent |
	    	| Georg     | Georgmann  | georgmann@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!   | Schulcloud1!!      |

