@createHomework
Feature: create different types oh homework


Background: a teacher logs in and creates a course
Given the teacher starts on the login page
Given the teacher is logged-in successfully
Given the teacher goes to the course page as a next step
Given the teacher creates one course

@createSimpleHomework
Scenario Outline: create a simple hometask
When teacher clicks "create a new home task" with <taskname>
Then the hometask with <taskname> is to be found at the task pannel
Examples:
| taskname | 
| Test Aufgabe  |

@createPrivateHomework
Scenario Outline: create a private hometask
When teacher creates a private hometask with <taskname>
When if any pupil of this course goes to hometasks
Then the pupil will not see this task with <taskname>
Examples:
| taskname |
| Hometask test  |

@submitTextHomework
Scenario Outline: pupil submits a homework and teacher evaluates it
When the teacher creates a basic text homework with <taskname>
When the pupil edits a text hometask
Then the teacher should see the changes been done
Then the teacher can evaluate it
Examples:
| taskname | 
| test submission  | 




