@searchCourse
Feature: teacher wants to search for a course

Background: teacher is logged in and visits the course page
Given user arrives on the Schul-Cloud homepage


Scenario Outline:
Given teacher logs in with email '<teacherUsername>' and password '<teacherPassword>'
Given teacher performs first login actions: data protection acceptance
Given teacher goes to courses page
When teacher enters course name '<coursename>' into search field
Then teacher should see that course list satisfies the search request '<coursename>'

Examples:
| coursename    | teacherUsername            | teacherPassword |
| Biologie      | klara.fall@schul-cloud.org | Schulcloud1!    |
| DoesNotExist  | klara.fall@schul-cloud.org | Schulcloud1!    |
| Mathe         | klara.fall@schul-cloud.org | Schulcloud1!    |
