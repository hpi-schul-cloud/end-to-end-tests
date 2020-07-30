@adminLogin
Feature: Logging in as an admin
	As an admin on Schul-Cloud
	I want to be able to login with an admin account

	Background:
		Given admin arrives on the Schul-Cloud homepage

	Scenario Outline: User inputs the username and password
		When an admin puts in <username> and <password> and click the login-button
		Then the user is supposed to accept the data protection agreement
		Then the admin-dashboard should have the admin initials
		Then the admin-dashboard should have the correct school
		Then the admin-dashboard should have the admin name and profession
		Then the admin-dashboard should have the following tabs
		| tabs				|
		| ÜBERSICHT			|
		| KURSE				|
		| TEAMS				|
		| AUFGABEN			|
		| MEINE DATEIEN		|
		| NEUIGKEITEN		|
		| TERMINE			|
		| LERN-STORE		|
		| HELPDESK			|
		| ADMINISTRATION	|

		Examples:
			|username|password|
			|admin@schul-cloud.org|Schulcloud1!|
