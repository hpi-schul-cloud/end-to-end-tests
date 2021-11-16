@management @managementTeachers @editTeacher @stableTest
Feature: Set of tests to edit teachers
    As an Schul-Cloud user I want to be able to edit teachers

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @editTeacherData
    Scenario Outline: As a user, I want to be able to edit a teachers firstname, lastname and email
        Given <userRole> logs in with email '<adminsUsername>' and password '<adminsPassword>'
        And <userRole> goes to management
        And <userRole> goes to teachers management
        When <userRole> clicks Edit-teacher with '<teacherUsername>' button
        When <userRole> changes teacher firstname to '<newFirstName>'
        And <userRole> changes teacher lastname to '<newLastName>'
        And <userRole> changes teacher email to '<newEmail>'
        And <userRole> clicks Save-changes button
        Then <userRole> should see that edited teacher firstname '<newFirstName>' is visible on the list
        And <userRole> should see that edited teacher lastname '<newLastName>' is visible on the list
        And <userRole> should see that edited teacher email '<newEmail>' is visible on the list
        Examples:
            | userRole | newFirstName | newLastName | newEmail                 | adminsUsername               | adminsPassword   | teacherUsername                 |
            | admin    | Nora         | Roberts     | nora.roberts@example.com | kai.admin.qa@schul-cloud.org | Schulcloud1qa!   | lara.teacher.qa@schul-cloud.org |
