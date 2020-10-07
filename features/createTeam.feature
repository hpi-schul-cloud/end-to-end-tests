@createTeam
Feature: a teacher can create a team

Background: a teacher logged in and created a new pupil

Given teacher arrives on the Schul-Cloud homepage


Scenario Outline: create a team with two new members

Given teacher logs in with email <teacherUsername> and password <teacherPassword>
Given teacher accepts data protection
When teacher creates a new team with <teamname> and
When teacher adds two students to this team
Then this team should be displayed on the team page

Examples:
| teamname  | firstname1 | lastname1 | email1                | firstname2 | lastname2 | email2                  | teacherUsername        | teacherPassword |
| test team | Mia        | Raupe     | raupe@schul-cloud.org | Ronald     | Müller    | mueller@schul-cloud.org | lehrer@schul-cloud.org | Schulcloud1!    |
