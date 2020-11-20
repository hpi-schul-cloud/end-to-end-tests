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
		Given <userTeacher> logs in with email '<teacherUserName>' and password '<teacherPassword>'
		And <userTeacher> login is successful
		And <userTeacher> goes to Teams Page
		And <userTeacher> click on first Team
		And <userTeacher> adds a student to team with lastname: '<lastName>' and firstname: '<firstName>'
		And <userRole> clicks Submit-add-team-member button
		When <userTeacher> logs out
		Given <userAdmin> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userAdmin> login is successful
		And <userAdmin> goes to management
		And <userAdmin> goes to students management
		When <userAdmin> clicks Edit-student with '<studentUserName>' button
		And <userAdmin> clicks Delete-user button
		And <userAdmin> clicks Delete-user button inside popup
		When <userAdmin> logs out
		Given <userTeacher> logs in with email '<teacherUserName>' and password '<teacherPassword>'
		And <userTeacher> login is successful
		Examples:
			| userAdmin | adminUsername                | adminPassword  | studentUserName 				 | userTeacher | teacherUserName				 | teacherPassword | lastName | firstName |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | boris.wasser.qa@schul-cloud.org | teacher     | karl.teacher.qa@schul-cloud.org | Schulcloud1qa!  | Boris	  | Wasser    |

