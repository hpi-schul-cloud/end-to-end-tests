@courseTopics @createTopic @stableTest @courses_and_topics
Feature: Set of tests to copy courses

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createTopicWithContent @e2eCore
    Scenario Outline: As a user, I want to be able to copy course with certain text
        Given <userRole> logs in
        And <userRole> goes to rooms-overview
        And <userRole> chooses course with name '<courseName>'
        When <userRole> adds a topic with name '<topicName>'
        And <userRole> adds content <contentType> with title '<contentTitle>' and description '<contentDescription>'
        And <userRole> clicks Save-changes button
        Then <userRole> should see that copied course with name '<courseName>' contains topic with name '<topicName>'
        When <userRole> clicks on topic with name '<topicName>'
        Then <userRole> should see that topic title is '<topicName>'
        Examples:
            | userRole | courseName | topicName         | contentType | contentTitle          | contentDescription        |
            | teacher  | Mathe      | sample topic name | Text        | test text content     | test description          |
            | teacher  | Mathe      | geo topic         | GeoGebra    | some sample text here | ucxngdjf                  |
            # | teacher  | Mathe      | etherpad topic    | Etherpad    | etherpad name         | etherpad description here |

#	@createTopicWithMaterial
#	Scenario Outline: As a user, I want to be able to copy course with certain Material
#		Given <userRole> logs in
#		And <userRole> performs first login actions: data protection acceptance
#		And <userRole> goes to rooms-overview
#		And <userRole> creates course with name '<courseName>'
#		And <userRole> chooses course with name '<courseName>'
#		When <userRole> adds a topic with name '<topicName>'
#		And <userRole> adds content Material
#		And <userRole> clicks Save-changes button
#		And <userRole> goes to rooms-overview
#		And <userRole> should see that copied course with name '<courseName>' contains topic with name '<topicName>'
#		Examples:
#			| userRole | courseName             | topicName      | text                  |
#			| teacher  | sample course material | material topic | some sample text here |
