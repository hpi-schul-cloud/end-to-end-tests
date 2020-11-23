@calendar @createEvent
Feature: Set of tests to create a simple event in the calendar

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createSimpleEventAndFindIt
    Scenario Outline: As a user, I want to be able to create a simple event in the calendar without course/team and check if it's displayed properly.
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> clicks left navigation item 'calendar'
        When <userRole> creates event with title '<eventTitle>', content '<eventContent>' in calendar
        #And <userRole> should see that event with name '<courseName>' is displayed correctly on the list
        Examples:
            | userRole | username                         | password       | eventTitle     | eventContent      |
            | admin    | kai.admin.qa@schul-cloud.org     | Schulcloud1qa! | Schulfrei      | Schule fällt aus! |
            | teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | Coronafrei     | Wir haben frei!   |
            | student  | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa! | Videospiele-AG | Zocken!           |


#@createEvent

#Background:
#	Given teacher arrives on the Schul-Cloud homepage
#    And teacher logs in with email <teachersUsername> and password <teachersPassword>
#    And teacher accepts data protection

#Scenario Outline: create simple event without course/team and check if it's displayed properly
#	When teacher goes to calendar page
#	Then teacher should see monthly calendar

#	When teacher clicks submit button
#	Then teacher should see that info message "not entered event title message" is displayed
    #eventStartDate (2.currentMonth.currentYear), eventEndDate (eventStartDate + 2 weeks) . Eg (2.09.2020 - 16.09.2020) Create generic method -> eg. getDate: function (date, date Change) ... return eg. (date -+ dateChange)
#    When teacher cliks an empty space in calendar on date <eventStartDate> and time <eventStartTime>
#    Then teacher should see that default event start date <eventStartDate> and time <eventStartTime> is already entered
#    Then teacher should see that default event end date <eventStartDate> and time <eventStartTime> is already entered

#    When teacher enters event title <eventTitle>
#    And teacher enters description <eventDescription>
#    And teacher enters event location <eventLocation>
    #And teacher sets event colour  <colour>              optional step
#    And create-course-event, create-team-event toggles are off
#    And teacher clicks submit button
#    Then teacher should see monthly calendar
#    And teacher should see event container box contains: eventStartTime <eventStartTime> and <eventTitle> displayed in the right place
#    And teacher should see that event background colour is <colour>

#    When teacher clicks on event with title <eventTitle>
#    Then teacher should see that event title field contains <eventTitle>
#    And teacher should see that default event start date <eventStartDate> and time <eventStartTime> is already entered
#    And teacher should see that default event end date <eventStartDate> and time <eventStartTime> is already entered  (create method getDefaultEventDateTime: async function (eventStartDate, eventStartTime) which return given date plus one hour)
#    And teacher should see that event description field contains <eventDescription>
#    And teacher should see that event location field contains  <eventLocation>
#    And teacher should see that create-course-event, create-team-event toggles are off
#Examples:
#	|teachersUsername |teachersPassword |eventStartDate|eventStartTime|eventTitle|eventDescription      |eventLocation |
#	|                 |                 |              |              |          |                      |              |
