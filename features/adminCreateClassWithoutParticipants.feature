@adminCreateClassWithoutParticipants

Feature: As administrator of a school I want to create a new class but without a
teacher and without students so that I can add teachers and students later on.
The naming of the class should be the usual way (e.g. "11c")

Background:
	Given admin arrives on the Schul-Cloud page
	Given admin is logged in successfully
	Given admin performs the first login steps

Scenario Outline:
	When admin creates a class <courseName>
	Then admin should see the class <coursename> with <participants> participants.
Examples:
	|courseName|participants|
	|11c       |0           |
