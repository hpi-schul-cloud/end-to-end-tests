@management @managementStudents @editStudent
Feature: Set of tests to edit students
    As an Schul-Cloud user I want to be able to edit students

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @editStudentData
    Scenario Outline: As a user, I want to be able to edit a student firstname, lastname, email and birthdate
        Given <userRole> logs in with email '<adminsUsername>' and password '<adminsPassword>'
        And <userRole> goes to management
        And <userRole> goes to students management
        When <userRole> clicks Edit-student with '<studentUsername>' button
        When <userRole> changes student firstname to '<newFirstName>'
        And <userRole> changes student lastname to '<newLastName>'
        And <userRole> changes student email to '<newEmail>'
        And <userRole> changes student birthdate to '<newBirthdate>'
        And <userRole> clicks Save-changes button
        Then <userRole> should see that edited student firstname '<newFirstName>' is visible on the list
        And <userRole> should see that edited student lastname '<newLastName>' is visible on the list
        And <userRole> should see that edited student email '<newEmail>' is is visible on the list
        When <userRole> clicks Edit-student with '<newEmail>' button
        Then <userRole> should see that student birthdate is '<newBirthdate>'
        Examples:
            | userRole | newFirstName | newLastName | newEmail                    | adminsUsername               | adminsPassword   | newBirthdate | studentUsername                  |
            | admin    | Nils         | Nilsen      | nils.nilsen@schul-cloud.org | kai.admin.qa@schul-cloud.org | Schulcloud1qa!   | 24.12.2004   | amelia.strobl.qa@schul-cloud.org |

    @sendConsentFormEmail
	Scenario Outline: As a user, I want to be able to send emails to all students without a full declaration of consent.
		When <userRole> logs in with email '<username>' and password '<password>'
		When <userRole> goes to management
		And <userRole> goes to students management
		And <userRole> set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>'
		When <userRole> clicks Send-links-to-students'-e-mail-addresses button
		Then email is sent to '<studentEmail>' students without a full declaration of consent
		Examples:
			| userRole | username                     | password       | firstName | secondName | studentEmail        |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | GGG       | DDD        | ggg@schul-cloud.org |
