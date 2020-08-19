@adminCreateClassWithoutParticipants

Feature: As administrator of a school I want to create a new class but without a
teacher and without students so that I can add teachers and students later on.
The naming of the class should be the usual way (e.g. "11c")

Background:
	Given admin arrives on the Schul-Cloud homepage
	Given admin is logged in successfully
	Given admin performs the first login steps

Scenario Outline:

	Given admin logs in with email <adminUsername> and password <adminPassword>
	Given admin accepts data protection
	When admin creates a class <courseName>
	Then admin should see the class <sameCourse> with <participants> participants.
Examples:
	|adminUsername        | adminPassword | courseName| sameCourse| participants |
	|admin@schul-cloud.org| Schulcloud1!  | 11c       | 11c       | 0            |
