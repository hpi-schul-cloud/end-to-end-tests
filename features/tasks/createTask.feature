@task @createTask @stableTest @tasks_and_other
Feature: Set of tests to create tasks

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createSimpleTask @e2eCore
	Scenario Outline: As a user, I want to be able to create a simple task without course
		Given <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> goes to tasks page
		When <userRole> clicks Add-task button
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		And <userRole> clicks on drafts tab
		Then <userRole> should see task with name '<taskName>' is visible on the list
		Examples:
			| userRole | email                  			 | password       | taskName        | taskBody |
			| teacher  | lara.teacher.qa@schul-cloud.org	 | Schulcloud1qa! | end-to-end-task | MyBody   |

	@createTaskInTheCourse
	Scenario Outline: As a user, I want to be able to create a simple task
		When <userRole> logs in
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> clicks on Enable-group-submission checkbox
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		And <userRole> filter by '<courseName>'
		Then <userRole> should see that task with name '<taskName>' is visible on the list
		Examples:
			| userRole | courseName  | taskName     | taskBody         |
			| teacher  | Mathe       | task example | text of the task |

	@createPrivateTaskInTheCourse @e2eCore
	Scenario Outline: As a user, I want to be able to create a private task
		When <userRole> logs in
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> clicks on Private-task checkbox
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		And <userRole> filter by '<courseName>'
		Then <userRole> should see that task with name '<taskName>' is visible on the list
		When <userRole> logs out
		And student logs in with email '<studentUsername>' and password '<studentPassword>'
		And student goes to tasks page
		Then student should see that task with name '<taskName>' is not visible on the list
		Examples:
			| userRole | courseName   | taskName             | studentUsername             		| studentPassword | taskBody  |
			| teacher  | German       | private task example | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa!  | task body |
