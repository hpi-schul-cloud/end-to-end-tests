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


@deletedStudentIsNotVisibleInTeam
	Scenario Outline: As an admin, I want to be able to delete the user and he will be no longer listed in team members
		Given <userAdmin> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userAdmin> login is successful
		When <userAdmin> creates a new team with name '<teamName>' and description '<description>' and color '<color>'
		And <userAdmin> adds a student to team with lastname: '<lastName>' and firstname: '<firstName>'
		And <userAdmin> clicks Submit-add-team-member button
		Then <userRole> goes to Teams Page
		Then <userAdmin> sees that team with name '<teamName>', colour '<color>' and  member number '<number>' is visible on the list
		And <userAdmin> goes to management
		And <userAdmin> goes to students management
		When <userAdmin> clicks Edit-student with '<studentUserName>' button
		And <userAdmin> clicks Delete-user button
		And <userAdmin> clicks Delete-user button inside popup
		Then <userAdmin> goes to Teams Page
		When <userAdmin> clicks on Member icon in team with name '<teamName>'
		Then <userAdmin> should see that team members: '<firstName> <lastName>' are not listed

		Examples:
			| userAdmin | adminUsername                | adminPassword  | studentUserName 				  | firstName | lastName | teamName  | description      | color  | number |
			| admin     | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | boris.wasser.qa@schul-cloud.org | Boris	  | Wasser   | test team | test description | orange | 2      |

	@deletedStudentCanNotUseForgotPassword
	Scenario Outline: As an admin, I want to be able to delete the user
		Given <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userRole> login is successful
		And <userRole> goes to management
		And <userRole> goes to students management
		When <userRole> clicks Edit-student with '<studentUsername>' button
		And <userRole> clicks Delete-user button
		And <userRole> clicks Delete-user button inside popup
		When <userRole> logs out
		And <deletedUserRole> clicks on Forgot Password using email '<studentUsername>'
		Then forgot password email was not sent to '<studentUsername>'
		Examples:
			| userRole | adminUsername                | adminPassword  | studentUsername                  |  deletedUserRole |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | amelia.strobl.qa@schul-cloud.org |  student         |