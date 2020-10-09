@topic
Feature: Create, edit and delete a topic in the course on the HPI SchulCloud page

	Background:
		Given I login as teacher
		Given  User logs in with email <Username> and password <password>


	@createTopic
	Scenario Outline:
		When teacher goes to Course page
		And teacher clicks on Course with name <courseName>
		And teacher clicks on Create-new-topic button
		And teacher enters topic title <topicTitle>
		And teacher clicks on submit button
		Then teacher should see course page
		And teacher should see that created topic with name <topicTitle> is shown
		Examples:
			|  |
