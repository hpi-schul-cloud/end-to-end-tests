@task @deleteTask
Feature: Set of tests to delete tasks

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@deleteSimpleTask
	Scenario Outline: As a user, I want to be able to delete an existing simple task with no course assigned
		Given <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to tasks page
		When <userRole> clicks on 'Delete' button for task with name '<taskName>'
		And <userRole> clicks on Delete task button
		Then <userRole> should see that task with name '<taskName>' is not visible on the list
		Examples:
			| userRole | username               | password     | taskName                                          |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Aufgabe an Marla (Mathe) - mit Abgabe & Bewertung |
