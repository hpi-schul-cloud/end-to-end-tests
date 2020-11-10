@DeleteUser
Feature: Delete User

	Background:
		Given user arrives on the Schul-Cloud homepage

	@deleteUserByManagment
	Scenario Outline: As an admin, I want to be able to delete the user
		Given admin logs in with email '<adminUsername>' and password '<adminPassword>'
		And admin performs first login actions: data protection acceptance
		And admin login is successful
		And admin goes to administration
		And admin goes to students administration
		When admin clicks Edit-student with '<Email>' button
		And admin clicks Delete button
		Then admin should see that user with email '<Email>' is not visible on the list
		Examples:
			| adminUsername         | adminPassword | Email						 		  |
			| admin@schul-cloud.org | Schulcloud1!  | waldemar.wunderlich@schul-cloud.org |
