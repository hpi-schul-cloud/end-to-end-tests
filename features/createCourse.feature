@createCourse
Feature: logging in as a teachen and create a new course
I want to be able to create a new course on Schul-Cloud

Background:
	Given The teacher arrives on the Schul-Cloud page
	Given the teacher is logged in successfully


Scenario Outline: create a the first course. Teachers have 2 options: to import or to create new course and the teacher sees the created course in the list
	When the teacher goes to courses page
	Then the teacher should see 2 buttons: import-course and create-course
	When teacher clicks create-a-course button
	When the teacher enters a <courseName>
	When the teacher chooses a color of the course
	When the teacher clicks the create button
	When the teacher clicks to preview
	Then the teacher sees the created course <courseName>
Examples:
	|courseName|
	|Mathe|

@createCourse1
Scenario Outline: submit compulsory fields by creating the course 
	When the teacher goes to courses page
	Then the teacher should see 2 buttons: import-course and create-course
	When teacher clicks create-a-course button
	When the teacher does not submit any course name and clicks weiter-button
	Then the teacher cannot go to section 2 


Examples:
	|courseName|
	|Mathe|
