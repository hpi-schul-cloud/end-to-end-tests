@createNewPupil
Feature: Administrate pupils, classes and teachers
	As an admin on Schul-Cloud
	I want to be able to administrate pupils, teachers and classes
	Background:
		Given admin arrives on the Schul-Cloud login homepage
		Given this admin logs in successfully

	Scenario Outline: Admin creates a pupil
		When admin goes to administration
		When an admin puts in <firstName> and <secondName> and <email> of the new pupil
		Then the admin should see new pupil with email <email> among his pupils
		Then the teacher can manually submit a consent <email>
		And log out
		And go from start page to login page
		And log in with <username> and <password>
		And the pupil should accept the data protection
		#Then new pupil can log in
		#Then new pupil accepts data protection policy and sets new password for the profile

		Examples:
			| firstName | secondName | email                     | username                    | password     |
			| Georg     | Georgmann  | georgmann@schul-cloud.org | paula.meyer@schul-cloud.org | Schulcloud1! |
