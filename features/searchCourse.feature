@searchCourse
Feature: teacher wants to search for a course

Background: teacher is logged in and visits the course page
Given user arrives on the Schul-Cloud homepage
And user logs in as a default teacher
And teacher goes to courses page

Scenario Outline:
When teacher enters course name <coursename> into search field
Then teacher should see that course list satisfies the search request <coursename>

Examples:
| coursename    |
| Biologie      |
| DoesNotExist  |
| Mathe         |
