#without creating a course
@task
@createTask
Feature: Creating a task as a teacher

	Background:
	Given teacher arrives on the Schul-Cloud homepage

	Scenario Outline: The user logs in as a teacher and creates a simple task
	Given teacher logs in with email '<teacherEmail>' and password '<teacherPassword>'
	And teacher accepts data protection
	And teacher goes to tasks page
	And teacher clicks create-task-button on task page
	And teacher puts taskname '<taskName>' into name field
	And teacher puts taskBody '<taskBody>' into body field
	And teacher clicks submit-task-button on task-creation-form
	And teacher goes to tasks page
	Then teacher should see created task with name '<taskName>' is on task page

	Examples:
	| teacherEmail            | teacherPassword      | taskName                | taskBody |
	| lehrer@schul-cloud.org  | Schulcloud1!         | IntegrationTestAufgabe  | MyBody   |
