@management @managementClass @editClass
Feature: I want to edit a class

	Background:
		Given user arrives on the Schul-Cloud homepage

	@editClassNameAndSchoolYear
	Scenario Outline: As a user, I want to be able to edit a class
		When <userRole> logs in
		And <userRole> goes to management
		And <userRole> goes to class management
		When <userRole> creates class with custom name '<customClassName>' and '<schoolYearOld>'
		And <userRole> edits custom class name to '<newCustomClassName>' and class school year to '<schoolYear>'
		And <userRole> opens classes tab with name '<schoolYear>'
		Then <userRole> should see that class with name '<newCustomClassName>' and teacher lastname '<teacherLastname>' is visible
		Examples:
			| userRole | customClassName | newCustomClassName | schoolYear | teacherLastname | schoolYearOld |
			| teacher  | 8a              | 4d                 | 2021/22    | Herzog          | 2020/21 		 |

	@editClassAddStudentTeacherAndDeleteStudentTeacher
	Scenario Outline: As a user, I want to be able to edit a class
		When <userRole> logs in
		And <userRole> goes to management
		And <userRole> goes to class management
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacher1Lastname>' is visible
		When <userRole> chooses class with name '<className>' clicks Class-management
		And <userRole> adds a teacher with name '<teacher>' to the class
		And <userRole> adds a student with name '<student>' to the class
		And <userRole> clicks on Save-changes in class button
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacher1Lastname>' is visible
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacher2Lastname>' is visible
		And <userRole> should see that number of students in class with name '<className>' is '<numberOfStudents>'
		When <userRole> chooses class with name '<className>' clicks Class-management
		And <userRole> deletes teacher '<teacher>' from class
		And <userRole> deletes student '<student>' from class
		And <userRole> clicks on Save-changes in class button
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacher2Lastname>' is not visible
		And <userRole> should see that number of students in class with name '<className>' is '<numberOfStudentsAfterDelete>'
		Examples:
			| userRole | className | teacher    | student       | teacher1Lastname | teacher2Lastname | numberOfStudents | numberOfStudentsAfterDelete |
			| teacher  | 8a        | Lara Hande | Amelia Strobl | Herzog           | Hande            | 2                | 1                           |

	@addGroupOfStudentsToTheClass
	Scenario Outline: As a user, I want to be able to edit a class
		Given <userRole> logs in
		And <userRole> goes to management
		And <userRole> goes to class management
		And <userRole> sees that class with name '<className>' and teacher lastname '<teacherLastname>' is visible
		And <userRole> should see that number of students in class with name '<className>' is '1'
		When <userRole> chooses class with name '<className>' clicks Class-management
		And <userRole> adds a group of '<numberOfStudentsToBeAdded>' students with firstname '<studentsFirstname>' and lastname '<studentLastname>' to the class
		And <userRole> clicks on Save-changes in class button
		Then <userRole> should see that class with name '<className>' and teacher lastname '<teacherLastname>' is visible
		And <userRole> should see that number of students in class with name '<className>' is '<numberOfStudentsInClass>'
		Examples:
			| userRole | className | teacher    | teacherLastname | numberOfStudentsToBeAdded | numberOfStudentsInClass | studentsFirstname | studentLastname |
			| teacher  | 8a        | Lara Hande | Herzog          | 30                        | 31                      | Student           | LastName        |
