@task @editTask @e2eCore
Feature: create different types of task

	Background:
		Given user arrives on the Schul-Cloud homepage
  
	@editTask @unstableTests #@tasks_and_other
	Scenario Outline: As a user, I want to be able to log in and edit an existing task
		When <userRole> logs in
		And <userRole> goes to tasks page
		And <userRole> hover over task '<taskName>'
		And <userRole> edit the task '<taskName>'
		And <userRole> sets task name '<newTaskName>' in task form
		And <userRole> sets task body '<newTaskBody>' in task form
		And <userRole> chooses task courses 'No assignment'
		And <userRole> clicks on Enable-group-submission checkbox
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> clicks on Private-task checkbox
		And <userRole> clicks on Student-submissions-visible-to-each-other checkbox
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		And <userRole> clicks on drafts tab
		Then <userRole> sees '<newTaskName>' in the list
		Examples:
			| userRole | taskName | newTaskName     | newTaskBody |
			| teacher  | Task20   | Aufgabe Algebra | Calculate   |
