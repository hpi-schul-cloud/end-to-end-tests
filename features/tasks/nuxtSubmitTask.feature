@task @nuxtTask @nuxtSubmitandCompleteTask @tasks_and_other
Feature: View the task in new nuxt task menu and submit it

    Background: User submits the opened tasks and view the tasks in completed tab
        Given user arrives on the Schul-Cloud homepage

    @nuxtSubmitAndViewTask
    Scenario Outline: As a user, I want to see the open tasks in new nuxt tab, sumbit them and see it will show at Complete task tab
        When <userRole> logs in
        And <userRole> clicks the current task tab
        And <userRole> clicks at task
        And <userRole> clicks on Submission tab
        And <userRole> sets submission text 'Test submission text'
        And <userRole> clicks on submit button
        And <userRole> clicks the current task tab
        And <userRole> clicks completed task tab
        Then <userRole> sees task in completed tab
        Examples:
			| userRole |
			| student  |
