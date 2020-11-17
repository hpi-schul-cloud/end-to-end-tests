@editProfile
Feature: users can edit their profiles

	Background:
		Given user arrives on the Schul-Cloud homepage

	@changePassword
	Scenario Outline: As a user, I want to be able to change the password
		When <userRole> logs in with email '<username>' and password '<password>'
		And '<userRole>' performs first login actions
		And <userRole> goes to user settings
		When <userRole> changes password from '<password>' to '<newPassword>'
		And <userRole> logs out
		And <userRole> logs in with email '<username>' and password '<password>'
		Then <userRole> login must fail
		When <userRole> waits for next login
		And <userRole> is on LoginPage and logs in using email '<username>' and password '<newPassword>'
		Then <userRole> login is successful
		Examples:
			| userRole | username                    | password     | newPassword        |
			| teacher  | klara.fall@schul-cloud.org  | Schulcloud1! | NewPwSchulcloud1!! |
			| student  | paula.meyer@schul-cloud.org | Schulcloud1! | NewPwSchulcloud1!! |
