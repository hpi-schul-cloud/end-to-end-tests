@copyCourse
Feature: copy a created course


Background: teacher is logged in and has created a course
Given teacher goes to the home page 
Given teacher is successfully logged in
Given goes the course page
Given the course, which must be cloned, exists

Scenario Outline: teacher can copy an existing course
When the teacher selects the course by clicking it
When teacher clicks "clone the course" 
When gives the name <name>
When teacher confirms the cloning process by clicking "Kurs klonen"
Then if that was successful the status should be equal 1

Examples:
| name | result |
| Mathe | 1 | 

