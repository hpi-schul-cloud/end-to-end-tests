@createNewPupil
Feature: Administrate pupils, classes and teachers
  As an admin on Schul-Cloud
  I want to be able to administrate pupils, teachers and classes
  Background:
    Given admin arrives on the Schul-Cloud login homepage
    Given this admin logs in successfully

  Scenario Outline: Admin creates a pupil
    When an admin puts in <firstName> and <secondName> and <email> of the new pupil
    Then the admin should see new pupil with email <email> among his pupils
    Then the teacher can manually submit a consent <email>

    Examples:
      |firstName|secondName|email|
      |Zeorg|Beispielmann|yulia.shikhareva@gmail.com|
