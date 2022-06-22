#@task @submitTask @e2eCore @stableTest
#Feature: Set of tests to view and submit tasks

#    Background: User opens Schul-cloud homepage Website
#        Given user arrives on the Schul-Cloud homepage

#    @submitAndViewTask @tasks_and_other
#   Scenario Outline: As a user, I want to see the open tasks in tasks tab, sumbit them and check that it is shown at completed tasks tab
#      When <userRole> logs in
#       	And <userRole> goes to tasks page
#        And <userRole> clicks at task '<taskName>'
#        And <userRole> clicks on Submission tab
#        And <userRole> sets submission text 'Test submission text'
#        And <userRole> clicks on submit button
#       	And <userRole> goes to tasks page
#        And <userRole> clicks 'Completed' task tab
#        Then <userRole> sees '<taskName>' in the list
#        Examples:
#            | userRole | taskName |
#            | student  | Task11   |

#    @submitTaskWithTextContent @tasks_and_other
#	Scenario Outline: As a user, I want to be able to submit a task and teacher evaluates it
#		When <userRole> logs in
#		And <userRole> goes to rooms-overview
#		And <userRole> chooses course with name '<courseName>'
#		And <userRole> clicks Create-a-task button in the course '<courseName>'
#		And <userRole> sets task name '<taskName>' in task form
#		And <userRole> sets Task-visibility-start-date: today, 00:00
#		And <userRole> sets Task-processing-end-date: today +1 day, 11:00
#		And <userRole> sets task body '<taskBody>' in task form
#		And <userRole> clicks Add-task-submit button
#		And <userRole> goes to tasks page
		#And <userRole> filter by '<courseName>'
#		Then <userRole> sees '<taskName>' in the list
#		And <userRole> logs out
 #       And user arrives on the Schul-Cloud homepage
#		And student logs in with email '<studentUserName>' and password '<password>'
#		And student goes to tasks page
		#And student filter by '<courseName>'
#		And student clicks at task '<taskName>'
#		And student clicks on Submission tab
#		And student sets submission text 'Test submission text'
#		And student clicks Save-and-send submission button
#		And student logs out
#       And user arrives on the Schul-Cloud homepage
#		When <userRole> logs in
#		And <userRole> goes to tasks page
		#And <userRole> filter by '<courseName>'
#		And <userRole> clicks at task '<taskName>'
#		And <userRole> clicks on Submissions tab
#		And <userRole> clicks student submission contains '<studentFullName>'
#		And <userRole> clicks on Comment tab
#		And <userRole> grades task with rate '<taskRating>'% and remarks '<taskRemark>'
#		And <userRole> clicks Save-and-send grading button
#		And <userRole> logs out
#       And user arrives on the Schul-Cloud homepage
#		And student logs in with email '<studentUserName>' and password '<password>'
#		And student goes to tasks page
#		And student clicks 'Completed' task tab
		#And student filter by '<courseName>'
#		And student clicks at task '<taskName>'
#		And student clicks on Comment-Grading tab
#		Then student should see that task rating is '<taskRating>'%
#		And student should see that task remark is '<taskRemark>'
#		Examples:
#			| userRole | courseName | taskName | studentUserName                   | password       | studentFullName | taskBody         | taskRating | taskRemark |
#			| teacher  | German     | task     | amelia.strobl.qa@schul-cloud.org  | Schulcloud1qa! | Amelia Strobl   | text of the task | 96         | good job   |
