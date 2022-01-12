@task @gradeTask @tasks_and_other
Feature: Set of tests to submit and grade tasks

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

    @studentSubmitsTask @stableTest
    Scenario Outline: As a student, I want to see the open tasks in in tasks tab and sumbit them
        When <userRole> logs in
        And <userRole> goes to tasks page
        And <userRole> clicks at task '<taskName>'
        And <userRole> clicks on Submission tab
        And <userRole> sets submission text 'Test submission text'
        Then <userRole> clicks on submit button
        Examples:
            | userRole | taskName |
            | student  | Task11   |

    @teacherGradesAndViewsTask @noDBReset @unstableTest
    Scenario Outline: As a teacher, I want to see the task in tasks tab, grade it and check that it is shown at graded tasks tab
        When <userRole> logs in
        And <userRole> goes to tasks page
        And <userRole> clicks at task '<taskName>'
        And <userRole> clicks on student submitted the task
        And <userRole> clicks on Comment tab
        And <userRole> grades task with rate '<taskRating>'% and remarks '<taskRemark>'
        And <userRole> clicks Save-and-send grading button
        And <userRole> goes to tasks page
        Then <userRole> sees that the task is graded
        Examples:
            | userRole | taskRating | taskRemark | taskName |
            | teacher  | 95         | good job   | Task11   |

	#@gradeTaskWithFile
	#Scenario Outline: As a user, I want to be able to grade a task submission by uploading a file
	#When <userRole> logs in
	#And <userRole> performs first login actions: data protection acceptance
	#And <userRole> goes to rooms-overview
	#When <userRole> creates course with name '<courseName>' and student '<studentName>'
	#And <userRole> clicks Create-a-task button in the course '<courseName>'
	#And <userRole> sets task name '<taskName>' in task form
	#And <userRole> sets task body '<taskBody>' in task form
	#And <userRole> clicks Add-task-submit button
	#And <userRole> logs out
	#And student logs in with email '<userName>' and password '<password>'
	#And student performs first login actions: data protection acceptance, password change '<newPasswordStudent>'
	#And student goes to tasks page
	#And student clicks on task with name '<taskName>'
	#And student clicks on Submission tab
	#And student sets submission text 'Test submission text'
	#And student clicks Save-and-send submission button
	#And student logs out
	#When <userRole> logs in
	#And <userRole> goes to tasks page
	#And <userRole> clicks on task with name '<taskName>'
	#And <userRole> uploads file feedback
	#And <userRole> goes to evaluation tab
	#Then <userRole> can see the file evaluation
	#And <userRole> logs out
	#And student logs in with email '<userName>' and password '<newPasswordStudent>'
	#And student goes to tasks page
	#And student clicks on task with name '<taskName>'
	#And student clicks on Comment-Grading tab
	#Then student should see that file evaluation is visible
	#Examples:
	#|userRole| userName                    | password     | newPasswordStudent | taskName              | studentName | courseName            |taskBody          |
	#|teacher | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      | task with file upload | Paula Meyer | course with file task |text of the task  |
