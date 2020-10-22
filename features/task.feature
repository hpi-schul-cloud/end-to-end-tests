@task

Feature: create different types of task


    Background: a teacher logs in and creates a course
        Given teacher arrives on the Schul-Cloud homepage
        And teacher logs in
        And teacher accepts data protection
        And teacher goes to courses page

    @createTaskForStudents
    Scenario Outline: create a simple hometask
        When teacher creates one course with name <coursename>
        And teacher clicks create-a-new-task-button in the course <coursename>
        And teacher pastes name <taskname> of the task
        And teacher clicks on "enable group submission" checkbox
        And teacher sets accomplish time for the task
        And teacher pastes text <taskText> of the task
        And teacher clicks submit-task-button
        When teacher goes to tasks page
        Then the hometask with <taskname> is to be found at the task pannel
        Examples:
            | coursename             | taskname     | taskText                          |
            | new course with a task | task example | here is some task for my students |

    @createPrivateTask
    Scenario Outline: create a private hometask has to be visible only for the teacher
        When teacher creates a course <coursename> and adds student <studentname> to this course
        When teacher creates a private hometask in the course <coursename> with the name <taskname>
        Then the task <taskname> should be visible for the teacher
        And teacher logs out 
        And student logs in with email <username> and password <password>
        And student with full age accepts student's data protection with password <newStudentPassword>
        And the student goes to the tasks section
        Then the student will not see this task with <taskname>
        Examples:
        | coursename            | studentname | taskname             | username                    | password     | newStudentPassword     |
        | test private hometask | Paula Meyer | private task example | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!          |

    #@submitTextHomework
    #Scenario Outline: pupil submits a task and teacher evaluates it
    #Given the teacher creates one course with <coursename> and student with <studentname>
    #Given teacher clicks "create a new home task" in the course <coursename> with <taskname>
    #When student with <username>, <password> of this course <coursename> goes to hometasks
    #When the student finds <taskname>
    #Then the student sees the task <taskname> on the dashboard and
    #When the student edits a text hometask and submits it
    #Then the teacher can see the submission in course <coursename> of task <taskname> done by student <studentname> and
    #Then teacher can evaluate the task <taskname>
    #Examples:
    #| coursename                        | firstname   | lastname | taskname   | username                     | password     | studentname  |
    #| course with a task for submission | Paula       | Meyer    | task       | paula.meyer@schul-cloud.org  | Schulcloud1! | Paula Meyer  |

    @gradeHomeworkWithFile
    Scenario Outline: grade a task submission by uploading a file
        Given the teacher creates one course with file feedback and student with Paula Meyer
        When the teacher has posed a task
        And teacher logs out
        And student logs in with email <username> and password <password>
        And student with full age accepts student's data protection with password <newPasswordStudent>
        And the student has submitted that task
        And the teacher uploads file feedback
        Then both the teacher and student can see and download the feedback
        Examples:
            | username                    | password     | newPasswordStudent |
            | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      |
