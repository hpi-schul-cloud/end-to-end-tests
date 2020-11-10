#without creating a course
@task
Feature: Create a task as a teacher

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createTask
	Scenario Outline: As a user, I want to be able to create a simple task
		When <userRole> logs in with email '<teacherEmail>' and password '<teacherPassword>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to tasks page
		And <userRole> clicks create-task-button on task page
		And <userRole> puts taskname '<taskName>' into name field
		And <userRole> puts taskBody '<taskBody>' into body field
		And <userRole> clicks submit-task-button on task-creation-form
		And <userRole> goes to tasks page
		Then <userRole> should see created task with name '<taskName>' is on task page
		Examples:
			| userRole | teacherEmail           | teacherPassword | taskName        | taskBody |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1!    | end-to-end-task | MyBody   |
