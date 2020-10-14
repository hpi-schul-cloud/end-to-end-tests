@topic
Feature: Create, edit and delete a topic in the course on the HPI SchulCloud page

	Background:
		Given I arrives on the Schul-Cloud homepage
		Given teacher logs in with email lehrer@schul-cloud.org and password Schulcloud1!
		Given teacher accepts data protection

	@createTopic
	Scenario Outline: I create a new topic
		When teacher goes to courses page
		And teacher chooses course with name <courseName>
		And the teacher adds a new Topic with name <topicName>
		Then teacher should see that created topic with name <topicName> is shown
		Examples:
			| courseName | topicName |
			| Mathe      | Division  |

	@editTopic
	Scenario Outline: I edit a topic
		When teacher goes to courses page
		And teacher chooses course with name <courseName>
		And the teacher adds a new Topic with name <topicName>
		And teacher chooses topic with name <topicName>
		And teacher clicks on edit a topic
		When teacher changes name of title <changedTopicTitle> and description <description>
		Then teacher check the topic was changed

		Examples:
			| courseName | topicName | changedTopicTitle | description  |
			| Mathe      | Division  | Art               | tests of Art |

