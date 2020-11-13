@searchCourse
Feature: teacher wants to search for a course

    Background: teacher is logged in and visits the course page
        Given user arrives on the Schul-Cloud homepage

    Scenario Outline: Search for courses.
        Given <userRole> logs in with email '<teacherUsername>' and password '<teacherPassword>'
        Given <userRole> goes to courses page
        When <userRole> enters course name '<coursename>' into search field
        Then <userRole> should see that course list satisfies the search request '<coursename>'

        Examples:
            | userRole | teacherUsername                    | teacherPassword   | coursename                    |
            | teacher  | karl.teacher.qa@schul-cloud.org    | Schulcloud1qa!    | Mathe                         |
            | teacher  | karl.teacher.qa@schul-cloud.org    | Schulcloud1qa!    | th                            |
            | student  | amelia.strobl.qa@schul-cloud.org   | Schulcloud1qa!    | German                        |
            | student  | herbert.kraft.qa@schul-cloud.org   | Schulcloud1qa!    | Course with subject and tasks |
