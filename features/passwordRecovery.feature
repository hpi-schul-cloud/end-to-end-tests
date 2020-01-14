@passwordRecovery

Feature: a registered user can ask for a password
Background: user arrives at Schul Cloud
Given user arrives at schulcloud
Given user clicks on password recovery request


Scenario Outline: user should get a password recovery email 
When user submits valid email <registeredEmail> for password recovery
Then user should get an email <registeredEmail> from schulcloud
#Then user with <registeredEmail> can set a new password <password>
#Then user with <registeredMail> can get the access to the profile with the new password <password>
Examples:
| registeredEmail             | password       | 
| admin@schul-cloud.org       | SchulCloud1!!! |  
| klara.fall@schul-cloud.org  | SchulCloud1!!! | 


