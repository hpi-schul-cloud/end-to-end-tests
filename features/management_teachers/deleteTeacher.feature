@management @managementTeachers @deleteTeacher
Feature: Set of tests to delete teachers
    As an Schul-Cloud user I want to be able to delete teachers

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

	@deletedTeacherCanNotLogin
	Scenario Outline: As an admin, I want to be able to delete the user
		Given <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userRole> login is successful
		And <userRole> goes to management
		And <userRole> goes to teachers management
		When <userRole> clicks Edit-teacher with '<teacherUsername>' button
		And <userRole> clicks Delete-user button
		And <userRole> clicks Delete-user button inside popup
		Then <userRole> should see that user with email '<teacherUsername>' is not visible on the list
		And <userRole> logs out
		When <deletedUserRole> logs in with email '<teacherUsername>' and password '<teacherPassword>'
		Then <deletedUserRole> login must fail
		Examples:
			| userRole | adminUsername                | adminPassword  | teacherUsername                 | teacherPassword | deletedUserRole |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | lara.teacher.qa@schul-cloud.org | Schulcloud1qa!  | teacher         |

	@classWithStudentsAndTeacherGetsDeleted @deletionConcept
	Scenario Outline: As a user, I want to delete a teacher from a class and he will be no longer visible as class teacher
		Given <userRole> logs in with email '<adminUsername>' and password '<password>'
		And <userRole> goes to management
		And <userRole> goes to teachers management
		When <userRole> clicks Edit-teacher with '<teacherUsername>' button
		And <userRole> clicks Delete-user button
		And <userRole> clicks Delete-user button inside popup
		And <userRole> goes to class management
		Then <userRole> should see that not empty class '<className>' and '<membersCount>' members is visible
		Then <userRole> should see that teacher name '<teacherName>' is not assigned anymore

		Examples: 
			| userRole | adminUsername                | password       | teacherUsername                  | teacherName | className | membersCount |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | karl.teacher.qa@schul-cloud.org  | Herzog	    | 8a        | 1			   |
