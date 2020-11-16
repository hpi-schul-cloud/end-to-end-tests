#Creating a task with a course
@task
Feature: Create a task

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createTask
	Scenario Outline: As a user, I want to be able to create a simple task
		Given teacher logs in with email '<teacherEmail>' and password '<teacherPassword>'
		And teacher performs first login actions: data protection acceptance
		And teacher goes to tasks page
		And teacher clicks Add-task button
		And teacher sets task name '<taskName>' in task form
		And teacher sets task body '<taskBody>' in task form
		And teacher clicks Add-task-submit button
		And teacher goes to tasks page
		Then teacher should see task with name '<taskName>' is visible on the list

		Examples:
			| teacherEmail           | teacherPassword | taskName        | taskBody |
			| lehrer@schul-cloud.org | Schulcloud1!    | end-to-end-task | MyBody   |
