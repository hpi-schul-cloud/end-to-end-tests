@createCourse
Feature: Creating a course as a teacher
    As a teacher on Schul-Cloud
    I want to be able to create a course after logging in with a teacher account

    Scenario Outline: User logs in as a teacher and creates a course
        When a teacher logs in his account using <username> and <password> in order to create a course
        Then he should click the course-button in his dashboard-sidebar
        Then he should click the create-course-button on the course page
        Then he should put the name <coursename> into the name field
        Then he should click the create-course-button on the course-creating-form
        Then he should see the created course with the name <coursename> on the course page

        Examples:
        |username|password|coursename|
        |lehrer@schul-cloud.org|Schulcloud1!|IntegrationTestKurs|