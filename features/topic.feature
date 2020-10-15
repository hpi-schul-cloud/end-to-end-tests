@topic
Feature: Create, edit and delete a topic in the course on the HPI SchulCloud page

	Background:
		Given User arrives on the Schul-Cloud homepage
		Given User logs in with email lehrer@schul-cloud.org and password Schulcloud1!
		Given User accepts data protection

	@createTopic
	Scenario Outline: User creates a new topic in course
		When User goes to courses page
		And User chooses course with name <courseName>
		And User adds a new Topic with name <topicName>
		Then User should see that created topic with name <topicName> is shown
		Examples:
		| userRole	| courseName | topicName |
		|teacher	| Mathe      | Division  |
