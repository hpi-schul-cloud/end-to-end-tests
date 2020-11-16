@searchCourse
Feature: user wants to search for a course

	Background:
		Given user arrives on the Schul-Cloud homepage

	@searchCourseAndFindOne
	Scenario Outline: As a user, I want to be able to search a course and find them.
		When <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> goes to courses page
		When <userRole> enters course name '<courseName>' into search field
		Then <userRole> should see that course with name '<courseName>' is visible on the list
		Examples:
			| userRole | email                            | password       | courseName |
			| teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | Mathe      |
			| student  | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa! | German     |

	@searchCourseAndDontFindOne
	Scenario Outline: As a user, I want to be able to search a course and do not find them.
		When <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> goes to courses page
		When <userRole> enters course name '<courseName>' into search field
		Then <userRole> should see that course with name '<courseName>' is not visible on the list
		Examples:
			| userRole | email                            | password       | courseName |
			| teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | Mathematik |
			| student  | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa! | Deutsch    |
