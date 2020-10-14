@createTeam
Feature: a teacher can create a team

Background: a teacher logged in and created a new pupil

Given teacher arrives on the Schul-Cloud homepage


Scenario Outline: create a team with two new members

Given teacher logs in with email <teacherUsername> and password <teacherPassword>
And teacher accepts data protection
<<<<<<< HEAD
When teacher creates a new team with <teamname> and color orange
And teacher adds a student to team with lastname <lastname1> and firstname <firstname1>
And teacher adds a student to team with lastname <lastname2> and firstname <firstname2>
When teacher clicks submit add team member button
=======
When teacher creates a new team with name <teamname>
And teacher adds a student to team with lastname: <lastname1> and firstname: <firstname1>
And teacher adds a student to team with lastname: <lastname2> and firstname: <firstname2>
And teacher clicks submit add team member button
>>>>>>> develop
Then this team should be displayed on the team page
Then this team should be displayed with the correct color
Then the correct number of students in the team should be displayed
Then by clicking the students icon the popup opens and shows all team members with surname and lastname

Examples:
| teamname  | firstname1 | lastname1 | email1                | firstname2 | lastname2     | email2                  | teacherUsername        | teacherPassword |
| test team | Marla      | Mathe     | raupe@schul-cloud.org | Waldemar   | Wunderlich    | mueller@schul-cloud.org | lehrer@schul-cloud.org | Schulcloud1!    |
