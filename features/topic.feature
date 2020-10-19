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

	@editTopic
	Scenario Outline: <userRole> edit a topic
		When <userRole> goes to courses page
		And <userRole> chooses course with name <courseName>
		And <userRole> adds a Topic with name <topicName>
		And <userRole> adds content title <contentTitle> and text <description> to the topic
		Then <userRole> should see that created topic with name <topicName> is shown on the topic list
		When <userRole> clicks on the pencil button in the line of the topic with name <topicName> to edit the topic
		When <userRole> changes topic name <changedTopicName>
		And  <userRole> find <contentTitle> and changes to title <changedContentTitle> and text <changedDecsription> of the topic
		Then <userRole> should see changed topic name on <changedTopicName> and content title <changedContentTitle> and description <changedDecsription> is visible
		Then <userRole> should see that edited topic with name <changedTopicName> is shown on the topic list
		When <userRole> clicks on the topic with name <changedTopicName>
		Examples:
			| userRole | courseName | topicName | contentTitle | description  | changedTopicName | changedContentTitle | changedDecsription |
			| teacher  | Mathe      | Division  | Human        | Human as Art | Art              | Picasso             | tests of Art       |
