@lernstore
Feature: different actions in lernstore
Background: a teacher logs in and creates a course
Given the teacher starts on the login page
Given the teacher is logged-in successfully
Given the teacher goes to the course page as a next step

@lernstoreAddMaterialFromContentDetailView
Scenario Outline: teacher can add material to topic of course from content detail view
When the teacher adds a Topic with name <topicname>
When teacher goes to content page
When the teacher searches for content
When teacher clicks on content-card
When teacher clicks on add content button
When teacher selects course and topic
When teacher goes to topic
Then added material should be visible

@lernstoreAddMaterialFromContentCard
Scenario Outline: teacher can add material to topic of course from content card
When the teacher adds a Topic with name <topicname>
When teacher goes to content page
When the teacher searches for content
When teacher clicks on plus btn of content-card
When teacher selects course and topic
When teacher goes to topic
Then added material should be visible

@lernstoreAddMaterialFromTopic
Scenario Outline: teacher can add material to topic of course while creating a new topic
When the teacher adds a Topic with name <topicname>
When the teacher adds a new material to topic
When the teacher searches for content
When teacher clicks on content-card
When teacher clicks on add content button
Then added material should be visible
