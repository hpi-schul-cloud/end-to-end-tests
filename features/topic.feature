@topic
Feature: Create, edit and delete a topic in the course on the HPI SchulCloud page

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createTopic
	Scenario Outline: <userRole> creates a new topic in course
		Given <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a topic with name '<topicName>'
		And <userRole> clicks Save-changes button
		Then <userRole> should see that topic with name '<topicName>' is visible on the list
		When <userRole> clicks on topic with name '<topicName>'
		Then <userRole> should see that topic title is '<topicName>'
		Examples:
			| userRole | email                  | password     | courseName | topicName |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Division  |

	@editTopic
	Scenario Outline: User edit a topic
		Given <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a topic with name '<topicName>'
		And <userRole> adds content Text with title '<contentTitle>' and description '<contentText>'
		And <userRole> clicks Save-changes button
		Then <userRole> should see that first topic with name '<topicName>' is visible on the list
		When <userRole> clicks on Edit-topic-pencil icon in topic line with name '<topicName>'
		And <userRole> changes topic name '<changedTopicName>'
		And  <userRole> changes title of content from '<contentTitle>' to '<newContentTitle>'
		And  <userRole> changes description of content from '<contentText>' to '<newContentText>'
		And <userRole> clicks Save-changes button
		Then <userRole> should see that topic title is '<changedTopicName>'
		Then <userRole> should see that content text title is '<newContentTitle>'
		Then <userRole> should see that content text contains text '<newContentText>'
		When <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		Then <userRole> should see that edited topic with name '<changedTopicName>' is visible on the list
		Examples:
			| userRole | email                  | password     | courseName | topicName | contentTitle | contentText     | changedTopicName | newContentTitle | newContentText |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Division  | Operations   | Math operations | Art              | Picasso         | Human of Art   |

	@deleteTopic
	Scenario Outline: User delete a topic
		Given <userRole> logs in with email '<email>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a topic with name '<topicName>'
		And <userRole> clicks Save-changes button
		Then <userRole> should see that topic with name '<topicName>' is visible on the list
		When <userRole> adds a topic with name '<secondTopicName>'
		And <userRole> clicks Save-changes button
		Then <userRole> should see that topic with name '<secondTopicName>' is visible on the list
		When <userRole> clicks on Trashcan icon in topic with name '<topicName>'
		And <userRole> clicks on Delete topic button
		Then <userRole> should see that topic with name '<topicName>' is not visible on the list
		Examples:
			| userRole | email                  | password     | courseName | topicName		 | secondTopicName	| contentText     | 
			| teacher  | lehrer@schul-cloud.org | Schulcloud1! | Mathe      | Multiplication | Addition   		| Math operations |
