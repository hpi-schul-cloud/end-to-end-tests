@news @createNews @stableTest
Feature: Set of tests to create news. I would like to test whether users with different permissions can see my news

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createInstantNews @e2eCore
    Scenario Outline: As a user, I want to be able to create instant news with will be visible right after creation for recipients
        When <creatorUserRole> logs in with email '<email>' and password '<password>'
        When <creatorUserRole> creates news with title '<newsTitle>', content '<newsContent>' and current date
        And <creatorUserRole> logs out
        And <recipientUserRole> logs in with email '<studentUsername>' and password '<studentPassword>'
        And <recipientUserRole> clicks left navigation item 'news'
        Then <recipientUserRole> should see that news with title '<newsTitle>' is visible on the list
        Examples:
            | creatorUserRole | recipientUserRole | email                           | password       | studentUsername                  | studentPassword | newsTitle      | newsContent                               |
            | teacher         | student           | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa!  | School day off | Here are some announcements for my pupils |

    @createPostponedNews @extendedTest
    Scenario Outline: As a user, I want to be able to create prosponed news with should not be visible before given date
        When <creatorUserRole> logs in with email '<username>' and password '<password>'
        When <creatorUserRole> creates news with title '<newsTitle>', content '<newsContent>' and a one-year delay
        And <creatorUserRole> logs out
        And <recipientUserRole> logs in with email '<studentUsername>' and password '<studentPassword>'
        And <recipientUserRole> clicks left navigation item 'news'
        Then <recipientUserRole> should see that news with title '<newsTitle>' is not visible on the list
        Examples:
            | creatorUserRole | recipientUserRole | username                        | password       | studentUsername                  | studentPassword |  newsTitle     | newsContent                               |
            | teacher         | student           | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa!  | School day off | Here are some announcements for my pupils |
