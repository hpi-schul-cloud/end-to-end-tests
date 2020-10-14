@editTask
Feature: Editing a task as a teacher and save or discard

    Background: teacher is logged in on the Schul-Cloud homepage
    
    Given teacher arrives on the Schul-Cloud homepage

    Scenario Outline: The user logs in as a teacher and edits an existing task
    Given teacher arrives on the Schul-Cloud homepage
    When teacher logs in with email <teacherUsername> and password <teacherPassword>
	And teacher accepts data protection
	Then he should click the task-button in the dashboard-sidebar
    And teacher should click the edit-task-button
    Then teacher should change the taskname to <taskname> in the name field
    And teacher should change the taskbody to <taskbody> in the taskbody field
    And teacher should change the course to Keine Zuordnung in the dropdown
    And teacher should toggle the allow groupwork checkbox
    And teacher should change the begin and due date
    And teacher should toggle the private task checkbox
    And teacher should toggle the public submissions checkbox
    Then teacher should save the changes by clicking on the save-button
    Then teacher goes to the tasks page 
    Then teacher checks if the new taskname is <taskname>
    And teacher checks if the new taskbody is <taskbody>

    Examples:
    | teacherUsername             | teacherPassword   | tasknameOld                                       | taskname                   | taskbody                 |
    | lehrer@schul-cloud.org      | Schulcloud1!      | Aufgabe an Marla (Mathe) - mit Abgabe & Bewertung | Aufgabe an Marla (Algebra) | Calculate                |