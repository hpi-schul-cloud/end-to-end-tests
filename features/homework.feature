@createHomework
Feature: create different types oh homework


Background: a teacher logs in and creates a course
Given the teacher starts on the login page
Given the teacher is logged-in successfully
Given the teacher goes to the course page as a next step


@createSimpleHomework
Scenario Outline: create a simple hometask
When the teacher creates one course with <coursename> and
When teacher clicks "create a new home task" with <taskname>
Then the hometask with <taskname> is to be found at the task pannel
Examples:
| coursename     |  taskname     | 
| test hometask  |  task example | 

@createPrivateHomework
Scenario Outline: create a private hometask has to be visible only for the teacher
Given the teacher creates one course with <coursename> and pupil with <firstname> and <lastname>:
When teacher creates a private hometask with <taskname>
When if any pupil of this course goes to hometasks
Then the pupil will not see this task with <taskname>
Examples:
| coursename            | firstname | lastname | taskname             | username                    | password     |
| test private hometask | Paula     | Meyer    | private task example | paula.meyer@schul-cloud.org | Schulcloud1! | 

@submitTextHomework
Scenario Outline: pupil submits a homework and teacher evaluates it
When the teacher creates a basic text homework with <taskname>
When the pupil edits a text hometask
Then the teacher should see the changes been done
Then the teacher can evaluate it
Examples:
| coursename            | firstname   | lastname | taskname   | username                     | password     |
| course with file task | Paula       | Meyer    | file task  | paula.meyer@schul-cloud.org  | Schulcloud1! |




