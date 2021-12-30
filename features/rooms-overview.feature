@roomsOverview @e2eCore @stableTest
Feature: Check if the time stamp for the archived courses is set 
    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    	@heckTimeStampRoomsOverview 
	    Scenario Outline: As a user, I want to be able to change the password
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> goes to user settings
		When <userRole> changes password from '<password>' to '<newPassword>'
		And <userRole> logs out
		And user arrives on the Schul-Cloud homepage
		And <userRole> logs in with email '<username>' and password '<password>'
		Then <userRole> login must fail
		When <userRole> waits for next login
		And <userRole> is on LoginPage and logs in using email '<username>' and password '<newPassword>'
		Then <userRole> login is successful
		Examples:
			| userRole | username                         | password       | newPassword        |
			| teacher  | karl.teacher.qa@schul-cloud.org  | Schulcloud1qa! | NewPwSchulcloud1!! |
			| student  | amelia.strobl.qa@schul-cloud.org | Schulcloud1qa! | NewPwSchulcloud1!! |
