@createCourse
Feature: logging in as a teachen and create a new course
I want to be able to create a new course on Schul-Cloud

Background:
	Given The teacher arrives on the Schul-Cloud page
	


Scenario Outline: create a the first course. Teachers have 2 options: to import or to create new course and the teacher sees the created course in the list
	Given the teacher with email <email> and <password> is logged in successfully
	When the teacher goes to courses page
	Then the teacher should see 2 buttons: import-course and create-course
	When teacher clicks create-a-course button
	When the teacher enters a <courseName>
	When the teacher chooses a color <courseColour> of the course
	When the teacher clicks the create button
	When the teacher clicks to preview
	Then the teacher sees the created course <courseName>
Examples:
	| email                     | password    | courseName| courseColour|
	| klara.fall@schul-cloud.org| Schulcloud1!| Mathe     | corn        |

@createCourseCorrectly
Scenario Outline: submit compulsory fields by creating the course 
	Given the teacher with email <email> and <password> is logged in successfully
	When the teacher goes to courses page
	Then the teacher should see 2 buttons: import-course and create-course
	When teacher clicks create-a-course button
	When the teacher does not submit any course name and clicks weiter-button
	Then the teacher cannot go to section 2 
	Then the name of the teacher who is creating is already filled in the teacher's field
	Then time span is  already set
	Then supply teacher is not set
	When the teacher enters a <courseName>
	When the teacher chooses a color <courseColour> of the course
	When the teacher clicks the create button
	Then the second screen is shown
	Then no class is set
	Then no students are set
	When teacher clicks 'Kurs anlegen und Weiter'
	Then the third screen is shown
	Then btns "Einen weiteren Kurs anlegen" and "Zur Kursübersicht" are visible
	When the teacher clicks zur-uebersicht-btn
	Then the teacher sees the created course <courseName>
	#Then the name <courseName> is displayed correctly
	#Then the color of the course is the color <courseColour> that was selected during the creation process
	
	


Examples:
	| email                     | password    | courseName           | courseColour|
	| klara.fall@schul-cloud.org| Schulcloud1!| Mathe@Sport&Music    | corn        |

