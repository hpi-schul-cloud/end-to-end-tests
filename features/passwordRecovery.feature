@passwordRecovery

Feature: a registered user can ask for a password
Background: user arrives at Schul Cloud
Given user arrives at schulcloud
Given user clicks on password recovery button


Scenario: user should get a password recovery email 
When user submits valid email for password recovery
Then user should get a email from schulcloud


