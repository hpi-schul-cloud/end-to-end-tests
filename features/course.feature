@course
Feature: Create course with different data, edit and delete course

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createCourse
	Scenario Outline: As a user, I want to be able to create first course
		When <userRole> logs in with email '<userName>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> goes to courses page
		Then <userRole> should see that buttons: Import-course, Create-new-course are visible
		When <userRole> clicks Create-new-course button
		And <userRole> enters course name '<courseName>' into new course form
		And <userRole> chooses himself as a Course teacher
		And <userRole> chooses course colour '<courseColour>'
		And <userRole> clicks Next-section button
		And <userRole> clicks Next-section button
		And <userRole> clicks Go-to-course-list button
		Then <userRole> should see that course with name '<courseName>' is visible on the list
		Examples:
			| userRole | userName                   | password     | courseName | courseColour |
			| teacher  | klara.fall@schul-cloud.org | Schulcloud1! | Mathe      | corn         |

	@createCourseCorrectly
	Scenario Outline: As a user, I want to be able to submit compulsory fields by creating the course
		When <userRole> logs in with email '<userName>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		Then <userRole> should see that buttons: Import-course, Create-new-course are visible
		When <userRole> clicks Create-new-course button
		#Then teacher should see that his his/hers name is entered by default in teachers' field (to be restored after SC-7152)
		Then <userRole> should see that time span is already set
		And <userRole> should see that supply teacher is not set
		And <userRole> should see that course name is not set
		When <userRole> clicks Next-section button
		Then <userRole> should see that '2' section can not be opened
		When <userRole> enters course name '<courseName>' into new course form
		And <userRole> chooses himself as a Course teacher
		And <userRole> chooses course colour '<courseColour>'
		And <userRole> clicks Next-section button
		Then <userRole> should see that '2' section is opened
		And <userRole> should see that no class is set
		And <userRole> should see that no student is set
		When <userRole> clicks Next-section button
		Then <userRole> should see that '3' section is opened
		And <userRole> should see that buttons: Create-new-course, Go-to-course-list-page are visible
		When <userRole> clicks Go-to-course-list button
		Then <userRole> should see that course with name '<courseName>' is visible on the list
		And <userRole> should see that course with name '<courseName>' is displayed correctly on the list
		And <userRole> should see that color of the course with name '<courseName>' is '<courseColour>' that was selected during the creation process
		Examples:
			| userRole | userName                   | password     | courseName        | courseColour |
			| teacher  | klara.fall@schul-cloud.org | Schulcloud1! | Mathe@Sport&Music | corn         |

	@createCourseWithStudent
	Scenario Outline: As a user, I want to be able to create a course that student should see
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> creates course with name '<courseName>' and student '<studentName>'
		And <userRole> sees that course with name '<courseName>' contains number of members '<membersNumber>'
		And <userRole> clicks on members icon in course with name '<courseName>'
		Then <userRole> should see that course members are visible on the list '<studentName>'
		When <userRole> closes member modal window
		And <userRole> logs out
		And <userRole> '<studentName>' logs in with email '<studentLogin>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		Then <userRole> should see that course with name '<courseName>' is visible on the list
		Examples:
			| userRole | courseName | studentName         | username               | password     | studentLogin                        | membersNumber |
			| teacher  | Sport      | Waldemar Wunderlich | lehrer@schul-cloud.org | Schulcloud1! | waldemar.wunderlich@schul-cloud.org | 1             |

	@editCourse
	Scenario Outline: As a user, I want to be able to edit a course
		When <userRole> logs in with email '<userName>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		And <userRole> should see that course with name '<courseName>' is visible on the list
		When <userRole> chooses course with name '<courseName>'
		And <userRole> clicks on Edit-course button
		And <userRole> changes name of Course '<changeName>'
		And <userRole> enters Course description '<description>'
		And <userRole> chooses course colour '<courseColour>'
		And <userRole> clicks on Save-changes in course button
		And <userRole> goes to courses page
		Then <userRole> should see that course with name '<changeName>' is displayed correctly on the list
		And <userRole> should see that course name '<changeName>' with description correctly displayed '<description>'
		And <userRole> should see that course name '<changeName>' with color correctly displayed '<courseColour>'
		Examples:
			| userRole | userName               | password     | courseName | courseColour | changeName | description |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | corn         | Biologie   | I LIKE BIO  |

	@deleteCourse
	Scenario Outline: As a user, I want to be able to delete a course
		When <userRole> logs in with email '<userName>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		And <userRole> should see that course with name '<courseName>' is visible on the list
		When <userRole> chooses course with name '<courseName>'
		And <userRole> clicks on Edit-course button
		And <userRole> clicks on Delete-course button
		Then <userRole> should see that course with name '<courseName>' is not visible on the list
		Examples:
			| userRole | userName               | password     | courseName |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      |
