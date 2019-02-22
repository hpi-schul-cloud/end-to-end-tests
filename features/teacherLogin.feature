@teacherLogin
Feature: Logging in as a teacher
  As a teacher on Schul-Cloud
  I want to be able to login with a teacher account

  Background:
    Given The user arrives on the Schul-Cloud homepage

  Scenario Outline: User inputs the username and password
    When they put in <username> and <password> and click the login-button
    Then they should see their dashboard
    Then the dashboard should look like it looked before for <username>

    Examples:
      |username|password|
      |demo-lehrer@schul-cloud.org|schulcloud|
      
