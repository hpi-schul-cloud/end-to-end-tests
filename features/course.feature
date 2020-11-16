@course
Feature: logging in as a teacher and create a new course
	I want to be able to create a new course on Schul-Cloud

	Background:
		Given user arrives on the Schul-Cloud homepage
		
	@createCourse
	Scenario Outline: create first course. Teachers have 2 options: to import or to create new course and the teacher sees the created course in the list
		Given teacher logs in with email '<userName>' and password '<password>'
		And teacher performs first login actions: data protection acceptance
		When teacher goes to courses page
		Then teacher should see that buttons: Import-course, Create-new-course are visible
		When teacher clicks Create-new-course button
		And teacher enters course name '<courseName>' into new course form
		And teacher chooses himself as a Course teacher
		And teacher chooses course colour '<courseColour>'
		And teacher clicks Next-section button
		And teacher clicks Next-section button
		And teacher clicks Go-to-course-list button
		Then teacher should see that course with name '<courseName>' is visible on the list
		Examples:
			| userName                   | password     | courseName | courseColour |
			| klara.fall@schul-cloud.org | Schulcloud1! | Mathe      | corn         |

	@createCourseCorrectly
	Scenario Outline: submit compulsory fields by creating the course
		Given teacher logs in with email '<userName>' and password '<password>'
		And teacher performs first login actions: data protection acceptance
		And teacher goes to courses page
		Then teacher should see that buttons: Import-course, Create-new-course are visible
		When teacher clicks Create-new-course button
		#Then teacher should see that his his/hers name is entered by default in teachers' field (to be restored after SC-7152)
		Then teacher should see that time span is already set
		And teacher should see that supply teacher is not set
		And teacher should see that course name is not set
		When teacher clicks Next-section button
		Then teacher should see that '2' section can not be opened
		When teacher enters course name '<courseName>' into new course form
		And teacher chooses himself as a Course teacher
		And teacher chooses course colour '<courseColour>'
		And teacher clicks Next-section button
		Then teacher should see that '2' section is opened
		And teacher should see that no class is set
		And teacher should see that no student is set
		When teacher clicks Next-section button
		Then teacher should see that '3' section is opened
		And teacher should see that buttons: Create-new-course, Go-to-course-list-page are visible
		When teacher clicks Go-to-course-list button
		Then teacher should see that course with name '<courseName>' is visible on the list
		And teacher should see that course with name '<courseName>' is displayed correctly on the list
		And teacher should see that color of the course with name '<courseName>' is '<courseColour>' that was selected during the creation process
		Examples:
			| userName                   | password     | courseName        | courseColour |
			| klara.fall@schul-cloud.org | Schulcloud1! | Mathe@Sport&Music | corn         |

	@createCourseWithStudent
	Scenario Outline:
		When teacher logs in with email '<teachersUsername>' and password '<password>'
		And teacher performs first login actions: data protection acceptance
		And teacher creates course with name '<courseName>' and student '<studentName>'
		And teacher sees that course with name '<courseName>' contains number of members '1'
		And teacher clicks on members icon in course with name '<courseName>'
		Then teacher should see that course members are visible on the list '<studentName>'
		When teacher closes member modal window
		And teacher logs out
		And student '<studentName>' logs in with email '<studentLogin>' and password '<password>'
		And student performs first login actions: data protection acceptance
		And student goes to courses page
		Then student should see that course with name '<courseName>' is visible on the list
		Examples:
			| courseName | studentName         | teachersUsername       | password     | studentLogin                        |
			| Sport      | Waldemar Wunderlich | lehrer@schul-cloud.org | Schulcloud1! | waldemar.wunderlich@schul-cloud.org |

	@editCourse
	Scenario Outline: logging in as a teacher I want to be able to edit a course on Schul-Cloud
		Given teacher logs in with email '<userName>' and password '<password>'
		And teacher performs first login actions: data protection acceptance
		And teacher goes to courses page
		And teacher should see that course with name '<courseName>' is visible on the list
		When teacher chooses course with name '<courseName>'
		And teacher clicks on Edit-course button
		And teacher changes name of Course '<changeName>'
		And teacher enters Course description '<description>'
		And teacher chooses course colour '<courseColour>'
		And teacher clicks on Save-changes in course button
		And teacher goes to courses page
		Then teacher should see that course with name '<changeName>' is displayed correctly on the list
		And teacher should see that course name '<changeName>' with description correctly displayed '<description>'
		And teacher should see that course name '<changeName>' with color correctly displayed '<courseColour>'
		Examples:
			| userName               | password     | courseName | courseColour | changeName | description |
			| lehrer@schul-cloud.org | Schulcloud1! | Mathe      | corn         | Biologie   | I LIKE BIO  |

	@deleteCourse
	Scenario Outline: logging in as a teacher I want to be able to delete a course on Schul-Cloud
		Given teacher logs in with email '<userName>' and password '<password>'
		And teacher performs first login actions: data protection acceptance
		And teacher goes to courses page
		And teacher should see that course with name '<courseName>' is visible on the list
		When teacher chooses course with name '<courseName>'
		And teacher clicks on Edit-course button
		And teacher clicks on Delete-course button
		And teacher clicks on Delete-course-submit button
		Then teacher should see that course with name '<courseName>' is not visible on the list
		Examples:
			| userName               | password     | courseName | courseColour |
			| lehrer@schul-cloud.org | Schulcloud1! | Mathe      | corn         |
