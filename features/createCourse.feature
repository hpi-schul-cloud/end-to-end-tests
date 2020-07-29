@createCourse
Feature: logging in as a teacher and create a new course
I want to be able to create a new course on Schul-Cloud

Background:
	Given teacher arrives on the Schul-Cloud Page

Scenario Outline: create first course. Teachers have 2 options: to import or to create new course and the teacher sees the created course in the list
	Given teacher with email <username> and <password> is logged in successfully
	When teacher goes to courses page
	Then teacher should see that buttons: Import-course, Create-new-course are visible
	When teacher clicks Create-new-course button
	When teacher enters course name <courseName>
	When teacher chooses course colour <courseColour>
	When teacher clicks Next-section button
	When teacher clicks Next-section button
	When teacher clicks Go-to-course-list
	Then teacher should see that course with name <courseName> is visible on the list
Examples:
	| username                  | password    | courseName| courseColour|
	| klara.fall@schul-cloud.org| Schulcloud1!| Mathe     | corn        |

@createCourseCorrectly
Scenario Outline: submit compulsory fields by creating the course 
	Given teacher with email <username> and <password> is logged in successfully
	When teacher goes to courses page
	Then teacher should see that buttons: Import-course, Create-new-course are visible
	When teacher clicks Create-new-course button
	Then teacher should see that his name is entered by default in teachers' field
	Then teacher should see that time span is already set
	Then teacher should see that supply teacher is not set 
	When teacher see that course name has not been entered 
	When teacher clicks Next-section button
	Then teacher should see that the 2 section can not be opened
	When teacher enters course name <courseName>
	When teacher chooses course colour <courseColour>
	When teacher clicks Next-section button
	Then teacher should see that 2 section is opened
	Then teacher should see that no class is set
	Then teacher should see that no student is set
	When teacher clicks Next-section button
	Then teacher should see that 3 section is opened
	Then teacher should see that buttons: Create-new-course, Go-to-course-list-page are visible
	When teacher clicks Go-to-course-list
	Then teacher should see that course with name <courseName> is visible on the list
	Then teacher should see that course with name <courseName> is displayed correctly on the list
	Then teacher should see that color of the course is <courseColour> that was selected during the creation process	
Examples:
	|username                  |password    |courseName           |courseColour|
	|klara.fall@schul-cloud.org|Schulcloud1!|Mathe@Sport&Music    |corn        |

