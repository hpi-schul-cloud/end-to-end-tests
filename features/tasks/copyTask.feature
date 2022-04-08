@task @copyTask
Feature: Set of tests to copy tasks

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@copySimpleTask @e2eCore @unstableTest
	Scenario Outline: As a user, I want to be able to log in and copy an existing task
		When <userRole> logs in
		And <userRole> goes to tasks page
		And <userRole> hover over task '<taskName>'
		And <userRole> clicks on 'Copy' button for task with name '<taskName>'
        And <userRole> sets task name '<newTaskName>' in task form
        And <userRole> clicks on Private-task checkbox
        And <userRole> clicks Add-task-submit button
		Then <userRole> sees '<newTaskName>' in the list
		Examples:
			| userRole | taskName | newTaskName |
			| teacher  | Task14   | Task14 - Kopie |
