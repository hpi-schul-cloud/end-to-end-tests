@editProfile
Feature: users can edit their profiles

	Background:
		Given teacher arrives on the Schul-Cloud homepage

	@teacherChangesPassword
	Scenario Outline: teacher changes the passwort
		When teacher logs in with email <username> and password <password>
		And the teacher should accept the data protection
		And teacher goes to user settings
		And teacher changes passwort from <password> to <newPassword>
		And teacher logs out
		And teacher logs in with email <username> and password <password>
		Then the login must fail
		When teacher waits for next login
		And teacher is on LoginPage and logs in with <username> and <newPassword>
		Then the login must be successful

		Examples:
			| username                   | password     | newPassword   |
			| klara.fall@schul-cloud.org | Schulcloud1! | Schulcloud1!! |
