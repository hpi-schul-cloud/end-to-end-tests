#without creating a course
@task
Feature: Create a task as a teacher

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createTask
	Scenario Outline: As a user, I want to be able to create a simple task
		When teacher logs in with email '<teacherEmail>' and password '<teacherPassword>'
		And teacher performs first login actions: data protection acceptance
		And teacher goes to tasks page
		And teacher clicks create-task-button on task page
		And teacher puts taskname '<taskName>' into name field
		And teacher puts taskBody '<taskBody>' into body field
		And teacher clicks submit-task-button on task-creation-form
		And teacher goes to tasks page
		Then teacher should see created task with name '<taskName>' is on task page

		Examples:
			| teacherEmail           | teacherPassword | taskName        | taskBody |
			| lehrer@schul-cloud.org | Schulcloud1!    | end-to-end-task | MyBody   |
