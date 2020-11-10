@DeleteUser
Feature: Delete User

	Background:
		Given admin arrives on the Schul-Cloud homepage

	@deleteUserByManagment
	Scenario Outline: As an admin, I want to be able to delete the user
		When admin logs in
		And admin performs first login actions: data protection acceptance
		And admin login is successful
		And admin goes to administration
		And admin goes to students administration
		When admin clicks Edit-student with '<Email>' button
		And admin clicks Delete button
		Then admin should see that user with email '<Email>' is not visible on the list
		Examples:
			| Email						 		  |
			| waldemar.wunderlich@schul-cloud.org |
