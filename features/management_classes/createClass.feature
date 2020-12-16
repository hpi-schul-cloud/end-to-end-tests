@management @managementClass @createClass
Feature: Set of tests to create classes

    Background: User opens Schul-cloud homepage Website
        Given user arrives on the Schul-Cloud homepage

    @createClassWithoutMembers
    Scenario Outline: As a user, I want to be able to create class without any members
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> goes to management
        And <userRole> goes to class management
        When <userRole> creates class with custom name '<customClassName>'
        Then <userRole> should see that class with name '<customClassName>' and '0' members is visible
        Examples:
            | userRole | username                         | password       | customClassName |
            | admin    | olivier.admin.qa@schul-cloud.org | Schulcloud1qa! | 11c             |

    @createClassWith3Members
    Scenario Outline: As a user, I want to be able to create class without any members
        Given <userRole> logs in with email '<username>' and password '<password>'
        And <userRole> goes to management
        And <userRole> goes to class management
        When <userRole> creates class with custom name '<customClassName>'
        And <userRole> adds a group of '<numberOfStudentsInClass>' students with firstname '<studentsFirstname>' and lastname '<studentLastname>' to the class
        And <userRole> clicks on Save-changes in class button
        Then <userRole> should see that number of students in class with name '<customClassName>' is '<numberOfStudentsInClass>'
        Examples:
            | userRole | username                  		 | password       | customClassName | numberOfStudentsInClass | studentsFirstname | studentLastname |
			| teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | 1C    	        | 3                       | Student           | LastName        |

