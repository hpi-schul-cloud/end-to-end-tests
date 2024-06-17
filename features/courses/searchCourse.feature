@courses @searchCourse @stableTest @courses_and_topics
Feature: Set of tests to search courses

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@searchCourseAndFindOne
	Scenario Outline: As a user, I want to be able to search a course and find them.
		Given <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> goes to rooms-overview
		When <userRole> enters course name '<courseName>' into search field
		# And <userRole> should see that course with name '<courseName>' is visible on the list
		Examples:
			| userRole | username                         | password       | courseName |
			| teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | Biologie   |
			| student  | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa! | German     |

	@searchCourseAndDontFindOne
	Scenario Outline: As a user, I want to be able to search a course and do not find them.
		Given <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> goes to rooms-overview
		When <userRole> enters course name '<courseName>' into search field
		Then <userRole> should see that course with name '<courseName>' is not visible on the list
		Examples:
			| userRole | username                         | password       | courseName |
			| teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | Mathematik |
			| student  | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa! | Deutsch    |
