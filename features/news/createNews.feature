@news @createNews
Feature: Set of tests to create news. I would like to test whether users with different permissions can see my news

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createInstantNews
    Scenario Outline: As a user, I want to be able to create instant news with will be visible right after creation for recipients
        When <creatorUserRole> logs in with email '<email>' and password '<password>'
        And <creatorUserRole> performs first login actions: data protection acceptance
        When <creatorUserRole> creates news with title '<newsTitle>', content '<newsContent>' and current date
        And <creatorUserRole> logs out
        And <recipientUserRole> logs in with email '<studentUsername>' and password '<studentPassword>'
        And <recipientUserRole> performs first login actions: data protection acceptance, password change '<newStudentPassword>'
        And <recipientUserRole> clicks left navigation item 'news'
        Then <recipientUserRole> should see that news with title '<newsTitle>' is visible on the list
        Examples:
            | creatorUserRole | recipientUserRole | email                      | password     | studentUsername             | studentPassword | newStudentPassword | newsTitle      | newsContent                               |
            | teacher         | student           | klara.fall@schul-cloud.org | Schulcloud1! | paula.meyer@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      | School day off | Here are some announcements for my pupils |

    @createPostponedNews
    Scenario Outline: As a user, I want to be able to create prosponed news with should not be visible before given date
        When <creatorUserRole> logs in with email '<username>' and password '<password>'
        And <creatorUserRole> performs first login actions: data protection acceptance
        When <creatorUserRole> creates news with title '<newsTitle>', content '<newsContent>' and a one-year delay
        And <creatorUserRole> logs out
        And <recipientUserRole> logs in with email '<studentUsername>' and password '<studentPassword>'
        And <recipientUserRole> performs first login actions: data protection acceptance, password change '<newStudentPassword>'
        And <recipientUserRole> clicks left navigation item 'news'
        Then <recipientUserRole> should see that news with title '<newsTitle>' is not visible on the list
        Examples:
            | creatorUserRole | recipientUserRole | username                   | password     | studentUsername             | studentPassword | newStudentPassword | newsTitle      | newsContent                               |
            | teacher         | student           | klara.fall@schul-cloud.org | Schulcloud1! | paula.meyer@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      | School day off | Here are some announcements for my pupils |
