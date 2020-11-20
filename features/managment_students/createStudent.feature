@management @managementStudents @createStudent
Feature: Set of tests to create students
	As an Schul-Cloud user I want to be able to create students

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@createNewStudent
	Scenario Outline: As a user, I want to be able to create a student
		Given <userRole> logs in with email '<username>' and password '<password>'
		And '<userRole>' performs first login actions
		And <userRole> goes to management
		And <userRole> goes to students management
		When <userRole> set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>'
		And <userRole> sees that student with email '<studentEmail>' is visible on the list
		And <userRole> manually submits consent for user with e-mail '<studentEmail>', thus generates a random password for him
		And <userRole> logs out
		And student logs in with email '<studentEmail>' and password genarated by admin during manual submission of consent
		Then student should see that data protection is already accepted and performs first login actions: password change '<newPasswordStudent>'
		Examples:
			| userRole | firstName | secondName | studentEmail              | username              | password     | newPasswordStudent |
			| admin    | Georg     | Georgmann  | georgmann@schul-cloud.org | admin@schul-cloud.org | Schulcloud1! | Schulcloud1!!      |

	@createNewStudentU14
	Scenario Outline: As a user, I want to create a student under 14 who can register with parents
		Given <userRole> logs in with email '<username>' and password '<password>'
		And '<userRole>' performs first login actions
