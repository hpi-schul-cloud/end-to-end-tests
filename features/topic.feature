@topic
Feature: Create, edit and delete a topic in the course on the HPI SchulCloud page

	Background:
		Given Teacher arrives on the Schul-Cloud homepage
		Given Teacher logs in with email lehrer@schul-cloud.org and password Schulcloud1!
		Given Teacher accepts data protection

	@createTopic
	Scenario Outline: <userRole> creates a new topic in course
		When <userRole> goes to courses page
		And <userRole> chooses course with name <courseName>
		And <userRole> adds a new Topic with name <topicName>
		Then <userRole> should see that created topic with name <topicName> is shown on the topic list
		When <userRole> clicks on the topic with name <topicName>
		Then <userRole> should see that the topic with name <topicName> is visible on the topic page
		Examples:
			| userRole | courseName | topicName |
			| Teacher  | Mathe      | Division  |
