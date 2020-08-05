@addStudent

Feature: logging in as a teacher and create a new course and add pupils and classes to the course
I want to be able to add some pupils to a new course on Schul-Cloud

Background:
	Given user arrives on the Schul-Cloud homepage
	Given user logs in as default teacher
	Given teacher goes to courses page


Scenario Outline:
	When teacher creates a course <courseName> and adds student <studentName> to this course
	Then teacher sees that participants icon in course with name <courseName> has correct number of members <studentName>
	Then teacher clicks the participants icon in the course <courseName> and sees the added student <studentName> there
Examples:
|courseName|studentName|
|Mathe     |Paula Meyer|
