@homework

Feature: create different types of homework


    Background: a teacher logs in and creates a course
        Given teacher arrives on the Schul-Cloud homepage
        And teacher logs in
        And teacher accepts data protection
        And teacher goes to courses page


    @createSimpleHomework
    Scenario Outline: create a simple hometask
        When teacher creates course with name '<coursename>'
        And teacher clicks "create a new home task" in course '<coursename>' with '<taskname>'
        Then teacher should see that hometask with '<taskname>' is to be found at task pannel
        Examples:
            | coursename    | taskname     |
            | test hometask | task example |

    @createPrivateHomework
    Scenario Outline: create a private hometask has to be visible only for the teacher
        Given teacher creates course with name '<coursename>' and student '<studentname>'
        When teacher creates a private hometask in course '<coursename>' with '<taskname>'
        And student logs in with email '<username>' and password '<password>'
        And student with full age accepts student's data protection with password '<newStudentPassword>'
        Then student will not see this task with '<taskname>'
        Examples:
            | coursename            | studentname | taskname             | username                    | password     | newStudentPassword |
            | test private hometask | Paula Meyer | private task example | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      |

    #@submitTextHomework
    #Scenario Outline: pupil submits a homework and teacher evaluates it
        #Given teacher creates course with name '<coursename>' and student '<studentname>'
        #Given teacher clicks "create a new home task" in course '<coursename>' with '<taskname>'
        #When student with '<username>',  '<password>' of this course '<coursename>' goes to hometasks
        #When student finds task with name '<taskname>'
        #When student edits a text hometask and submits it
        #When student logs out
        #Then teacher can see submission in course '<coursename>' of task '<taskname>' done by student '<studentname>'
        #Then teacher can evaluate task '<taskname>'
        #Examples:
            #| coursename                        | firstname | lastname | taskname | username                    | password     | studentname |
            #| course with a task for submission | Paula     | Meyer    | task     | paula.meyer@schul-cloud.org | Schulcloud1! | Paula Meyer |

    @gradeHomeworkWithFile
    Scenario Outline: grade a homework submission by uploading a file
        Given teacher creates course with name 'file feedback' and student 'Paula Meyer'
        When teacher has posed a homework
        And teacher logs out
        And student logs in with email '<username>' and password '<password>'
        And student with full age accepts student's data protection with password '<newPasswordStudent>'
        And student has submitted that homework
        And teacher uploads file feedback
        Then teacher and student can see and download feedback
        Examples:
            | username                    | password     | newPasswordStudent |
            | paula.meyer@schul-cloud.org | Schulcloud1! | Schulcloud1!!      |
