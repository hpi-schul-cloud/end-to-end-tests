@wrongPasswordLogin
Feature: Logging in with a wrong password
  As an user on Schul-Cloud
  I should not be able to login with a wrong password

  Background:
    Given a user arrives on the Schul-Cloud login homepage

  Scenario Outline: User inputs a username and wrong password
    When a user puts in <username> and the wrong <password> and click the login-button
    Then a user should see a notification
    Then the login-page should look like it looked before for <username>

    Examples:
      |username|password|
      |admin@schul-cloud.org|wrongPasswordPlaceholder|
      
