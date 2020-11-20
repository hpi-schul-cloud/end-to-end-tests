@dashboard @task
Feature: dashboard test set

	Background: user logs in
		Given user arrives on the Schul-Cloud homepage

	@showPrivateTaskOnDashboard
	Scenario Outline: As a user I want to be able to see private homework on dashboard
		When <userRole> logs in
		And <userRole> goes to courses page
		When <userRole> chooses course with name '<courseName>'
		And <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks on Private-task checkbox
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		Then <userRole> sees that task with name '<taskName>' is visible on the list
		When <userRole> clicks left navigation item 'dashboard'
		Then <userRole> should see that Private tasks section is visible on dashboard
		And <userRole> should see that task with name '<taskName>' and deadline for course '<courseName>' is visible on dashboard
		And <userRole> should see that number of completed tasks is not visible for task '<taskName>'
		And <userRole> should see that number of graded tasks is not visible for task '<taskName>'
		Examples:
			| userRole | courseName | taskName             | taskBody         |
			| teacher  | German     | private task example | text of the task |
