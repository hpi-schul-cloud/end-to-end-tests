@task @nuxtTask @nuxtSubmitandCompleteTask
Feature: View the task in new nuxt task menu and submit it

    Background: User submit the opened tasks and view the tasks in completed tab
        Given user arrives on the Schul-Cloud homepage

    @nuxtSubmitAndViewTask @e2eCore
    Scenario Outline: As a user, I want to see the open tasks in new nuxt tab, sumbit them and see it will show at Complete task tab
        When <userRole> logs in
        And <userRole> clicks the current task tab
        And <userRole> clicks on without duedate task section
        And <userRole> clicks task
        And <userRole> clicks on Submission tab
        And <userRole> sets submission text 'Test submission text'
        And <userRole> clicks on submit button
        And <userRole> clicks the current task tab
        And <userRole> clicks completed task tab
        Then <userRole> clicks at ungraded task
        Examples:
			| userRole |
			| student  |