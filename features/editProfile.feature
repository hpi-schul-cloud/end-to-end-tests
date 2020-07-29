@editProfile
Feature: users can edit their profiles

	Background:
		Given user arrives on the Schul-Cloud homepage

	@teacherChangesPassword
	Scenario Outline: teacher changes the passwort
		When go from start page to login page
		And log in with <username> and <password>
		And the teacher should accept the data protection
		And go to user settings
		And change passwort from <password> to <newPassword>
		And log out
		And go from start page to login page
		And log in with <username> and <password>
		Then the login must fail
		And wait for next login
		When log in with <username> and <newPassword>
		Then the login must be successful

		Examples:
			| username                   | password     | newPassword   |
			| klara.fall@schul-cloud.org | Schulcloud1! | Schulcloud1!! |
