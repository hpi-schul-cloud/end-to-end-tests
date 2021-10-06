@calendar @createEvent @stableTest @tasks_and_other
Feature: Set of tests to create a simple event in the calendar

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createSimpleEventAndFindIt
    Scenario Outline: As a user, I want to be able to create a simple event in the calendar without course/team and check if it's displayed properly.
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> clicks left navigation item 'calendar'
        Then <userRole> should see monthly calendar
        And <userRole> clicks inside event table
        When <userRole> clicks create event button
        #Then <userRole> can see the notification message
        When <userRole> adds title '<eventTitle>' in calendar
        When <userRole> adds start date in calendar: today, 09:00
        When <userRole> adds end date in calendar: today +14 days, 08:00
        When <userRole> adds content '<eventContent>' in calendar
        When <userRole> adds location '<eventLocation>' in calendar
        When <userRole> clicks create event button
        And <userRole> should see that event with title '<eventTitle>' is displayed in the calendar
        Examples:
            | userRole | username                         | password       | eventTitle     | eventContent      | eventLocation      |
            | admin    | kai.admin.qa@schul-cloud.org     | Schulcloud1qa! | Schulfrei      | Schule fällt aus! | Bei euch am PC!    |
            | teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | Es sind Ferien | Wir haben frei!   | Eure vier Wände?   |
            | student  | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa! | Videospiele-AG | Zocken!           | Bei euch zuhause.  |


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
