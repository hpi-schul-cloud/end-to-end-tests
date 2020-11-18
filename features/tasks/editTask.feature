@task @editTask
Feature: Set of tests to edit tasks

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @editSimpleTask
    Scenario Outline: As a user, I want to be able to edit an existing task without any course assigned
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> performs first login actions: data protection acceptance
        And <userRole> goes to tasks page
        When <userRole> clicks on 'Edit' button for task with name '<taskName>'
        And <userRole> sets task name '<newTaskName>' in task form
        And <userRole> sets task body '<newTaskBody>' in task form
        And <userRole> chooses task courses 'No assignment'
        And <userRole> clicks on Enable-group-submission checkbox
        And <userRole> sets Task-visibility-start-date: today, 00:00
        And <userRole> sets Task-processing-end-date: today +1 day, 11:00
        And <userRole> clicks on Private-task checkbox
        And <userRole> clicks on Student-submissions-visible-to-each-other checkbox
        And <userRole> clicks Add-task-submit button
        And <userRole> goes to tasks page
        Then <userRole> should see that new task with name '<newTaskName>' is visible on the list
        And <userRole> should see that new task body is '<newTaskBody>'
        Examples:
            | userRole | username               | password     | taskName                                          | newTaskName                | newTaskBody |
            | teacher  | lehrer@schul-cloud.org | Schulcloud1! | Aufgabe an Marla (Mathe) - mit Abgabe & Bewertung | Aufgabe an Marla (Algebra) | Calculate   |

