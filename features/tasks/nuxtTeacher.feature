@task @nuxtTask @nuxtSubmitandGradeTask
Feature: View the tasks in new nuxt task menu and grade it

    Background: User submits the opened tasks and view the tasks in completed tab
        Given user arrives on the Schul-Cloud homepage

    @nuxtGradeAndViewTask
    Scenario Outline: As a user, I want to see the open tasks in new nuxt tab, sumbit them
        When <userRole> logs in
        And <userRole> clicks the current task tab
        And <userRole> clicks on without duedate task section
        And <userRole> clicks task Task19
        And <userRole> clicks on Submission tab
        And <userRole> sets submission text 'Test submission text'
        Then <userRole> clicks on submit button
        Examples:
			| userRole |
			| student  |

    @nuxtGradeAndViewTask @noDBReset
    Scenario Outline: As a user, I want to see the tasks in new nuxt tab, grade them and see it will show at graded task column
        When <userRole> logs in
        And <userRole> clicks the current task tab
        And <userRole> clicks on without duedate task section
        And <userRole> clicks task Task19
        And <userRole> clicks on student submitted the task
        And <userRole> clicks on Comment tab
		And <userRole> grades task with rate '<taskRating>'% and remarks '<taskRemark>'
		And <userRole> clicks Save-and-send grading button
        And <userRole> clicks the current task tab
        And <userRole> clicks on without duedate task section
        Then <userRole> student graded for Task19
        Examples:
			| userRole |taskRating|taskRemark|
			| teacher  |95        |good job  |
