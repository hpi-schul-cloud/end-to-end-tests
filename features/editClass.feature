@editClass

Feature: As teacher of a class
I want to edit a class
So that I can change school year and class description.

Background:
	Given teacher arrives on the Schul-Cloud homepage

Scenario Outline:
	Given teacher logs in with email <teachersUsername> and password <teachersPassword>
	Given teacher accepts data protection
	Given teacher goes to administration
	When teacher creates a class <className>
	When teacher edits a class <className>
	And changes school year
	And changes class description
	Then admin should see the class <sameClass> with <participants> participants.

Examples:
	|teachersUsername			| teachersPassword	|className| sameClass | participants |
	|klara.fall@schul-cloud.org | Schulcloud1!		|8a      | 8a       | 0			 |
