@searchCourse
Feature: teacher wants to search for a course

    Background: teacher is logged in and visits the course page
        Given user arrives on the Schul-Cloud homepage

    @searchCourseAndFindOne
    Scenario Outline: Search for courses and find them.
        Given <userRole> logs in with email '<teacherUsername>' and password '<teacherPassword>'
        Given <userRole> goes to courses page
        When <userRole> enters course name '<courseName>' into search field
		Then <userRole> should see that course with name '<courseName>' is visible on the list
        #Then should see that course list satisfies the search request '<coursename>'

        Examples:
            | userRole | teacherUsername                    | teacherPassword   | courseName                    |
            | teacher  | karl.teacher.qa@schul-cloud.org    | Schulcloud1qa!    | Mathe                         |
            | student  | amelia.strobl.qa@schul-cloud.org   | Schulcloud1qa!    | German                        |
            | student  | herbert.kraft.qa@schul-cloud.org   | Schulcloud1qa!    | Course with subject and tasks |

    @searchCourseAndDontFindOne
    Scenario Outline: Search for courses and don't find them.
        Given <userRole> logs in with email '<teacherUsername>' and password '<teacherPassword>'
        Given <userRole> goes to courses page
        When <userRole> enters course name '<courseName>' into search field
		Then <userRole> should see that course with name '<courseName>' is not visible on the list
        #Then should see that course list satisfies the search request '<coursename>'

        Examples:
            | userRole | teacherUsername                    | teacherPassword   | courseName    |
            | teacher  | karl.teacher.qa@schul-cloud.org    | Schulcloud1qa!    | Mathematik    |
            | student  | amelia.strobl.qa@schul-cloud.org   | Schulcloud1qa!    | Deutsch       |
            | student  | herbert.kraft.qa@schul-cloud.org   | Schulcloud1qa!    | Course        |
