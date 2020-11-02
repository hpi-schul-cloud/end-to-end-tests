@news
Feature: Different options for news. I would like to test whether users with different permissions can see my news
    Background: I am logged in as a teacher and I create some news
        Given teacher arrives on the Schul-Cloud homepage


    @newsIsVisible
    Scenario Outline: User can see the news
        Given teacher logs in with email '<teacherEmail>' and password '<teacherPassword>'
        Given teacher accepts data protection
        When teacher creates some news which has to be published immediately
        And teacher logs out
        And student logs in with email '<studentUsername>' and password '<studentPassword>'
        And student with full age accepts student's data protection with password '<newStudentPassword>'
        And click left navigation item 'news'
        Then teacher can see the news

        Examples:
            | teacherEmail                | teacherPassword | studentUsername                | studentPassword | newStudentPassword  |
            | klara.fall@schul-cloud.org  | Schulcloud1!    | paula.meyer@schul-cloud.org    | Schulcloud1!    | Schulcloud1!!       |

    @newsIsNotVisible
    Scenario Outline: User  cannot see the news if the news is not due yet
        Given teacher logs in with email '<teacherEmail>' and password '<teacherPassword>'
        Given teacher accepts data protection
        When teacher creates some news which has to be published later
        And teacher logs out
        And student logs in with email '<studentUsername>' and password '<studentPassword>'
        And student with full age accepts student's data protection with password '<newStudentPassword>'
        And click left navigation item 'news'
        Then he cannot see the news which is not due yet

        Examples:
            | teacherEmail                | teacherPassword | studentUsername                | studentPassword | newStudentPassword  |
            | klara.fall@schul-cloud.org  | Schulcloud1!    | paula.meyer@schul-cloud.org    | Schulcloud1!    | Schulcloud1!!       |
