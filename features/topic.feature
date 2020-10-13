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
		And the teacher adds a new Topic with name <topicname>
		Then teacher should see that created topic with name <topicname> is shown
		Examples:
			| courseName | topicname |
			| Mathe      | Division  |

	@editTopic
	Scenario Outline: I edit a topic
		When teacher goes to courses page
		And teacher chooses course with name <courseName>
		And teacher chooses topic with name <topicname>
		And teacher clicks on edit a topic
		When teacher changes title of topic <changeName>
		And teacher should add text
		Examples:
			| courseName | topicname | changeName |
			| Mathe      | Division  |            |

