@courses @editCourse @e2eCore @stableTest @courses_and_topics
Feature: Set of tests to edit courses

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @editSimpleCourse
    Scenario Outline: As a user, I want to be able to edit a course
        Given <userRole> logs in with email '<userName>' and password '<password>'
        And <userRole> goes to rooms-overview
        And <userRole> sees that course with name '<courseName>' is visible on the list
        When <userRole> chooses course with name '<courseName>'
        And <userRole> clicks on Edit-course button
        And <userRole> changes name of Course '<changeName>'
        And <userRole> changes course description '<description>'
        And <userRole> chooses course colour '<courseColour>'
        And <userRole> clicks on Save-changes in course button
        And <userRole> goes to rooms-overview
        Then <userRole> should see that course with name '<changeName>' is visible on the list
        And <userRole> should see that course name '<changeName>' with description correctly displayed '<description>'
        And <userRole> goes to rooms-overview
        And <userRole> should see that color of the course with name '<changeName>' is '<courseColour>' that was selected during the creation process
        Examples:
            | userRole | userName                        | password       | courseName                    | courseColour | changeName | description |
            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | Course with subject and tasks | brown        | Sport      | I LIKE IT   |
