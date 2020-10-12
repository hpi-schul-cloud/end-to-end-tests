@editTask
Feature: Editing a task as a teacher and save or discard

    Background: teacher is logged in on the Schul-Cloud homepage
    
    Given teacher arrives on the Schul-Cloud homepage

    Scenario Outline: The user logs in as a teacher and edits an existing task
    When teacher arrives on the Schul-Cloud homepage
    Given teacher logs in with email <teacherUsername> and password <teacherPassword>
	Given teacher accepts data protection
	Then he should click the task-button in the dashboard-sidebar
    Then he should click the edit-task-button
    Then he should change the taskname to <taskname> in the name field
    Then he should change the taskbody to <taskbody> in the taskbody field
    Then he should change the course to Keine Zuordnung in the dropdown
    Then he should toggle the allow groupwork checkbox
    Then he should change the begin and due date
    Then he should toggle the private task checkbox
    Then he should toggle the public submissions checkbox
    Then he should save the changes by clicking on the save-button
    Then he goes to the tasks page 
    Then he checks if the new taskname is <taskname>
    Then he checks if the new taskbody is <taskbody>

    Examples:
    | teacherUsername             | teacherPassword   | tasknameOld                                       | taskname                   | taskbody                 |
    | lehrer@schul-cloud.org      | Schulcloud1!      | Aufgabe an Marla (Mathe) - mit Abgabe & Bewertung | Aufgabe an Marla (Algebra) | Calculate                |
