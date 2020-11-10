@DeleteUser
Feature: Delete User

	Background:
		Given user arrives on the Schul-Cloud homepage

	@deleteUserByManagment
	Scenario Outline: As an admin, I want to be able to delete the user
		When admin logs in
		And admin performs first login actions: data protection acceptance
		And admin login is successful
		And admin goes to administration
		And admin goes to students administration
		And admin clicks Edit-student button
		And admin clicks Delete-user button
		And admin clicks Delete button
		Examples:
