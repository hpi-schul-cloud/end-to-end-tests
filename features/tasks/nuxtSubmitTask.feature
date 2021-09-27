@task @nuxtTask @nuxtSubmitandCompleteTask
Feature: View the task in new nuxt task menu and submit it

    Background: User submit the opened tasks and view the tasks in completed tab
        Given user arrives on the Schul-Cloud homepage

    @nuxtSubmitAndViewTask
    Scenario Outline: As a user, I want to see the open tasks in new nuxt tab, sumbit them and see it will show at Complete task tab
        When <userRole> logs in
        And <userRole> clicks the current task tab
        And <userRole> clicks on without duedate task section
        And <userRole> clicks task Task19
        And <userRole> clicks on Submission tab
        And <userRole> sets submission text 'Test submission text'
        And <userRole> clicks on submit button
        And <userRole> clicks the current task tab
        And <userRole> clicks completed task tab
        And <userRole> clicks at ungraded task section
        Then <userRole> clicks at Task 19
        Examples:
			| userRole |
			| student  |