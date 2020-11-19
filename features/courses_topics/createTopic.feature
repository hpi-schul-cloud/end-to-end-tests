@courseTopics @createTopic
Feature: Set of tests to copy courses

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createSimpleTopic
    Scenario Outline: As a user I want to be able to create a new topic in course
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> performs first login actions: data protection acceptance
        And <userRole> goes to courses page
        When <userRole> chooses course with name '<courseName>'
        And <userRole> adds a topic with name '<topicName>'
        And <userRole> clicks Save-changes button
        Then <userRole> should see that topic with name '<topicName>' is visible on the list
        When <userRole> clicks on topic with name '<topicName>'
        Then <userRole> should see that topic title is '<topicName>'
        Examples:
            | userRole | username               | password     | courseName | topicName |
            | teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Division  |

    @createTopicWithContent
    Scenario Outline: As a user, I want to be able to copy course with certain text
        Given <userRole> logs in
        And <userRole> performs first login actions: data protection acceptance
        And <userRole> goes to courses page
        And <userRole> creates course with name '<courseName>'
        And <userRole> chooses course with name '<courseName>'
        When <userRole> adds a topic with name '<topicName>'
        And <userRole> adds content <contentType> with title '<contentTitle>' and description '<contentDescription>'
        And <userRole> clicks Save-changes button
        And <userRole> goes to courses page
        Then <userRole> should see that copied course with name '<courseName>' contains topic with name '<topicName>'
        Examples:
            | userRole | courseName             | topicName         | contentType | contentTitle          | contentDescription        |
            | teacher  | sample course          | sample topic name | Text        | test text content     | test description          |
            | teacher  | sample course etherpad | etherpad topic    | Etherpad    | etherpad name         | etherpad description here |
            | teacher  | sample course geo      | geo topic         | GeoGebra    | some sample text here | ucxngdjf                  |

#	@createTopicWithMaterial
#	Scenario Outline: As a user, I want to be able to copy course with certain Material
#		Given <userRole> logs in
#		And <userRole> performs first login actions: data protection acceptance
#		And <userRole> goes to courses page
#		And <userRole> creates course with name '<courseName>'
#		And <userRole> chooses course with name '<courseName>'
#		When <userRole> adds a topic with name '<topicName>'
#		And <userRole> adds content Material
#		And <userRole> clicks Save-changes button
#		And <userRole> goes to courses page
#		And <userRole> should see that copied course with name '<courseName>' contains topic with name '<topicName>'
#		Examples:
#			| userRole | courseName             | topicName      | text                  |
#			| teacher  | sample course material | material topic | some sample text here |
