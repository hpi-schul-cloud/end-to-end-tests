@teams @e2eCore @stableTest @tasks_and_other
Feature: Set of tests to delete teams

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @deleteTeam
    Scenario Outline: As a user, I want to be able to delete a team
        Given <userRole> logs in with email '<userName>' and password '<password>'
        Then <userRole> goes to Teams Page
        And <userRole> sees that team with name '<teamName>' is visible on the list
        When <userRole> chooses team with name '<teamName>'
        And <userRole> clicks on Delete-team button
        Then <userRole> sees that team with name '<teamName>' is not visible on the list
        Examples:
            | userRole | userName                        | password       | teamName   |
            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | Musik      |
