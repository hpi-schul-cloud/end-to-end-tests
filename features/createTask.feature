@createTask
Feature: Creating a task as a teacher

	Background:
	Given teacher arrives on the Schul-Cloud homepage

	Scenario Outline: The user logs in as a teacher and creates a simple task
	Given logs in with email <teacherEmail> and password <teacherPassword>
	When the teacher has accepted the data protection agreement
	Then he should click the task-button in the dashboard-sidebar
	Then he should click the create-task-button on the task page
	Then he should put the taskname <taskname> into the name field
	Then he should put the taskBody <taskBody> into the body field
	Then he should click the submit-task-button on the task-creation-form
	Then teacher goes to tasks page
	Then he should see the created task with the name <taskname> on the task page

	Examples:
	| teacherEmail            | teacherPassword      | taskname                | taskBody |
	| lehrer@schul-cloud.org  | Schulcloud1!         | IntegrationTestAufgabe  | MyBody   |
