@topic
Feature: Create, edit and delete a topic in the course on the HPI SchulCloud page

	Background:
		Given teacher arrives on the Schul-Cloud homepage
		Given teacher logs in with email lehrer@schul-cloud.org and password Schulcloud1!
		Given teacher accepts data protection

	@editTopic
	Scenario Outline: <userRole> edit a topic
		When <userRole> goes to courses page
		And <userRole> chooses course with name <courseName>
		And <userRole> adds a new Topic with name <topicName>
		Then <userRole> should see that created topic with name <topicName> is shown on the topic list
		When <userRole> clicks on the pencil button in the line of the topic with name <topicName> to edit the topic
		When <userRole> changes topic name <changedTopicName>
		And  <userRole> adds some Text <text> to the course
#		to zrobione tylko podmienic step def
		Then teacher should see that edited topic with name <changedTopicName> is shown on the topic list
		When <userRole> clicks on the topic with name <changedTopicName>
		Then <userRole> should see that the topic with name <changedTopicName> and <contentTitle> and <text> is visible one the topic page
		Examples:
			| userRole | courseName | topicName | changedTopicName | contentTitle | text         |
			| teacher  | Mathe      | Division  | Art              | Picasso      | tests of Art |

