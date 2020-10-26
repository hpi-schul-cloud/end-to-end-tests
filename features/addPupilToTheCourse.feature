@addStudent

Feature: logging in as a teacher and create a new course and add pupils and classes to the course
	I want to be able to add some pupils to a new course on Schul-Cloud

	Background:
		Given teacher arrives on the Schul-Cloud homepage

	@addStudentToCourse
	Scenario Outline:
		Given teacher logs in with email '<teachersUsername>' and password '<teachersPassword>'
		Given teacher accepts data protection
		And  teacher goes to courses page
		And  teacher creates a course '<courseName>' and adds student '<studentName>' to this course
		Then teacher clicks the participants icon in the course '<courseName>' and sees the added student '<studentName>' there
		When teacher opens the course and clicks edit course button
		When teacher adds another student '<secondStudent>' to the course
		Examples:
			| courseName | studentName | secondStudent 		 | teachersUsername           | teachersPassword |
			| Sport      | Marla Mathe | Waldemar Wunderlich | lehrer@schul-cloud.org     | Schulcloud1!     |
