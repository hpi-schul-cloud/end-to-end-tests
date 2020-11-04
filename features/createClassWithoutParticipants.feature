@administration @class
Feature: As administrator of a school I want to create a new class but without a
	teacher and without students so that I can add teachers and students later on

	Background:
		Given admin arrives on the Schul-Cloud homepage

	@createClassWithoutParticipants
	Scenario Outline:
		Given admin logs in with email '<adminUsername>' and password '<adminPassword>'
		And admin performs first login actions: data protection acceptance
		And admin goes to administration
		And admin goes to class administration
		And admin creates class with custom name '<customClassName>'
		Then admin should see that class with name '<customClassName>' and '0' participants is visible
		Examples:
			| adminUsername         | adminPassword | customClassName | 
			| admin@schul-cloud.org | Schulcloud1!  | 11c             | 
