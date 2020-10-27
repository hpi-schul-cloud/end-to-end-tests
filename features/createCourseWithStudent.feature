@createCourseWithStudent
Feature: logging in as a teacher and creating a new course with one student 
	I want to be able to create a new course with one student on Schul-Cloud

	Background:
		Given teacher arrives on the Schul-Cloud homepage

	Scenario Outline:
		When teacher logs in with email <teachersUsername> and password <password>
		And teacher accepts data protection
		When teacher goes to courses page
		And teacher clicks create course button
		And teacher creates a course '<courseName>' 
		And teacher adds student '<studentName>' to this course
		Then teacher returns to course list page
		And teacher sees that number of participants of the course '<courseName>' equals one
		When teacher clicks the participants icon in the course <courseName> and sees the added student <studentName> there
		Then teacher logs out 
		When student '<studentName>' logs in with email <studentLogin> and password <password>
		And student goes to course pages 
		Then the course '<courseName>' is visible for the student '<studentName>'
		
		Examples:
			| courseName | studentName | teachersUsername           | password 		 | studentLogin 			|
			| Sport      | Marla Mathe | lehrer@schul-cloud.org     | Schulcloud1!     | schueler@schul-cloud.org |
