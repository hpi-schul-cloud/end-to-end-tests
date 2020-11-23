@management @managementStudents @createStudent
Feature: Set of tests to create students
	As an Schul-Cloud user I want to be able to create students

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@createNewStudent
	Scenario Outline: As a user, I want to be able to create a student
		Given <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> goes to management
		And <userRole> goes to students management
		When <userRole> set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>', birthday '<birthday>'
		And <userRole> sees that student with email '<studentEmail>' is visible on the list
		And <userRole> manually submits consent for user with e-mail '<studentEmail>', thus generates a random password for him
		And <userRole> logs out
		And student logs in with email '<studentEmail>' and password genarated by admin during manual submission of consent
		Then student should see that data protection is already accepted and performs first login actions: password change '<newPasswordStudent>'
		Examples:
			| userRole | firstName | secondName | studentEmail              | username                     | password       | newPasswordStudent | birthday   |
			| admin    | Georg     | Georgmann  | georgmann@schul-cloud.org | kai.admin.qa@schul-cloud.org | Schulcloud1qa! | Schulcloud1!!      | 10.10.1990 |

	@createNewStudentU14
	Scenario Outline: As a user, I want to create a student u 14 who can register with parents
		Given <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> goes to management
		And <userRole> goes to students management
		When <userRole> set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>', birthday '<birthday>'
		And student receives email '<studentEmail>' with registration link
		And student clicks on registration link sent to '<studentEmail>'
		And student goes to next section
		And student selects under 16 checkbox
		And student clicks Next-section button
		And parents set parent firstname '<parentFirstname>', lastname '<parentLastname>', email '<parentEmail>'
		And parents accept all 
		And parents click on send pin code
		Then parent email receives 4 digit pin code
		And parent fills in pin and submits
		And login data is received
		Examples: 
			| userRole | firstName | secondName | studentEmail 		    | birthday   | parentFirstname | parentLastname | parentEmail 		   | username                     | password       |
			| admin	   | Hansi     | Flick      | hansi.flick@gmail.com | 19.11.2009 | Anna            | Flick          | anna.flick@gmail.com | kai.admin.qa@schul-cloud.org | Schulcloud1qa! |  
