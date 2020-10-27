@adminCreateClassWithoutParticipants

Feature: As administrator of a school I want to create a new class but without a
teacher and without students so that I can add teachers and students later on.
The naming of the class should be the usual way (e.g. "11c")

Background:
	Given admin arrives on the Schul-Cloud homepage

Scenario Outline:

	Given admin logs in with email '<adminUsername>' and password '<adminPassword>'
	Given admin accepts data protection
	Given admin goes to administration
	When admin creates a class '<className>'
	Then admin should see the class '<sameClass>' with '<participants>' participants.
Examples:
	|adminUsername        | adminPassword |className| sameClass | participants |
	|admin@schul-cloud.org| Schulcloud1!  |11c      | 11c       | 0            |
