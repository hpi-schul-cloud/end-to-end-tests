@lernstore
Feature: different actions in lernstore
Background: a teacher logs in and creates a course
Given teacher arrives on the Schul-Cloud homepage
Given teacher is successfully logged in
Given teacher goes to courses page



@lernstoreAddMaterialFromContentDetailView
Scenario Outline: teacher can add material to topic of course from content detail view
Given the teacher creates some with name <coursename>
Given the teacher chooses the created course with <coursename> and
When the teacher adds a Topic with name <topicName>
When the teacher adds some Lerstore material with <lerstoreTopicName> to the course
Then the teacher must be redirected to content page
When the teacher searches for content <content>
Then the right number of materials <content> is displayed
When teacher clicks on content-card after request <content>
When teacher clicks on add content button
When teacher selects course <coursename> and topic <topicName>
When teacher goes to topic <topicName> of course <coursename>
Then added material should be visible
Examples:
    | coursename          | topicName             | lerstoreTopicName | content |
    | courseWithLernstore | Topic with Lernstore  | LernstoreTest     | Mathe   |

@lernstoreAddMaterialFromContentCard
Scenario Outline: teacher can add material to topic of course from content card
When the teacher adds a Topic
When teacher goes to content page
When the teacher searches for content
When teacher clicks on plus btn of content-card
When teacher selects course and topic
When teacher goes to topic
Then added material should be visible

@lernstoreAddMaterialFromTopic
Scenario Outline: teacher can add material to topic of course while creating a new topic
When the teacher adds a Topic
When the teacher adds a new material to topic
When the teacher searches for content
When teacher clicks on content-card
When teacher clicks on add content button
Then added material should be visible
