@createTeam
Feature: a teacher can create a team with two students

    Background: a teacher logged in and created a new pupil

        Given user arrives on the Schul-Cloud homepage

    Scenario Outline: create a team with two new members
        Given teacher logs in with email '<teacherUsername>' and password '<teacherPassword>'
        And teacher performs first login actions: data protection acceptance
        When teacher creates a new team with name '<teamName>' and description '<description>' and color orange
        And teacher adds a student to team with lastname: '<lastname1>' and firstname: '<firstname1>'
        And teacher adds a student to team with lastname: '<lastname2>' and firstname: '<firstname2>'
        And teacher clicks Submit-add-team-member button
        Then teacher sees that team with name '<teamName>', colour '#ffad42' and  member number '3' is visible on the list
        When teacher clicks on Member icon in team with name '<teamName>'
        Then teacher should see that members: '<teacherName>,<firstname1> <lastname1>,<firstname2> <lastname2>' are listed

        Examples:
            | teamName  | description      | teacherName | firstname1 | lastname1 | email1                | firstname2 | lastname2  | email2                  | teacherUsername        | teacherPassword |
            | test team | test description | Cord Carl   | Marla      | Mathe     | raupe@schul-cloud.org | Waldemar   | Wunderlich | mueller@schul-cloud.org | lehrer@schul-cloud.org | Schulcloud1!    |
