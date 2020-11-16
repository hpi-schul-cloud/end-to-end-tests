#Creating a task with a course
@task
Feature: Create a task as a teacher

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createTask
	Scenario Outline: As a user, I want to be able to create a simple task
		When <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to tasks page
		And <userRole> clicks Add-task button
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		Then <userRole> should see task with name '<taskName>' is visible on the list
		Examples:
			| userRole | email                  | password     | taskName        | taskBody |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | end-to-end-task | MyBody   |
