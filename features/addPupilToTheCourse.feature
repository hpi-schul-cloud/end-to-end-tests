@addPupil
@addClass

Feature: logging in as a teacher and create a new course and add pupils and classes to the course
I want to be able to add some pupils to a new course on Schul-Cloud 

Background:
     Given teacher arrives on the Schul-Cloud page
     Given teacher is logged in successfully
     Given teacher goes to courses page
     

Scenario Outline:
     When teacher creates a course <courseName> and adds pupils to this course
     When teacher clicks the participants icon
     When teacher added a certain pupil
     Then he should see the pupil in this course

Examples:
     |courseName|
     |Mathe|
