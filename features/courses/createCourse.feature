@courses @createCourse
Feature: Set of tests to create courses

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createSimpleCourse
    Scenario Outline: As a user, I want to be able to create first course
        Given <userRole> logs in with email '<userName>' and password '<password>'
        And <userRole> goes to courses page
        When <userRole> clicks Create-new-course button
        And <userRole> enters course name '<courseName>' into new course form
        #And <userRole> sees his.hers name is entered by default in teachers' field
        And <userRole> chooses course colour '<courseColour>'
        And <userRole> clicks Next-section button
        And <userRole> clicks Next-section button
        And <userRole> clicks Go-to-course-list button
        Then <userRole> should see that course with name '<courseName>' is visible on the list
        Examples:
            | userRole | userName                        | password       | courseName | courseColour |
            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | Ballet     | corn         |

    @createCourseCorrectly
    Scenario Outline: As a user, I want to be able to submit compulsory fields by creating the course
        Given <userRole> logs in with email '<userName>' and password '<password>'
        And <userRole> goes to courses page
        When <userRole> clicks Create-new-course button
        #Then teacher should see that his his/hers name is entered by default in teachers' field (to be restored after SC-7152)
        Then <userRole> should see that time span is already set
        When <userRole> should see that supply teacher is not set
        And <userRole> should see that course name is not set
        And <userRole> clicks Next-section button
        Then <userRole> should see that '2' section can not be opened
        When <userRole> enters course name '<courseName>' into new course form
        #And <userRole> sees his.hers name is entered by default in teachers' field
        And <userRole> chooses course colour '<courseColour>'
        And <userRole> clicks Next-section button
        Then <userRole> should see that '2' section is opened
        And <userRole> should see that no class is set
        And <userRole> should see that no student is set
        When <userRole> clicks Next-section button
        Then <userRole> should see that '3' section is opened
        When <userRole> clicks Go-to-course-list button
        Then <userRole> should see that course with name '<courseName>' is visible on the list
        And <userRole> should see that course with name '<courseName>' is displayed correctly on the list
        And <userRole> should see that color of the course with name '<courseName>' is '<courseColour>' that was selected during the creation process
        Examples:
            | userRole | userName                        | password       | courseName        | courseColour |
            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | Mathe@Sport&Music | corn         |

    @createCourseWithStudent
    Scenario Outline: As a user, I want to be able to create a course that student should see
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> creates course with name '<courseName>' and student '<studentName>'
        And <userRole> sees that course with name '<courseName>' contains number of members '<membersNumber>'
        And <userRole> clicks on members icon in course with name '<courseName>'
        Then <userRole> should see that course members are visible on the list '<studentName>'
        When <userRole> closes member modal window
        And <userRole> logs out
        And <userRole> '<studentName>' logs in with email '<studentLogin>' and password '<password>'
        And <userRole> goes to courses page
        Then <userRole> should see that course with name '<courseName>' is visible on the list
        Examples:
            | userRole | courseName | studentName    | username                        | password       | studentLogin                     | membersNumber |
            | teacher  | Ballet     | Amelia Strobl	 | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | amelia.strobl.qa@schul-cloud.org | 1             |
