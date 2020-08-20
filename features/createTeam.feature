@createTeam
Feature: a teacher can create a team

Background: a teacher logged in and created a new pupil

Given teacher arrives on the Schul-Cloud homepage


Scenario Outline: create a team with two new members
# When teacher adds a new student with <firstname1>, <lastname1>, <email1>
# When teacher adds one more student with <firstname2>, <lastname2>, <email2>
Given teacher logs in with email <teacherUsername> and password <teacherPassword>
When teacher creates a new team with <teamname> and
When teacher adds two students to this team
Then this team should be displayed on the team page

Examples:
| teamname  | firstname1 | lastname1 | email1                | firstname2 | lastname2 | email2                  | teacherUsername        | teacherPassword |
| test team | Mia        | Raupe     | raupe@schul-cloud.org | Ronald     | Müller    | mueller@schul-cloud.org | lehrer@schul-cloud.org | Schulcloud1!    |
