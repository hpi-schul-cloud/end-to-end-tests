@management @managementStudents @editStudent
Feature: Set of tests to edit students
    As an Schul-Cloud user I want to be able to edit students

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @editStudentData
    Scenario Outline: As a user, I want to be able to edit a student firstname, lastname, email and birthdate
        Given <userRole> logs in with email '<adminsUsername>' and password '<adminsPassword>'
        And '<userRole>' performs first login actions
        And <userRole> goes to management
        And <userRole> goes to students management
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

    @sendConsentFormEmail
	Scenario Outline: As a user, I want to be able to send emails to all students without a full declaration of consent.
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> goes to management
		And <userRole> goes to students management
		And <userRole> set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>'
		When <userRole> clicks Send-links-to-students'-e-mail-addresses button
		Then email is sent to '<studentEmail>' students without a full declaration of consent
		Examples:
			| userRole | username              | password     | firstName | secondName | studentEmail        |
			| admin    | admin@schul-cloud.org | Schulcloud1! | GGG       | DDD        | ggg@schul-cloud.org |
