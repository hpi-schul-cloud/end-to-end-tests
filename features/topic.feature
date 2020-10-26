@topic
Feature: Create, edit and delete a topic in the course on the HPI SchulCloud page

	Background:
		Given User arrives on the Schul-Cloud homepage

	@createTopic
	Scenario Outline: <userRole> creates a new topic in course
		Given <userRole> logs in with email <email> and password <password>
		And <userRole> accepts data protection
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a new Topic with name '<topicName>'
		Then <userRole> should see that created topic with name '<topicName>' is shown on the topic list
		When <userRole> clicks on the topic with name <topicName>
		Then <userRole> should see that the topic with name <topicName> is visible on the topic page
		Examples:
			| userRole | email                  | password     | courseName | topicName |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Division  |

	@editTopic
	Scenario Outline: User edit a topic
		Given <userRole> logs in with email <email> and password <password>
		And <userRole> accepts data protection
		When <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a topic with name '<topicName>'
		And <userRole> adds content title '<contentTitle>' and text '<description>' to the topic content
		Then <userRole> should see that created topic with name '<topicName>' is shown on the topic list
		When <userRole> clicks on the pencil button in the line of the topic with name <topicName> to edit the topic
		And <userRole> changes topic name '<changedTopicName>'
		And  <userRole> finds title '<contentTitle>' and changes title on '<changedContentTitle>' and text '<changedDescription>' of the topic
		Then <userRole> should see changed topic with name <changedTopicName> and content title <changedContentTitle> and description <changedDescription> is visible on the topic page
		When <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		Then <userRole> should see that edited topic with name <changedTopicName> is shown on the topic list
		Examples:
			| userRole | email                  | password     | courseName | topicName | contentTitle | description     | changedTopicName | changedContentTitle | changedDescription |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Division  | Operations   | Math operations | Art              | Picasso             | Human of Art       |

	@deleteTopic
	Scenario Outline: User delete a topic
		Given <userRole> logs in with email <email> and password <password>
		And <userRole> accepts data protection
		When <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a topic with name '<topicName>'
		And <userRole> adds content title '<contentTitle>' and text '<description>' to the topic content
		Then <userRole> should see that created topic with name '<topicName>' is shown on the topic list
		And <userRole> adds a new Topic with name '<secondTopicName>'
		When <userRole> clicks on the trashcan button in the line of the topic with name <topicName> to delete the topic
		And <userRole> clicks on the Löschen button in the Löschen pop up
		Then <userRole> should see that deleted topic with name <topicName> is not shown on the topic list
		Examples:
			| userRole | email                  | password     | courseName | topicName		 | secondTopicName	|
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Multiplication | Addition			|
