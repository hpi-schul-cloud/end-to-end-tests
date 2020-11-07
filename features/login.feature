@login
Feature: Log in as an admin, as a teacher, as a student

	Background:
		Given user arrives on the Schul-Cloud homepage

	@teacherAdminFirstLogin
	Scenario Outline: first login as a admin, teacher
	As an admin or teacher, I want to be able to login
		When <userRole> logs in with email '<userName>' and password '<password>'
		And <userRole> performs first login actions
		Then <userRole> login is successful
		And <userRole> should see that school name is correct
		And <userRole> should see that user name and role is correct
		And <userRole> should see that all menu items are visible: '<menuItems>'
		Examples:
			| userRole | userName                    | password     | menuItems                                                                                                                       |
			| admin    | admin@schul-cloud.org       | Schulcloud1! | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, HELPDESK, VERWALTUNG, HILFEBEREICH |
			| teacher  | klara.fall@schul-cloud.org  | Schulcloud1! | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, VERWALTUNG, HILFEBEREICH           |
			| student  | paula.meyer@schul-cloud.org | Schulcloud1! | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, HILFEBEREICH                       |


#	@studentFirstLogin
#	Scenario Outline: first login as a student
#		When student logs in with email '<studentUsername>' and password '<password>'
#		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
#		Then student login is successful
#		And student should see that school name is correct
#		And student should see that user name and role is correct
#		And student should see that all menu items are visible: '<menuItems>'
#		Examples:
#			| studentUsername             | password     | newStudentPassword | menuItems                                                                                                 |
#			| paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      | ÜBERSICHT, KURSE, TEAMS, AUFGABEN, MEINE DATEIEN, NEUIGKEITEN, TERMINE, LERN-STORE, ADD-ONS, HILFEBEREICH |


	@wrongPasswordAdminLogin
	Scenario Outline: first login as a student with correct username but wrong password
	admin should not be able to login with a wrong password
		When admin logs in with email '<adminUsername>' and password '<wrongPassword>'
		Then admin login must fail
        # doesn't work
        # Then the login-page should look like it looked before for '<adminUsername>'
		Examples:
			| adminUsername         | wrongPassword            |
			| admin@schul-cloud.org | wrongPasswordPlaceholder |
