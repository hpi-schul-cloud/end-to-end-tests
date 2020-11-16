@task
@taskWithCourse
Feature: create different types of task

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createTaskInTheCourse
	Scenario Outline: As a user, I want to be able to create a simple task
		When <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		When <userRole> creates course with name '<courseName>'
		And <userRole> clicks Create-a-new-task-button in the course '<courseName>'
		And <userRole> puts taskname '<taskName>' into name field
		And <userRole> clicks on Enable-group-submission checkbox
		And <userRole> sets accomplish time for the task
		And <userRole> puts taskBody '<taskBody>' into body field
		And <userRole> clicks submit-task-button
		When <userRole> goes to tasks page
		Then <userRole> sees that task with name '<taskName>' is visible on the list
		Examples:
			| userRole | courseName             | taskName     | taskBody         |
			| teacher  | new course with a task | task example | text of the task |

	@createPrivateTaskInTheCourse
	Scenario Outline: As a user, I want to be able to create a private task
		When <userRole> creates course with name '<courseName>' and student '<studentName>'
		And <userRole> clicks Create-a-new-task-button in the course '<courseName>'
		And <userRole> puts taskname '<taskName>' into name field
		And <userRole> sets accomplish time for the task
		And <userRole> puts taskBody '<taskBody>' into body field
		And <userRole> clicks on Private-task checkbox
		And <userRole> clicks submit-task-button on task-creation-form
		When <userRole> goes to tasks page
		Then <userRole> sees that task with name '<taskName>' is visible on the list
		And <userRole> logs out
		And student logs in with email '<username>' and password '<password>'
		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
		And student goes to tasks page
		Then student sees that task with name '<taskName>' is not visible on the list
		Examples:
			| userRole | courseName            | studentName | taskName             | username                    | password     | newStudentPassword | taskBody  |
			| teacher  | test private hometask | Paula Meyer | private task example | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      | task body |

	@submitTextTask
	Scenario Outline: As a user, I want to be able to submit a task and teacher evaluates it
		When <userRole> creates course with name '<courseName>' and student '<studentName>'
		And <userRole> clicks Create-a-new-task-button in the course '<courseName>'
		And <userRole> puts taskname '<taskName>' into name field
		And <userRole> sets accomplish time for the task
		And <userRole> puts taskBody '<taskBody>' into body field
		And <userRole> clicks submit-task-button on task-creation-form
		When <userRole> goes to tasks page
		Then <userRole> sees that task with name '<taskName>' is visible on the list
		And <userRole> logs out
		And student logs in with email '<username>' and password '<password>'
		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
		And student goes to the tasks page
		And student clicks on task with name '<taskName>'
		And student submits solution for the task
		And student logs out
		When <userRole> logs in
		And <userRole> goes to tasks page
		And <userRole> clicks on task with name '<taskName>'
		Then <userRole> evaluates the task
		And <userRole> logs out
		And student logs in with email '<username>' and password '<newStudentPassword>'
		And student goes to the tasks page
		And student clicks on task with name '<taskName>'
		Then student should see the evaluation
		Examples:
			| userRole | courseName                        | taskName | username                    | password     | studentName | taskBody         | newStudentPassword |
			| teacher  | course with a task for submission | task     | paula.meyer@schul-cloud.org | Schulcloud1! | Paula Meyer | text of the task | Schulcloud1!!      |

#	@gradeTaskWithFile
#	Scenario Outline: As a user, I want to be able to grade a task submission by uploading a file
#		When <userRole> creates course with name '<courseName>' and student '<studentName>'
#		And <userRole> clicks Create-a-new-task-button in the course '<courseName>'
#		And <userRole> puts taskname '<taskName>' into name field
#		And <userRole> puts taskBody '<taskBody>' into body field
#		And <userRole> clicks submit-task-button
#		And <userRole> logs out
#		And student logs in with email '<username>' and password '<password>'
#		And student performs first login actions: data protection acceptance, password change '<newPasswordStudent>'
#		And student goes to tasks page
#		And student clicks on task with name '<taskName>'
#		And student submits solution for the task
#		And student logs out
#		When <userRole> logs in
#		And <userRole> goes to tasks page
#		And <userRole> clicks on task with name '<taskName>'
#		And <userRole> uploads file feedback
#		And <userRole> goes to evaluation tab
#		Then <userRole> can see the file evaluation
#		And <userRole> logs out
#		And student logs in with email '<username>' and password '<newPasswordStudent>'
#		And student goes to tasks page
#		And student clicks on task with name '<taskName>'
#		And student goes to task evaluation
#		Then student should see that file evaluation is visible
#		Examples:
#			| userRole | username                    | password     | newPasswordStudent | taskName              | studentName | courseName            | taskBody         |
#			| teacher  | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      | task with file upload | Paula Meyer | course with file task | text of the task |

	@showPrivateTaskOnDashboard
	Scenario Outline: As a user I want to be able to see private homework on dashboard
		When <userRole> creates course with name '<courseName>' and student '<studentName>'
		And <userRole> clicks Create-a-new-task-button in the course '<courseName>'
		And <userRole> puts taskname '<taskName>' into name field
		And <userRole> sets accomplish time for the task
		And <userRole> puts taskBody '<taskBody>' into body field
		And <userRole> clicks on Private-task checkbox
		And <userRole> clicks submit-task-button on task-creation-form
		And <userRole> goes to tasks page
		Then <userRole> sees that task with name '<taskName>' is visible on the list
		When <userRole> clicks left navigation item 'dashboard'
		Then <userRole> sees that Private tasks section is visible on dashboard
		Then <userRole> sees created private task with name '<taskName>'
		And <userRole> sees created private task with name '<taskName>' and course name '<courseName>'
		And <userRole> sees created private task with name '<taskName>' and timeout
		And <userRole> does not see number of completed on task with name '<taskName>'
		And <userRole> does not see number of graded on task with name '<taskName>'
		Examples:
			| userRole | courseName | studentName | taskName             | taskBody         |
			| teacher  | Math       | Paula Meyer | private task example | text of the task |

	@deleteTaskWithCourse
	Scenario Outline: create a simple hometask and then delete it
		When <userRole> creates course with name '<courseName>'
		And <userRole> clicks Create-a-new-task-button in the course '<courseName>'
		And <userRole> puts taskname '<taskName>' into name field
		And <userRole> clicks on Enable-group-submission checkbox
		And <userRole> sets accomplish time for the task
		And <userRole> puts taskBody '<taskBody>' into body field
		And <userRole> clicks submit-task-button
		When <userRole> goes to tasks page
		Then task with name '<taskName>' is visible on the list
        And <userRole> should click 'Delete' button for task with name '[<courseName>] - <taskName>'
		And <userRole> clicks on Delete task button
		Then task with name '<taskName>' is not visible on the list
		Examples:
			| userRole | courseName					| taskName	| taskBody			|
			| teacher  | test course with test task | test task	| text of test task |
