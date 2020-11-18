@task @deleteTask
Feature: Set of tests to delete tasks

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@deleteSimpleTask
	Scenario Outline: As a user, I want to be able to log in and delete an existing task
		When <userRole> logs in
		And <userRole> goes to tasks page
		And <userRole> clicks on 'Delete' button for task with name '<taskName>'
		And <userRole> clicks on Delete task button
		Then <userRole> should see that task with name '<taskName>' is not visible on the list
		Examples:
			| userRole | taskName    |
			| teacher  | Biologie 7C |
