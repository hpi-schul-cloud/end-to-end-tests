@lernStore
Feature: Set of tests to find FWU content

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @getFwuContent
    Scenario Outline: As a user, I want to be able to search the learning store and find FWU content.
        Given <userRole> logs in with email '<username>' and password '<password>'
        When <userRole> goes to learning store
        When <userRole> enters content name '<contentName>' into search field
        When <userRole> waits till content is loaded
        When <userRole> clicks on content card
        When <userRole> waits till content page is loaded
        When <userRole> clicks on content button
        When <userRole> waits till FWU content is loaded
        Then <userRole> get the FWU content name '<contentName>' with title '<expectedTitle>'
        Examples:
            | userRole | username                         | password       | contentName                       | expectedTitle                   |
            | teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | Denkmaeler - Steine des Anstosses | Denkmäler - Steine des Anstoßes |
            | student  | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa! | Denkmaeler - Steine des Anstosses | Denkmäler - Steine des Anstoßes |
