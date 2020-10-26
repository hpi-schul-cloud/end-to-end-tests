@editProfile
Feature: users can edit their profiles

	Background:
		Given teacher arrives on the Schul-Cloud homepage

	@teacherChangesPassword
	Scenario Outline: teacher changes the password
		Given teacher logs in with email '<username>' and password '<password>'
		Given teacher accepts data protection
		And teacher goes to user settings
		And teacher changes password from '<password>' to '<newPassword>'
		And teacher logs out
		And teacher logs in with email '<username>' and password '<password>'
		Then login must fail
		When teacher waits for next login
		And teacher is on LoginPage and logs in using email '<username>' and password '<newPassword>'
		Then login must be successful

		Examples:
			| username                   | password     | newPassword        |
			| klara.fall@schul-cloud.org | Schulcloud1! | NewPwSchulcloud1!! |
