@management @managementTeachers @deleteTeacher @stableTest
Feature: Set of tests to delete teachers
	As an Schul-Cloud user I want to be able to delete teachers

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@deletedTeacherCanNotLogin @deletionConcept @e2eCore
	Scenario Outline: As an admin, I want to be able to delete the user
		Given <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userRole> login is successful
		And <userRole> goes to management
		#The step below can be removed if /SC-8481 is done
		And <userRole> goes to students management
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

	@deletedTeacherIsNotVisibleInCourse @deletionConcept
	Scenario Outline: As an admin, I want to be able to delete the user and he will be no longer listed in course members
		Given <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userRole> login is successful
		And <userRole> goes to management
		And <userRole> goes to course management
		And <userRole> clicks Edit-course with '<courseName>' button
		And <userRole> adds another teacher with '<teacherName>' to course
		When <userRole> clicks on Save-changes in course button
		Then <userRole> should see that course with '<courseName>' has teachers with name '<teacherNames>'
		#The step below can be removed if /SC-8481 is done
		And <userRole> goes to students management
		And <userRole> goes to teachers management
		When <userRole> clicks Edit-teacher with '<teacherMailAddress>' button
		And <userRole> clicks Delete-user button
		And <userRole> clicks Delete-user button inside popup
		Then <userRole> should see that user with email '<teacherMailAddress>' is not visible on the list
		And <userRole> logs out
		And <checkUserRole> logs in with email '<teacherUsername>' and password '<adminPassword>'
		And <checkUserRole> login is successful
		And <checkUserRole> goes to courses page
		And <checkUserRole> sees that course with name '<courseName>' is visible on the list
		When <checkUserRole> chooses course with name '<courseName>'
		And <checkUserRole> clicks on Edit-course button
		Then <checkUserRole> can not see deleted teacher with name '<teacherName>' on the list of teachers
		Examples:
			| userRole | adminUsername                | adminPassword  | courseName                    | teacherName | teacherNames  | teacherMailAddress              | checkUserRole | teacherUsername                 |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | Course with subject and tasks | Lara Hande  | Herzog, Hande | lara.teacher.qa@schul-cloud.org | teacher       | karl.teacher.qa@schul-cloud.org |

	@deletedTeacherIsNotVisibleInClass @deletionConcept
	Scenario Outline: As a user, I want to delete a teacher from a class and he will be no longer visible as class teacher
		Given <userRole> logs in with email '<adminUsername>' and password '<password>'
		And <userRole> goes to management
		And <userRole> goes to teachers management
		When <userRole> clicks Edit-teacher with '<teacherUsername>' button
		And <userRole> clicks Delete-user button
		And <userRole> clicks Delete-user button inside popup
		Then <userRole> should see that user with email '<teacherUsername>' is not visible on the list
		And <userRole> goes to class management
		Then <userRole> should see that class with '<className>' has no teachers

		Examples:
			| userRole | adminUsername                | password       | teacherUsername                 | className |
			| admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | karl.teacher.qa@schul-cloud.org | 9a        |
