@editTask
Feature: Editing a task and save or discard

    Background: user is logged in on the Schul-Cloud homepage
        Given user arrives on the Schul-Cloud homepage

    Scenario Outline: The user logs in as a teacher and edits an existing task
        Given <userRole> logs in with email '<teacherUsername>' and password '<teacherPassword>'
        And <userRole> performs first login actions: data protection acceptance
        And <userRole> goes to tasks page
        When <userRole> clicks 'Edit' button for task with name '<taskName>'
        And <userRole> sets task name '<newTaskname>' in task form
        And <userRole> sets task body '<newTaskbody>' in task form
        And <userRole> chooses task courses 'No assignment'
        And <userRole> clicks on Enable-group-submission checkbox
        And <userRole> sets Task-visibility-start-date: today, 00:00
        And <userRole> sets Task-processing-end-date: today +1 day, 11:00
        And <userRole> clicks on Private-task checkbox
        And <userRole> clicks on Student-submissions-visible-to-each-other checkbox
        And <userRole> clicks Add-task-submit button
        And <userRole> goes to tasks page
        Then <userRole> should see that new task with name '<newTaskname>' is visible on the list
        And <userRole> should see that new task body is '<newTaskbody>'
        Examples:
            | userRole | teacherUsername        | teacherPassword | taskName                                          | newTaskname                | newTaskbody  |
            | teacher  | lehrer@schul-cloud.org | Schulcloud1!    | Aufgabe an Marla (Mathe) - mit Abgabe & Bewertung | Aufgabe an Marla (Algebra) | Calculate |
