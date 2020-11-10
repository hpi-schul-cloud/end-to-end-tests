@task
Feature: create different types of task

	Background: a teacher logs in and creates a course
		Given user arrives on the Schul-Cloud homepage

	@createTaskInTheCourse
	Scenario Outline: create a simple hometask
		Given <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		When <userRole> creates course with name '<courseName>'
		And <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> clicks on Enable-group-submission checkbox
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		Then <userRole> should see that task with name '<taskName>' is visible on the list
		Examples:
			| userRole | courseName             | taskName     | taskBody         |
			| teacher  | new course with a task | task example | text of the task |

	@createPrivateTaskInTheCourse
	Scenario Outline: create a private hometask has to be visible only for the teacher
		Given <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		When <userRole> creates course with name '<courseName>' and student '<studentName>'
		And <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> clicks on Private-task checkbox
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		Then <userRole> should see that task with name '<taskName>' is visible on the list
		When <userRole> logs out
		And student logs in with email '<studentUsername>' and password '<studentPassword>'
		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
		And student goes to tasks page
		Then student should see that task with name '<taskName>' is not visible on the list
		Examples:
			| userRole | courseName            | studentName | taskName             | studentUsername             | studentPassword | newStudentPassword | taskBody  |
			| teacher  | test private hometask | Paula Meyer | private task example | paula.meyer@schul-cloud.org | Schulcloud1!    | Schulcloud1!!      | task body |

	@submitTextTask
	Scenario Outline: pupil submits a task and teacher evaluates it
		Given <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		And <userRole> creates course with name '<courseName>' and student '<studentFullName>'
		And <userRole> clicks Create-a-task button in the course '<courseName>'
		And <userRole> sets task name '<taskName>' in task form
		And <userRole> sets Task-visibility-start-date: today, 00:00
		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
		And <userRole> sets task body '<taskBody>' in task form
		And <userRole> clicks Add-task-submit button
		And <userRole> goes to tasks page
		And <userRole> sees that task with name '<taskName>' is visible on the list
		And <userRole> logs out
		And student logs in with email '<studentUserName>' and password '<password>'
		And student performs first login actions: data protection acceptance, password change '<password>'
		And student goes to tasks page
		And student clicks on task with name '<taskName>'
		And student clicks on Submission tab
		And student sets submission text 'Test submission text'
		And student clicks Save-and-send submission button
		And student logs out
		When <userRole> logs in
		And <userRole> goes to tasks page
		And <userRole> clicks on task with name '<taskName>'
		And <userRole> clicks on Submissions tab
		And <userRole> clicks student submission contains '<studentFullName>'
		And <userRole> clicks on Comment tab
		And <userRole> grades task with rate '<taskRating>'% and remarks '<taskRemark>'
		And <userRole> clicks Save-and-send grading button
		And <userRole> logs out
		And student logs in with email '<studentUserName>' and password '<password>'
		And student goes to tasks page
		And student clicks on task with name '<taskName>'
		And student clicks on Comment-Grading tab
		Then student should see that task rating is '<taskRating>'% 
		And student should see that task remark is '<taskRemark>'
		Examples:
			| userRole | courseName                        | taskName | studentUserName             | password     | studentFullName | taskBody         |taskRating|taskRemark|
			| teacher  | course with a task for submission | task     | paula.meyer@schul-cloud.org | Schulcloud1! | Paula Meyer     | text of the task |96|good job|

#@gradeTaskWithFile
#Scenario Outline: grade a task submission by uploading a file
#Given <userRole> logs in
#And <userRole> performs first login actions: data protection acceptance
#And <userRole> goes to courses page
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
