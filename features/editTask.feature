@editTask
Feature: Editing a task as a teacher and save or discard

	Background:
		Given user arrives on the Schul-Cloud homepage

	Scenario Outline: As a user, I want to be able to log in and edit an existing task
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to tasks page
		And <userRole> should click 'Edit' button for task with name '<taskName>'
		Then <userRole> should change the taskname to '<newTaskName>' in the name field
		And <userRole> should change the taskbody to '<taskBody>' in the taskbody field
		And <userRole> should change the course to Keine Zuordnung in the dropdown
		And <userRole> should toggle the allow groupwork checkbox
		And <userRole> should change the begin and due date
		And <userRole> should toggle the private task checkbox
		And <userRole> should toggle the public submissions checkbox
		Then <userRole> should save the changes by clicking on the save-button
		Then <userRole> goes to the tasks page
		Then <userRole> checks if the new taskname is '<newTaskName>'
		And <userRole> checks if the new taskbody is '<taskBody>'
		Examples:
			| userRole | username               | password     | taskName                                          | newTaskName                | taskBody  |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Aufgabe an Marla (Mathe) - mit Abgabe & Bewertung | Aufgabe an Marla (Algebra) | Calculate |
