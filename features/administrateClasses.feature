@administrateClasses

Feature: logging in as a teacher and create a new class and add students to the class
I want to be able to add some pupils to a new class on Schul-Cloud
Background:
    Given teacher arrived on the Schul-Cloud page and
    Given teacher is logged in and
     
Scenario Outline:
    When teacher creates a student with <firstname>, <lastname>, <email> and 
    When teacher goes to administration
    When teacher creates a class, chooses a year and class <classSuffix>
    When teacher adds student with <firstname>, <lastname> to this class
    Then teacher should see the created class <classSuffix>
Examples:
| firstname | lastname | email | classSuffix |
| New  | Classmate  | newclassmate@schul-cloud.org | a |
