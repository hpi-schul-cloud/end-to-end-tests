@addPupil
@addClass

Feature: logging in as a teacher and create a new course and add pupils and classes to the course
I want to be able to add some pupils to a new course on Schul-Cloud 

Background:
     Given teacher arrives on the Schul-Cloud page
     Given teacher is logged in successfully
     Given teacher goes to courses page
     

Scenario Outline:
     Then teacher sees existing courses
     Then teacher clicks the btn
     Then teacher enters a <courseName>
     Then teacher chooses a color of the course
     Then teacher sets the sub.teacher
     Then teacher clicks the "Next" button
     Then teacher adds pupils to the course
     Then teacher adds a class to the course
     Then teacher clicks next
     Then teacher clicks to preview
     Then teacher sees the created course and the added pupil 
     Then teacher closes the info window
Examples:
     |courseName|
     |Mathe|
