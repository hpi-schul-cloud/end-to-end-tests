@task
@taskWithCourse
Feature: create different types of task

	Background: a teacher logs in and creates a course
		Given teacher arrives on the Schul-Cloud homepage
		And teacher logs in
		And teacher performs first login actions: data protection acceptance
		And teacher goes to courses page

	@createTaskInTheCourse
	Scenario Outline: create a simple hometask
		When teacher creates course with name '<courseName>'
		And teacher clicks Create-a-new-task-button in the course '<courseName>'
		And teacher puts taskname '<taskName>' into name field
		And teacher clicks on Enable-group-submission checkbox
		And teacher sets accomplish time for the task
		And teacher puts taskBody '<taskBody>' into body field
		And teacher clicks submit-task-button
		When teacher goes to tasks page
		Then task with name '<taskName>' is visible on the list
		Examples:
			| courseName             | taskName     | taskBody         |
			| new course with a task | task example | text of the task |

	@createPrivateTaskInTheCourse
	Scenario Outline: create a private hometask has to be visible only for the teacher
		When teacher creates course with name '<courseName>' and student '<studentName>'
		And teacher clicks Create-a-new-task-button in the course '<courseName>'
		And teacher puts taskname '<taskName>' into name field
		And teacher sets accomplish time for the task
		And teacher puts taskBody '<taskBody>' into body field
		And teacher clicks on Private-task checkbox
		And teacher clicks submit-task-button on task-creation-form
		When teacher goes to tasks page
		Then task with name '<taskName>' is visible on the list
		And teacher logs out
		And student logs in with email '<username>' and password '<password>'
		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
		And student goes to tasks page
		Then task with name '<taskName>' is not visible on the list
		Examples:
			| courseName            | studentName | taskName             | username                    | password     | newStudentPassword | taskBody  |
			| test private hometask | Paula Meyer | private task example | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      | task body |

	@submitTextTask
	Scenario Outline: pupil submits a task and teacher evaluates it
		Given teacher creates course with name '<courseName>' and student '<studentName>'
		Given teacher clicks Create-a-new-task-button in the course '<courseName>'
		And teacher puts taskname '<taskName>' into name field
		And teacher sets accomplish time for the task
		And teacher puts taskBody '<taskBody>' into body field
		And teacher clicks submit-task-button on task-creation-form
		When teacher goes to tasks page
		Then task with name '<taskName>' is visible on the list
		And teacher logs out
		And student logs in with email '<username>' and password '<password>'
		And student performs first login actions: data protection acceptance, password change '<newStudentPassword>'
		And the student goes to the tasks page
		And student clicks on task with name '<taskName>'
		And student submits solution for the task
		And student logs out
		When teacher logs in
		And teacher goes to tasks page
		And teacher clicks on task with name '<taskName>'
		Then teacher evaluates the task
		And teacher logs out
		And student logs in with email '<username>' and password '<newStudentPassword>'
		And the student goes to the tasks page
		And student clicks on task with name '<taskName>'
		Then student should see the evaluation
		Examples:
			| courseName                        | taskName | username                    | password     | studentName | taskBody         | newStudentPassword |
			| course with a task for submission | task     | paula.meyer@schul-cloud.org | Schulcloud1! | Paula Meyer | text of the task | Schulcloud1!!      |

    #@gradeTaskWithFile
    #Scenario Outline: grade a task submission by uploading a file
        #When teacher creates course with name '<courseName>' and student '<studentName>'
        #And teacher clicks Create-a-new-task-button in the course '<courseName>'
        #And teacher puts taskname '<taskName>' into name field
        #And teacher puts taskBody '<taskBody>' into body field
        #And teacher clicks submit-task-button
        #And teacher logs out
        #And student logs in with email '<username>' and password '<password>'
        #And student performs first login actions: data protection acceptance, password change '<newPasswordStudent>'
        #And student goes to tasks page
        #And student clicks on task with name '<taskName>'
        #And student submits solution for the task
        #And student logs out
        #When teacher logs in
        #And teacher goes to tasks page
        #And teacher clicks on task with name '<taskName>'
        #And the teacher uploads file feedback
        #And teacher goes to evaluation tab
        #Then teacher can see the file evaluation
        #And teacher logs out
        #And student logs in with email '<username>' and password '<newPasswordStudent>'
        #And student goes to tasks page
        #And student clicks on task with name '<taskName>'
        #And student goes to task evaluation
        #Then student should see that file evaluation is visible

        #Examples:
            #| username                    | password     | newPasswordStudent | taskName              | studentName | courseName            |taskBody          |
            #| paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      | task with file upload | Paula Meyer | course with file task |text of the task  |

	@showPrivateTaskOnDashboard
	Scenario Outline: As a teacher I want to be able to see private homework on dashboard
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
