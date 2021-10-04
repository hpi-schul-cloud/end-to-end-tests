@courseTopics @deleteTopic @e2eCore @stableTest
Feature: Set of tests to delete topics

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @deleteSimpleTopic
    Scenario Outline: As a user, I want to be able to delete a topic
        When <userRole> logs in with email '<username>' and password '<password>'
        When <userRole> goes to courses page
        And <userRole> chooses course with name '<courseName>'
        Then <userRole> should see that topic with name '<topicName>' is visible on the list
        When <userRole> adds a topic with name '<secondTopicName>'
        And <userRole> clicks Save-changes button
        Then <userRole> should see that topic with name '<secondTopicName>' is visible on the list
        When <userRole> clicks on Trashcan icon in topic with name '<topicName>'
        And <userRole> clicks on Delete topic button
        Then <userRole> should see that topic with name '<topicName>' is not visible on the list
        Examples:
            | userRole | username                        | password       | courseName | topicName      | secondTopicName |
            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | English    | Grammatik      | Addition        |

