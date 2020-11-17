@task @submitTask
Feature: Set of tests to submit tasks

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @submitTaskWithTextContent
    Scenario Outline: As a user, I want to be able to submit a task and teacher evaluates it
        Given <userRole> logs in
        And <userRole> performs first login actions: data protection acceptance
        And <userRole> goes to courses page
        And <userRole> creates course with name '<courseName>' and student '<studentFullName>'
        When <userRole> clicks Create-a-task button in the course '<courseName>'
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
            | userRole | courseName                        | taskName | studentUserName             | password     | studentFullName | taskBody         | taskRating | taskRemark |
            | teacher  | course with a task for submission | task     | paula.meyer@schul-cloud.org | Schulcloud1! | Paula Meyer     | text of the task | 96         | good job   |
