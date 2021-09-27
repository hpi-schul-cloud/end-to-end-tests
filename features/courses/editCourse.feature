@courses @editCourse @e2eCore
Feature: Set of tests to edit courses

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @editSimpleCourse
    Scenario Outline: As a user, I want to be able to edit a course
        Given <userRole> logs in with email '<userName>' and password '<password>'
        And <userRole> goes to courses page
        And <userRole> sees that course with name '<courseName>' is visible on the list
        When <userRole> chooses course with name '<courseName>'
        And <userRole> clicks on Edit-course button
        And <userRole> changes name of Course '<changeName>'
        And <userRole> changes course description '<description>'
        #And <userRole> chooses course colour '<courseColour>'
        And <userRole> clicks on Save-changes in course button
        And <userRole> goes to courses page
        Then <userRole> should see that course with name '<changeName>' is displayed correctly on the list
        And <userRole> should see that course name '<changeName>' with description correctly displayed '<description>'
        #And <userRole> should see that course name '<changeName>' with color correctly displayed '<courseColour>'
        Examples:
            | userRole | userName                        | password       | courseName | courseColour   | changeName | description |
            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | Mathe      | violet         | Sport      | I LIKE IT   |
