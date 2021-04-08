@topNavigationBar @wrongLogin @e2eCore
Feature: Set of tests to login with wrong password

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

	@wrongPasswordLogin
	Scenario Outline: As a user, I should not be able to log in with correct username but wrong password
		When <userRole> logs in with email '<username>' and password '<wrongPassword>'
		Then <userRole> login must fail
		Examples:
			| userRole | username                     | wrongPassword            |
			| admin    | kai.admin.qa@schul-cloud.org | wrongPasswordPlaceholder |
