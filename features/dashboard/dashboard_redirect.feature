@dashboard @redirect @stableTest @tasks_and_other
Feature: dashboard test set

	Background: user is not logged in
		Given user arrives on the Schul-Cloud homepage

	@dashboardRedirect
	Scenario Outline: As a user I want to be redirected to login if I'm not logged in
		When <userRole> goes to '<URL>'
		Then <userRole> is redirected to login page
		Examples:
			| userRole | URL		|
			| teacher  | /dashboard |
