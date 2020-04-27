@createHomework
Feature: create different types of homework


Background: a teacher logs in and creates a course
Given the teacher starts on the login page
Given the teacher is logged-in successfully
Given the teacher goes to the course page as a next step


@createSimpleHomework
Scenario Outline: create a simple hometask
When the teacher creates one course with <coursename> and
When teacher clicks "create a new home task" in the course <coursename> with <taskname>
Then the hometask with <taskname> is to be found at the task pannel
Examples:
| coursename     |  taskname     |
| test hometask  |  task example |

@createPrivateHomework
Scenario Outline: create a private hometask has to be visible only for the teacher
Given the teacher creates one course with <coursename> and student with <studentname>
When teacher creates a private hometask in the course <coursename> with <taskname>
When student with <username>, <password> of this course <coursename> goes to hometasks
Then the student will not see this task with <taskname>
Examples:
| coursename            | studentname | taskname             | username                    | password     |
| test private hometask | Paula Meyer | private task example | paula.meyer@schul-cloud.org | Schulcloud1! |

#@submitTextHomework
#Scenario Outline: pupil submits a homework and teacher evaluates it
#Given the teacher creates one course with <coursename> and student with <studentname>
#Given teacher clicks "create a new home task" in the course <coursename> with <taskname>
#When student with <username>, <password> of this course <coursename> goes to hometasks
#When the student finds <taskname>
#Then the student sees the task <taskname> on the dashboard and
#When the student edits a text hometask and submits it
#Then the teacher can see the submission in course <coursename> of task <taskname> done by student <studentname> and
#Then teacher can evaluate the task <taskname>
#Examples:
#| coursename                        | firstname   | lastname | taskname   | username                     | password     | studentname  |
#| course with a task for submission | Paula       | Meyer    | task       | paula.meyer@schul-cloud.org  | Schulcloud1! | Paula Meyer  |
