@news
Feature: Different options for news. I would like to test whether users with different permissions can see my news
    Background: I am logged in as a teacher and I create some news
        Given teacher goes to the home page
        Given teacher is successfully logged-in

    @newsIsVisible
    Scenario Outline: User can see the news
        When teacher creats some news which has to be published immediately
        And log out
        And go from start page to login page
        And log in with <username> and <password>
        And the pupil should accept the data protection
        And he goes to the news page
        Then he can see the news

        Examples:
            | username                    | password     |
            | paula.meyer@schul-cloud.org | Schulcloud1! |

    @newsIsNotVisible
    Scenario Outline: User  cannot see the news if the news is not due yet
        When teacher creats some news which has to be published later
        And log out
        And go from start page to login page
        And log in with <username> and <password>
        And the pupil should accept the data protection
        And he goes to news page
        Then he cannot see the news which is not due yet

        Examples:
            | username                    | password     |
            | paula.meyer@schul-cloud.org | Schulcloud1! |


# @teamnews
# Scenario: teacher creates team news and this news can only be visible for team members
# When teacher creates two teams team and news for these teams
# Then team member can see the news
# Then team non-members cannot see the news
