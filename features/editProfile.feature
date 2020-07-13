@editProfile
Feature: users can edit their profile

Scenario Outline : user changes the passwort
Given the user goes to login page
Given the user logs in with <username> and <password>
Given the user goes to profile settings
When user changes the passwort from <password> to <newPassword>
When the user logs out
When the user <username> logs in with an old password <password>
When user logs in with the old password <password>
Then the login must fail
When the user <username> logs in with the new password <newPassword>
Then the login must be successful

Examples:
| username                   | password      | newPassword    |
| klara.fall@schul-cloud.org | Schulcloud1!  | Schulcloud1!!  |
