@teacherLogin @course @createCourse
Feature: logging in as a teachen and create a new course 
I want to be able to create a new course on Schul-Cloud 

Background:
     Given The teacher arrives on the Schul-Cloud page
     

Scenario Outline:
     When the teacher is logged in <username>,<password> successfully
     When the teacher goes to courses page
     Then the teacher sees existing courses
     Then the teacher clicks the btn
     Then the teacher enters a <courseName>
     Then the teacher chooses a color of the course
     Then the teacher clicks the create button
     Then the teacher clicks to preview
     Then the teacher sees the created course 
Examples:
     |username|password|courseName|
     |klara.fall@schul-cloud.org|Schulcloud1!|Mathe|


