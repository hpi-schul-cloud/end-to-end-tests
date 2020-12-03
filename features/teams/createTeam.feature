@management @managementTeams @teams @createTeam 
Feature: Set of tests to create teams

	Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

	@createTeamWithTwoMembers
	Scenario Outline: As a user, I want to be able to create a team with two new members
		Given <userRole> logs in with email '<username>' and password '<password>'
		When <userAdmin> creates a new team with name '<teamName>' and description '<description>' and color '<colour>'
		And <userRole> adds a student to team with lastname: '<lastName1>' and firstname: '<firstName1>'
		And <userRole> adds a student to team with lastname: '<lastName2>' and firstname: '<firstName2>'
		And <userRole> clicks Submit-add-team-member button
		Then <userRole> goes to Teams Page
		Then <userRole> sees that team with name '<teamName>', colour '<colour>' and  member number '<number>' is visible on the list
		When <userRole> clicks on Member icon in team with name '<teamName>'
		Then <userRole> should see that team members: '<teacherName>,<firstName1> <lastName1>,<firstName2> <lastName2>' are listed
		Examples:
			| userRole | username               		 | password       | teamName  | description      | teacherName | firstName1 | lastName1 | firstName2 | lastName2  | colour  | number |
			| teacher  | karl.teacher.qa@schul-cloud.org | Schulcloud1qa! | test team | test description | Karl Herzog | Boris      | Wasser    | Herbert    | Kraft      | green   | 3      |
