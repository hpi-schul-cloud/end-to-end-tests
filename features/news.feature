@news
Feature: Different options for news. I would like to test whether users with different permissions can see my news

	Background: I am logged in as a teacher and I create news
		Given teacher arrives on the Schul-Cloud homepage

    @newsIsVisible
    Scenario Outline: User can see the news
        Given teacher logs in with email '<teacherEmail>' and password '<teacherPassword>'
        And teacher performs first login actions: data protection acceptance
        When teacher creates news with title '<newsTitle>', content '<newsContent>' and current date
        And teacher logs out
        And student logs in with email '<studentUsername>' and password '<studentPassword>'
        And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
        And click left navigation item 'news'
        Then teacher should see that news with title '<newsTitle>' is visible on the list

        Examples:
            | teacherEmail               | teacherPassword | studentUsername             | studentPassword | newStudentPassword | newsTitle      | newsContent                               |
            | klara.fall@schul-cloud.org | Schulcloud1!    | paula.meyer@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      | School day off | Here are some announcements for my pupils |

    @newsIsNotVisible
    Scenario Outline: User  cannot see the news if the news is not due yet
        Given teacher logs in with email '<teacherEmail>' and password '<teacherPassword>'
        And teacher performs first login actions: data protection acceptance
        When teacher creates news with title '<newsTitle>', content '<newsContent>' and a one-year delay
        And teacher logs out
        And student logs in with email '<studentUsername>' and password '<studentPassword>'
        And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
        And click left navigation item 'news'
        Then student should see that news with title '<newsTitle>' is not visible on the list

        Examples:
            | teacherEmail               | teacherPassword | studentUsername             | studentPassword | newStudentPassword | newsTitle      | newsContent                               |
            | klara.fall@schul-cloud.org | Schulcloud1!    | paula.meyer@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      | School day off | Here are some announcements for my pupils |
