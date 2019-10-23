@administrateClasses

Feature: logging in as a teacher and create a new class and add students to the class
I want to be able to add some pupils to a new class on Schul-Cloud
Background:
    Given teacher arrived on the Schul-Cloud page and
    Given teacher is logged in and

@createClass      
Scenario Outline:
    When teacher creates a student with <firstname>, <lastname>, <email> and 
    When teacher goes to administration
    When teacher creates a class, chooses a year <grade> and class name <className>
    When teacher adds student with <firstname>, <lastname> to this class
    Then teacher should see the created class <grade><className>
Examples:
| firstname | lastname | email | className| grade | 
| New  | Classmate  | newclassmate@schul-cloud.org | a | 1 |

@deleteClass
Scenario Outline: as a teacher I can create a user, create a class with the created student and afterwards delete that class

    When teacher creates a student with <firstname>, <lastname>, <email> and 
    When teacher goes to administration
    When teacher creates a class, chooses a year <grade> and class name <className>
    When teacher adds student with <firstname>, <lastname> to this class
    Then teacher should see the created class <grade><className>
    Then teacher can delete the class <grade><className>
    Then teacher should not see the created class <grade><className>
Examples:
| firstname | lastname | email | className| grade | 
| New  | Classmate  | newclassmate@schul-cloud.org | a | 1 |
