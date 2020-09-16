@testSet
Feature: Log in as an admin, as a teacher, as a student

    Background:
        When user arrives on the Schul-Cloud homepage

@test
Scenario Outline: Admin creates a pupil
		When admin logs in with email <adminsUsername> and password <adminsPassword>
		When admin accepts data protection