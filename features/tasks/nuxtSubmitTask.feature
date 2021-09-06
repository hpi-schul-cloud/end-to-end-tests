@task @nuxtTask @nuxtSubmitandCompleteTask
Feature: View the task in new nuxt task menu and submit it

    Background: User submit the opened tasks and view the tasks in completed tab
        Given user arrives on the Schul-Cloud homepage

    @nuxtSubmitAndViewTask @e2eCore
    Scenario Outline: As a user, I want to see the open tasks in new nuxt tab, sumbit them and see it will show at Complete task tab
        When <userRole> logs in
        And clicks the current task tab
        And click on without duedate task section
        And click to the task
        Then click to the Abgabe tab
        And sets submission text 'Test submission text'
        And click on submit button
        And click again to current task in side navigation menu
        And click to the completed task tab
        Then click at ungraded task
        Examples:
			| userRole |
			| student  |