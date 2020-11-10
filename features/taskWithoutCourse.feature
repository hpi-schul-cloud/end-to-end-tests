@task
@taskWithoutCourse
Feature: Editing and deleting a task as a teacher and save or discard

    Background: teacher is logged in on the Schul-Cloud homepage
        Given user arrives on the Schul-Cloud homepage

@editTask
    Scenario Outline: The user logs in as a teacher and edits an existing task
        When teacher logs in with email '<teacherUsername>' and password '<teacherPassword>'
        And teacher performs first login actions: data protection acceptance
        And teacher goes to tasks page
        And teacher should click 'Edit' button for task with name '<taskname>'
        Then teacher should change the taskname to '<newTaskname>' in the name field
        And teacher should change the taskbody to '<taskbody>' in the taskbody field
        And teacher should change the course to Keine Zuordnung in the dropdown
        And teacher should toggle the allow groupwork checkbox
        And teacher should change the begin and due date
        And teacher should toggle the private task checkbox
        And teacher should toggle the public submissions checkbox
        Then teacher should save the changes by clicking on the save-button
        Then teacher goes to the tasks page
        Then teacher checks if the new taskname is '<newTaskname>'
        And teacher checks if the new taskbody is '<taskbody>'

        Examples:
            | teacherUsername        | teacherPassword | taskname                                          | newTaskname                | taskbody  |
            | lehrer@schul-cloud.org | Schulcloud1!    | Aufgabe an Marla (Mathe) - mit Abgabe & Bewertung | Aufgabe an Marla (Algebra) | Calculate |

@deleteTask
    Scenario Outline: The user logs in as a teacher and deletes an existing task
        When teacher logs in with email '<teacherUsername>' and password '<teacherPassword>'
        And teacher performs first login actions: data protection acceptance
        And teacher goes to tasks page
        And teacher should click 'Delete' button for task with name '<taskname>'
		And teacher clicks on Delete task button
		Then task with name '<taskname>' is not visible on the list

        Examples:
            | teacherUsername        | teacherPassword | taskname                                          |
            | lehrer@schul-cloud.org | Schulcloud1!    | Aufgabe an Marla (Mathe) - mit Abgabe & Bewertung |
