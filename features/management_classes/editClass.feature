@management @managementClass @editClass
Feature: I want to edit a class

	Background:
		Given user arrives on the Schul-Cloud homepage

	@editClassNameAndSchoolYear
	Scenario Outline: As a user, I want to be able to edit a class
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> goes to management
		And <userRole> goes to class management
		When <userRole> creates class with custom name '<customClassName>'
		And <userRole> edits custom class name to '<newCustomClassName>' and class school year to '<schoolYear>'
		And <userRole> opens classes tab with name '<schoolYear>'
		Then <userRole> should see that class with name '<newCustomClassName>' and teacher lastname '<teacherLastname>' is visible
		Examples:
			| userRole | username                        | password        | customClassName | newCustomClassName | schoolYear | teacherLastname |
			| teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa!  | 8a              | 4d                 | 2021/22    | Herzog          |

	@editClassAddStudentTeacherAndDeleteStudentTeacher
	Scenario Outline: As a user, I want to be able to edit a class
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> goes to management
		And <userRole> goes to class management
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacher1Lastname>' is visible
		When <userRole> chooses class with name '<className>' and click managemnt class
		And <userRole> adds a teacher to class with name '<teacher>'
		And <userRole> adds a student to class with name '<student>'
		And <userRole> clicks on Save-changes in class button
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacher1Lastname>' is visible
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacher2Lastname>' is visible
		Then <userRole> should see that class with name '<className>' and '<numberOfStudents>' students is visible
		When <userRole> chooses class with name '<className>' and click managemnt class
		And <userRole> delete teacher '<teacher>' from class
		And <userRole> delete student '<student>' from class
		And <userRole> clicks on Save-changes in class button
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacher2Lastname>' is not visible
		Then <userRole> should see that class with name '<className>' and '<numberOfStudentsAfterDelete>' students is visible
		Examples:
			| userRole | username                        | password        | className | teacher     | student       | teacher1Lastname | teacher2Lastname | numberOfStudents | numberOfStudentsAfterDelete |
			| teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa!  | 8a        | Lara Hande  | Amelia Strobl | Herzog           | Hande            | 2				  | 1				 |
