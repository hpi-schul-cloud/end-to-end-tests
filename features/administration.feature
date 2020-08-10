#This feature caused errors for other tests and have been temporary ignored
#Error: ERROR webdriver: Request failed due to invalid session id
@createNewPupil
Feature: Administrate pupils, classes and teachers
	As an admin on Schul-Cloud
	I want to be able to administrate pupils, teachers and classes

	Background:
		Given admin arrives on the Schul-Cloud homepage

	Scenario Outline: Admin creates a pupil
		When admin logs in with email <adminsUsername> and password <password>
		Then the admin is supposed to accept the data protection agreement
		Then admin goes to student administration
		And an admin puts in <firstName> and <secondName> and <email> of the new pupil
		And the admin should see new pupil with email <email> among his pupils
		And admin manually submits a consent <email>
		And admin logs out
		Then new pupil can log in
		Then new pupil accepts data protection policy and sets new password for the profile

		Examples:
		| firstName | secondName | email                     | adminsUsername        | password     |
	    | Georg     | Georgmann  | georgmann@schul-cloud.org | admin@schul-cloud.org | Schulcloud1! |
