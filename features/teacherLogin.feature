@teacherLogin
Feature: Logging in as a teacher
  As a teacher on Schul-Cloud
  I want to be able to login with a teacher account

  Background:
    Given The teacher arrives on the Schul-Cloud homepage

  Scenario Outline: User inputs the username and password
    When the teacher puts in <username> and <password> and click the login-button
    Then the teacher should see their dashboard
    Then the teacher-dashboard should look like it looked before for <username>

    Examples:
      |username|password|
      |demo-lehrer@schul-cloud.org|schulcloud|
      
