@createCourse 
Feature: logging in as a teachen and create a new course 
I want to be able to create a new course on Schul-Cloud 

Background:
     Given The teacher arrives on the Schul-Cloud page
     Given the teacher is logged in successfully
     

Scenario Outline:
     When the teacher goes to courses page
     Then the teacher sees existing courses
     Then the teacher clicks the btn
     Then the teacher enters a <courseName>
     Then the teacher chooses a color of the course
     Then the teacher clicks the create button
     Then the teacher clicks to preview
     Then the teacher sees the created course 
Examples:
     |courseName|
     |Mathe|

     


