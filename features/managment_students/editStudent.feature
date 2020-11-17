@managment @managmentStudents @editStudent
Feature: Set of tests to edit students
    As an Schul-Cloud user I want to be able to edit students

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @editStudentData
    Scenario Outline: As a user, I want to be able to edit a student firstname, lastname, email and birthdate
        Given <userRole> logs in with email '<adminsUsername>' and password '<adminsPassword>'
        And '<userRole>' performs first login actions
        And <userRole> goes to managment
        And <userRole> goes to students managment
        And <userRole> clicks Edit-student button
        When <userRole> changes student firstname to '<newFirstName>'
        And <userRole> changes student lastname to '<newLastName>'
        And <userRole> changes student email to '<newEmail>'
        And <userRole> changes student birthdate to '<newBirthdate>'
        And <userRole> clicks Save-changes button
        Then <userRole> should see that edited student firstname '<newFirstName>' is visible on the list
        And <userRole> should see that edited student lastname '<newLastName>' is visible on the list
        And <userRole> should see that edited student email '<newEmail>' is is visible on the list
        When <userRole> clicks Edit-student button
        Then <userRole> should see that student birthdate is '<newBirthdate>'
        Examples:
            | userRole | newFirstName | newLastName | newEmail                    | adminsUsername        | adminsPassword | newBirthdate |
            | admin    | Nils         | Nilsen      | nils.nilsen@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!   | 24.12.2004   |
