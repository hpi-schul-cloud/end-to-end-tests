@team
Feature: User can create a team with two students

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createTeam
	Scenario Outline: As a user, I want to be able to create a team with two new members
		When <userRole> logs in with email '<teacherUsername>' and password '<teacherPassword>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> creates a new team with name '<teamName>' and description '<description>' and color orange
		And <userRole> adds a student to team with lastname: '<lastName1>' and firstname: '<firstName1>'
		And <userRole> adds a student to team with lastname: '<lastName2>' and firstname: '<firstName2>'
		And <userRole> clicks Submit-add-team-member button
		Then <userRole> sees that team with name '<teamName>', colour '#ffad42' and  member number '3' is visible on the list
		When <userRole> clicks on Member icon in team with name '<teamName>'
		Then <userRole> should see that members: '<teacherName>,<firstName1> <lastName1>,<firstName2> <lastName2>' are listed
		Examples:
			| userRole | teacherUsername        | teacherPassword | teamName  | description      | teacherName | firstName1 | lastName1 | firstName2 | lastName2  |
			| teacher  | lehrer@schul-cloud.org | Schulcloud1!    | test team | test description | Cord Carl   | Marla      | Mathe     | Waldemar   | Wunderlich |
