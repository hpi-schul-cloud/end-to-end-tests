@courses @deleteCourse
Feature: Set of tests to delete courses

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @deleteSimpleCourse
    Scenario Outline: As a user, I want to be able to delete a course
        Given <userRole> logs in with email '<userName>' and password '<password>'
        And <userRole> goes to courses page
        And <userRole> sees that course with name '<courseName>' is visible on the list
        When <userRole> chooses course with name '<courseName>'
        And <userRole> clicks on Edit-course button
        And <userRole> clicks on Delete-course button
        Then <userRole> should see that course with name '<courseName>' is not visible on the list
        Examples:
            | userRole | userName                        | password       | courseName |
            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | Mathe      |
