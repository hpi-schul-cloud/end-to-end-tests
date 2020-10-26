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
		And  teacher creates course with name '<courseName>' and student '<studentName>'
		Then teacher clicks the participants icon in the course '<courseName>' and sees the added student '<studentName>' there.
		Examples:
			| courseName | studentName | teachersUsername           | teachersPassword |
			| Mathe      | Paula Meyer | klara.fall@schul-cloud.org | Schulcloud1!     |
