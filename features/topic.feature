@topic
Feature: Create, edit and delete a topic in the course on the HPI SchulCloud page

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createTopic
	Scenario Outline: <userRole> creates a new topic in course
		Given <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> accepts data protection
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a new Topic with name '<topicName>'
		Then <userRole> should see that topic with name '<topicName>' is visible on the list
		When <userRole> clicks on topic with name '<topicName>'
		Then <userRole> should see that topic title is '<topicName>'
		Examples:
			| userRole | email                  | password     | courseName | topicName |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Division  |

	@editTopic
	Scenario Outline: User edit a topic
		Given <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> accepts data protection
		When <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a topic with name '<topicName>'
		And <userRole> adds content Text with title '<contentTitle>' and description '<contentText>'
		And <userRole> clicks Save-changes
		Then <userRole> should see that first topic with name '<topicName>' is visible on the list
		When <userRole> clicks on the pencil button in the line of the topic with name '<topicName>' to edit the topic
		And <userRole> changes topic name '<changedTopicName>'
		And  <userRole> changes title of content from '<contentTitle>' to '<newContentTitle>'
		And  <userRole> changes description of content from '<contentText>' to '<newContentText>'
		And <userRole> clicks Save-changes
		Then <userRole> should see that topic title is '<changedTopicName>'
		Then <userRole> should see that content text title is '<newContentTitle>'
		Then <userRole> should see that content text contains text '<newContentText>'
		When <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		Then <userRole> should see that edited topic with name '<changedTopicName>' is visible on the list
		Examples:
			| userRole | email                  | password     | courseName | topicName | contentTitle | contentText     | changedTopicName | newContentTitle | newContentText |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Division  | Operations   | Math operations | Art              | Picasso         | Human of Art   |
