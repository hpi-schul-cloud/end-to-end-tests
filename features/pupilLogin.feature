@pupilLogin
Feature: Logging in as an pupil
  As an pupil on Schul-Cloud
  I want to be able to login with an pupil account

  Background:
    Given a pupil arrives on the Schul-Cloud login homepage

  Scenario Outline: User inputs the username and password
    When a pupil puts in <username> and <password> and clicks the login-button
    Then a pupil should see the dashboard
    #Then the pupil-dashboard should look like it looked before for <username>

    Examples:
      |username|password|
      |schueler@schul-cloud.org|Schulcloud1!|
