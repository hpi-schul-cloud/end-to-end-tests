Feature: Different options for news. I would like to test whether users with different permissions can see my news

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createInstantNews
	Scenario Outline: As a user, I want to be able to see the news
		When <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> creates news with title '<newsTitle>', content '<newsContent>' and current date
		And <userRole> logs out
		And student logs in with email '<studentUsername>' and password '<studentPassword>'
		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
		And student clicks left navigation item 'news'
		Then student should see that news with title '<newsTitle>' is visible on the list
		Examples:
			| userRole | email                      | password     | studentUsername             | studentPassword | newStudentPassword | newsTitle      | newsContent                               |
			| teacher  | klara.fall@schul-cloud.org | Schulcloud1! | paula.meyer@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      | School day off | Here are some announcements for my pupils |

	@createPostponedNews
	Scenario Outline: As a user, I want to be able to not see the news if the news is not due yet
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> creates news with title '<newsTitle>', content '<newsContent>' and a one-year delay
		And <userRole> logs out
		And student logs in with email '<studentUsername>' and password '<studentPassword>'
		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
		And student clicks left navigation item 'news'
		Then student should see that news with title '<newsTitle>' is not visible on the list
		Examples:
			| userRole | username                   | password     | studentUsername             | studentPassword | newStudentPassword | newsTitle      | newsContent                               |
			| teacher  | klara.fall@schul-cloud.org | Schulcloud1! | paula.meyer@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      | School day off | Here are some announcements for my pupils |
