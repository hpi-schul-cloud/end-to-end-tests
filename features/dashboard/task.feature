@dashboard @task @stableTest
Feature: dashboard test set

	Background: user logs in
		Given user arrives on the Schul-Cloud homepage

	@showPrivateTaskOnDashboard
	Scenario Outline: As a user I want to be able to see private homework on dashboard
		Given <userRole> logs in
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		When <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks on Private-task checkbox
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		When <userRole> sees that task with name '<taskName>' is visible on the list
		And <userRole> clicks left navigation item 'dashboard'
		Then <userRole> should see that 'private' tasks section is visible on dashboard
		And <userRole> should see that 'private' task with name '<taskName>' assigned to course '<courseName>' is visible on dashboard
		And <userRole> should see that 'private' task with name '<taskName>' with submission date is visible on dashboard
		And <userRole> should see that number of submitted tasks is not visible for task '<taskName>' in 'private' section
		And <userRole> should see that number of graded tasks is not visible for task '<taskName>' in 'private' section
		Examples:
			| userRole | courseName | taskName             | taskBody         |
			| teacher  | German     | private task example | text of the task |

	@showRegularTaskOnDashboard
	Scenario Outline: As a user I want to be able to see regular task on dashboard
		Given <userRole> logs in
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		When <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		When <userRole> sees that task with name '<taskName>' is visible on the list
		And <userRole> clicks left navigation item 'dashboard'
		Then <userRole> should see that 'published' tasks section is visible on dashboard
		And <userRole> should see that 'published' task with name '<taskName>' assigned to course '<courseName>' is visible on dashboard
		And <userRole> should see that 'published' task with name '<taskName>' with submission date is visible on dashboard
		And <userRole> should see that number of submitted tasks is visible for task '<taskName>' in 'published' section
		And <userRole> should see that 'published' task with name '<taskName>' has '0' submitted and '1' to be submitted tasks
		And <userRole> should see that number of graded tasks is visible for task '<taskName>' in 'published' section
		And <userRole> should see that 'published' task with name '<taskName>' has '0' graded and '0' to be graded tasks
		Examples:
			| userRole | courseName | studentName | taskName             | taskBody         |
			| teacher  | German     | Paula Meyer | regular task example | text of the task |
