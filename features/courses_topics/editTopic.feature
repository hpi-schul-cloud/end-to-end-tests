#@courseTopics @editTopic @e2eCore @stableTest @courses_and_topics
#Feature: Set of tests to edit topics

#    Background: User opens Schul-cloud homepage Website
#        Given user arrives on the Schul-Cloud homepage

#    @editSimpleTopic
#    Scenario Outline: As a user, I want to be able to edit a topic
#        Given <userRole> logs in with email '<username>' and password '<password>'
#        And <userRole> goes to rooms-overview
#        And <userRole> chooses course with name '<courseName>'
#        And <userRole> sees that first topic with name '<topicName>' is visible on the list
#        When <userRole> clicks on Edit-topic-pencil icon in topic line with name '<topicName>'
#        And <userRole> changes topic name '<changedTopicName>'
#        And <userRole> changes title of content from '<contentTitle>' to '<newContentTitle>'
#        And <userRole> changes description of content from '<contentText>' to '<newContentText>'
#        And <userRole> clicks Save-changes button
#        Then <userRole> should see that first topic with name '<changedTopicName>' is visible on the list
#        When <userRole> clicks on topic with name '<changedTopicName>'
#        Then <userRole> should see that topic title is '<changedTopicName>'
#        And <userRole> should see that content text title is '<newContentTitle>'
#        And <userRole> should see that content text contains text '<newContentText>'
#        When <userRole> goes to rooms-overview
#        And <userRole> chooses course with name '<courseName>'
#        Then <userRole> should see that edited topic with name '<changedTopicName>' is visible on the list
#        Examples:
#            | userRole | username                        | password       | courseName | topicName | contentTitle | contentText  | changedTopicName | newContentTitle | newContentText |
#            | teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | Biologie   | Herz      | TEXT         | some text    | Art              | Picasso         | Human of Art   |

