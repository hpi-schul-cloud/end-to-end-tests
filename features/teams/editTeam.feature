@teams @e2eCore @stableTest @tasks_and_other
Feature: Set of tests to edit teams

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @editTeam
    Scenario Outline: As a user, I want to be able to edit a team
        Given <userRole> logs in with email '<userName>' and password '<password>'
        Then <userRole> goes to Teams Page
        And <userRole> sees that team with name '<teamName>' is visible on the list
        When <userRole> chooses team with name '<teamName>'
        And <userRole> clicks on Edit-team button
        And <userRole> changes name of Team '<changeName>'
        And <userRole> changes team description '<description>'
        And <userRole> chooses team colour '<colour>'
        And <userRole> clicks on Save-changes in team button
        And <userRole> goes to Teams Page
        Then <userRole> sees that team with name '<changeName>' is visible on the list
        And <userRole> should see that team name '<changeName>' with description correctly displayed '<description>'
        And <userRole> should see team with name '<changeName>' has colour '<colour>'
        Examples:
            | userRole | userName                        | password       | teamName   | colour | changeName | description |
            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | Musik      | green  | Sport      | I LIKE IT   |
