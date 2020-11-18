@task @createTask
Feature: Set of tests to create tasks

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createSimpleTask
	Scenario Outline: As a user, I want to be able to create a simple task without course
		Given <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to tasks page
		When <userRole> clicks Add-task button
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		Then <userRole> should see task with name '<taskName>' is visible on the list
		Examples:
			| userRole | email                  | password     | taskName        | taskBody |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | end-to-end-task | MyBody   |

	@createTaskInTheCourse
	Scenario Outline: As a user, I want to be able to create task for a course
		Given <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		And <userRole> creates course with name '<courseName>'
		When <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> clicks on Enable-group-submission checkbox
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		Then <userRole> should see that task with name '<taskName>' is visible on the list
		Examples:
			| userRole | courseName             | taskName     | taskBody         |
			| teacher  | new course with a task | task example | text of the task |

	@createPrivateTaskInTheCourse
	Scenario Outline: As a user, I want to be able to create a private task for a course
		Given <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		And <userRole> creates course with name '<courseName>' and student '<studentName>'
		When <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> clicks on Private-task checkbox
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		Then <userRole> should see that task with name '<taskName>' is visible on the list
		When <userRole> logs out
		And student logs in with email '<studentUsername>' and password '<studentPassword>'
		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
		And student goes to tasks page
		Then student should see that task with name '<taskName>' is not visible on the list
		Examples:
			| userRole | courseName            | studentName | taskName             | studentUsername             | studentPassword | newStudentPassword | taskBody  |
			| teacher  | test private hometask | Paula Meyer | private task example | paula.meyer@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      | task body |
