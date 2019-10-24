@searchCourse
Feature: teacher wants to search for a course


Background: teacher is logged in and visits the course page
Given teacher goes to the login page
Given the teacher logs in
Given the teacher goes to the courses page

Scenario Outline:
When the teacher tipps the name <name> of the course in the searchfield
Then the list satisfies the search request <name>

Examples:
| name |
| Biologie |
| DoesNotExist |
| Mathe |
