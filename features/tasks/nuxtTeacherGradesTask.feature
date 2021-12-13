@task @nuxtTask @teachertest
Feature: View the tasks in new nuxt task menu and grade it

    Background: Student logs in and submit the task, after that teacher logs in and grade the task and view that the graded column increments
        Given user arrives on the Schul-Cloud homepage

    @nuxtStudentSubmitsTask
    Scenario Outline: As a student, I want to see the open tasks in new nuxt tab and sumbit them
        When <userRole> logs in
        And <userRole> clicks the current task tab
        And <userRole> clicks at task '<taskName>'
        And <userRole> clicks on Submission tab
        And <userRole> sets submission text 'Test submission text'
        Then <userRole> clicks on submit button
        Examples:
            | userRole | taskName |
            | student  | Task11   |

    @nuxtTeacherGradeAndViewTask @noDBReset
    Scenario Outline: As a teacher, I want to see the tasks in new nuxt tab, grade them and see it will show at graded task column for that task
        When <userRole> logs in
        And <userRole> clicks the current task tab
        And <userRole> clicks at task '<taskName>'
        And <userRole> clicks on student submitted the task
        And <userRole> clicks on Comment tab
        And <userRole> grades task with rate '<taskRating>'% and remarks '<taskRemark>'
        And <userRole> clicks Save-and-send grading button
        And <userRole> clicks the current task tab
        Then <userRole> sees that the task is graded
        Examples:
            | userRole | taskRating | taskRemark | taskName |
            | teacher  | 95         | good job   | Task11   |
