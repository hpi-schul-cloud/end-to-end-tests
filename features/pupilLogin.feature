@pupilLogin
Feature: Logging in as an pupil
	As an pupil on Schul-Cloud
	I want to be able to login with an pupil account

	Background:
		Given student arrives on the Schul-Cloud homepage

	Scenario Outline: User inputs the username and password
		And student logs in with email <username> and password <password>
		And the pupil should accept the data protection
		Then a pupil should see the dashboard

		Examples:
			| username                    | password     |
			| paula.meyer@schul-cloud.org | Schulcloud1! |
