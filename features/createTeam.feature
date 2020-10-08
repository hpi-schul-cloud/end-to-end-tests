@createTeam
Feature: a teacher can create a team

Background: a teacher logged in and created a new pupil

Given teacher arrives on the Schul-Cloud homepage


Scenario Outline: create a team with two new members

Given teacher logs in with email <teacherUsername> and password <teacherPassword>
And teacher accepts data protection
When teacher creates a new team with <teamname> and
And teacher adds a student to team with lastname <lastname1> and firstname <firstname1>
And teacher adds a student to team with lastname <lastname2> and firstname <firstname2>
And teacher clicks submit add team member button
Then this team should be displayed on the team page

Examples:
| teamname  | firstname1 | lastname1 | email1                | firstname2 | lastname2     | email2                  | teacherUsername        | teacherPassword |
| test team | Marla      | Mathe     | raupe@schul-cloud.org | Waldemar   | Wunderlich    | mueller@schul-cloud.org | lehrer@schul-cloud.org | Schulcloud1!    |
