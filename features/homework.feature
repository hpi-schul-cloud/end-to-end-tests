@createHomework
Feature: create different types oh homework 


Background: a teacher logs in and creates a course
Given the teacher starts on the login page
Given the teacher is logged-in successfully
Given the teacher goes to the course page as a next step
Given the teacher creates one course 

Scenario: create a simple hometask 
When teacher clicks "create a new home task"
#When teacher puts some text
Then the hometask is to be found at the task pannel




