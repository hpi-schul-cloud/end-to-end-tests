@pupilLogin
Feature: Logging in as an pupil
	As an pupil on Schul-Cloud
	I want to be able to login with an pupil account

	Background:
		Given a pupil arrives on the Schul-Cloud login homepage

	Scenario Outline: User inputs the username and password
		And go from start page to login page
		And log in with <username> and <password>
		And the pupil should accept the data protection
		Then a pupil should see the dashboard

		Examples:
			| username                    | password     |
			| paula.meyer@schul-cloud.org | Schulcloud1! |
