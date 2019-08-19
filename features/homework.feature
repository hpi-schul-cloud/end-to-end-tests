@createHomework
Feature: create different types oh homework 


Background: a teacher logs in and creates a course
Given the teacher starts on the login page
Given the teacher is logged-in successfully
Given the teacher goes to the course page as a next step
Given the teacher creates one course 

Scenario: create a simple hometask 
When teacher clicks "create a new home task"
Then the hometask is to be found at the task pannel

@createPrivateHomework
Scenario: create a private hometask
When teacher creates a private hometask
When if any pupil of this course goes to hometasks
Then the pupil will not see this task 

@submitTextHomework
Scenario: pupil submits a homework
When the teacher creates a basic text homework
When the pupil edits a text hometask
Then the teacher should see the changes been done





