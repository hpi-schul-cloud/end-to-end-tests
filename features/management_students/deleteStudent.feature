@management @managementStudents @deleteStudent
Feature: Set of tests to delete students
    As an Schul-Cloud user I want to be able to delete students

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @deletedStudentCanNotLogin
    Scenario Outline: As an admin, I want to be able to delete the user
        Given <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
        And <userRole> login is successful
        And <userRole> goes to management
        And <userRole> goes to students management
        When <userRole> clicks Edit-student with '<studentUsername>' button
        And <userRole> clicks Delete-user button
        And <userRole> clicks Delete-user button inside popup
        Then <userRole> should see that user with email '<studentUsername>' is not visible on the list
        When <userRole> logs out
        And <deletedUserRole> logs in with email '<studentUsername>' and password '<studentPassword>'
        Then <deletedUserRole> login must fail
        Examples:
            | userRole | adminUsername                | adminPassword  | studentUsername                  | studentPassword | deletedUserRole |
            | admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa!  | student         |

	@deletedStudentCanNotUseForgotPassword
	Scenario Outline: As an admin, I want to be able to delete the user
		Given <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userRole> login is successful
		And <userRole> goes to management
		And <userRole> goes to students management
		When <userRole> clicks Edit-student with '<studentUsername>' button
		And <userRole> clicks Delete-user button
		And <userRole> clicks Delete-user button inside popup
		Then <userRole> should see that user with email '<studentUsername>' is not visible on the list
		When <userRole> logs out
		And <deletedUserRole> clicks on Forgot Password using email '<studentUsername>'
		Then forgot password reset email was not sent to '<studentUsername>'
		Examples:
			| userRole | adminUsername                | adminPassword  | studentUsername                  |  deletedUserRole |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | amelia.strobl.qa@schul-cloud.org |  student         |
