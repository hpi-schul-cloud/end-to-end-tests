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
		Given <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userRole> login is successful
		When <userRole> creates a new team with name '<teamName>' and description '<description>' and color '<color>'
		And <userRole> adds a student to team with lastname: '<lastName>' and firstname: '<firstName>'
		And <userRole> clicks Submit-add-team-member button
		Then <userRole> goes to Teams Page
		Then <userRole> sees that team with name '<teamName>', colour '<color>' and  member number '<number>' is visible on the list
		And <userRole> goes to management
		And <userRole> goes to students management
		When <userRole> clicks Edit-student with '<studentUserName>' button
		And <userRole> clicks Delete-user button
		And <userRole> clicks Delete-user button inside popup
		Then <userRole> goes to Teams Page
		When <userRole> clicks on Member icon in team with name '<teamName>'
		Then <userRole> should see that team members: '<firstName> <lastName>' are not listed

		Examples:
			| userRole  | adminUsername                | adminPassword  | studentUserName 				  | firstName | lastName | teamName  | description      | color  | number |
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

	@classWithTwoStudentsAndOneGetsDeleted @deletionConcept
	Scenario Outline: As a user, I want to delete a student from a class and he will be no longer visible in class members
		Given <userRole> logs in with email '<adminUsername>' and password '<password>'
		And <userRole> goes to management
		And <userRole> goes to class management
		When <userRole> creates class with custom name '<customClassName>'
		And <userRole> chooses class with name '<customClassName>' clicks Class-management
		And <userRole> adds '<studentOne>' and '<studentTwo>' to class
		Then <userRole> should see that not empty class '<customClassName>' and '<membersCount>' members is visible
		When <userRole> goes to management
		And <userRole> goes to students management
		And <userRole> clicks Edit-student with '<studentUserName>' button
		And <userRole> clicks Delete-user button
		And <userRole> clicks Delete-user button inside popup
		And <userRole> goes to class management
		Then <userRole> should see that not empty class '<customClassName>' and '1' members is visible

		Examples: 
			| userRole | adminUsername                | password       | studentUserName                  | customClassName | studentOne    | studentTwo  | membersCount |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | boris.wasser.qa@schul-cloud.org  | 7e              | Herbert Kraft | Boris Wasser| 2			 | 
