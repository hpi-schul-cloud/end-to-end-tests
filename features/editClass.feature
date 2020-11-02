@editClass

Feature: As teacher of a class
I want to edit a class
So that I can change school year and class description.

Background:
	Given teacher arrives on the Schul-Cloud homepage

Scenario Outline:
	Given teacher logs in with email '<teachersUsername>' and password '<teachersPassword>'
	Given teacher performs first login actions: data protection acceptance
	Given teacher goes to administration
	When teacher creates a class '<className>'
	When teacher edits a class'<newClassName>'
	Then teacher should see the class '<newClassName>' with last name of teacher '<teacherLastname>'

Examples:
	|teachersUsername			|teachersPassword	|className	|teacherLastname	|newClassName	|
	|klara.fall@schul-cloud.org |Schulcloud1!		|8a			|Fall				|4d				|
