@task @deleteTask @stableTest
Feature: Set of tests to delete tasks

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@deleteSimpleTask @e2eCore @tasks_and_other
	Scenario Outline: As a user, I want to be able to log in and delete an existing task
		When <userRole> logs in
		And <userRole> goes to tasks page
		And <userRole> hover over task '<taskName>'
		And <userRole> clicks on 'Delete' button for task with name '<taskName>'
		And <userRole> clicks on 'New Delete Pop Up' button
		Then <userRole> sees '<taskName>' not in the list
		Examples:
			| userRole | taskName |
			| teacher  | Task14   |

	@deleteTaskWithCourse @tasks_and_other
	Scenario Outline: As a user, I want to be able to create a simple task and try to delete it
		When <userRole> logs in
		And <userRole> goes to rooms-overview
		When <userRole> creates course with name '<courseName>'
		And <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> clicks on Enable-group-submission checkbox
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		When <userRole> goes to tasks page
		#And <userRole> filter by '<courseName>'
		Then <userRole> sees '<taskName>' in the list
		And <userRole> clicks at task '<taskName>'
		And <userRole> should clicks on 'Delete' button for task with name '[<courseName>] - <taskName>'
		And <userRole> clicks on 'Delete Pop Up' button
		When <userRole> goes to tasks page
		Then <userRole> sees '<taskName>' not in the list
		Examples:
			| userRole | courseName                 | taskName  | taskBody          |
			| teacher  | test course with test task | test task | text of test task |
