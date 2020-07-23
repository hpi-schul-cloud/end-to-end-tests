@createCourse
Feature: logging in as a teacher and create a new course
I want to be able to create a new course on Schul-Cloud

Background:
	Given The teacher arrives on the Schul-Cloud Page
	


Scenario Outline: create first course. Teachers have 2 options: to import or to create new course and the teacher sees the created course in the list
	Given teacher with email <username> and <password> is logged in successfully
	When teacher goes to courses page
	Then teacher should see 2 buttons: import-course and create-course
	When teacher clicks create-a-course button
	When teacher enters a <courseName>
	When teacher chooses a color <courseColour> of the course
	When teacher clicks the create button
	When teacher clicks to preview
	Then teacher sees the created course <courseName>
Examples:
	| username                  | password    | courseName| courseColour|
	| klara.fall@schul-cloud.org| Schulcloud1!| Mathe     | corn        |

@createCourseCorrectly
Scenario Outline: submit compulsory fields by creating the course 
	Given teacher with email <username> and <password> is logged in successfully
	When teacher goes to courses page
	Then teacher should see 2 buttons: import-course and create-course
	When teacher clicks create-a-course button
	When teacher does not submit any course name and clicks weiter-button
	Then teacher cannot go to section 2 
	Then name of the teacher who is creating is already filled in the teacher's field
	Then time span is  already set
	Then supply teacher is not set
	When teacher enters a <courseName>
	When teacher chooses a color <courseColour> of the course
	When teacher clicks the create button
	Then second screen is shown
	Then no class is set
	Then no students are set
	When teacher clicks 'Kurs anlegen und Weiter'
	Then third screen is shown
	Then btns "Einen weiteren Kurs anlegen" and "Zur Kursübersicht" are visible
	When teacher clicks zur-uebersicht-btn
	Then teacher sees the created course <courseName>
	Then name <courseName> is displayed correctly
	Then color of the course is the color <courseColour> that was selected during the creation process
	
	


Examples:
	| username                  | password    | courseName           | courseColour|
	| klara.fall@schul-cloud.org| Schulcloud1!| Mathe@Sport&Music    | corn        |

