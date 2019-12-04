@passwordRecovery

Feature: a registered user can ask for a password
Background: user arrives at Schul Cloud
Given user arrives at schulcloud
Given user clicks on password recovery request


Scenario Outline: user should get a password recovery email 
When user submits valid email <registeredEmail> for password recovery
Then user should get an email from schulcloud
Examples:
| registeredEmail| 
| admin@schul-cloud.org  | 
| klara.fall@schul-cloud.org  | 


