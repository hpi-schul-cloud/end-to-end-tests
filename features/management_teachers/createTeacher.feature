@management @managementTeachers @createTeacher
Feature: Set of tests to create teachers
	As an Schul-Cloud user I want to be able to create teachers

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@createNewTeacher @stableTest
	Scenario Outline: As a user, I want to be able to create a teacher
		Given <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> goes to management
		And <userRole> goes to teachers management
		And <userRole> goes to teacher creation form
		When <userRole> set teacher firstname '<firstName>', lastname '<lastName>', email '<teacherEmail>'
		And <userRole> sees that teacher with email '<teacherEmail>' is visible on the list
		Examples:
			| userRole | firstName  | lastName   | teacherEmail                 | username                     | password       |
			| admin    | Theophilus | Hermelates | t.hermelates@schul-cloud.org | kai.admin.qa@schul-cloud.org | Schulcloud1qa! |
