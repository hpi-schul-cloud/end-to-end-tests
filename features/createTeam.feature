@team
Feature: a teacher can create a team with two students

	Background: a teacher logged in and created a new pupil
		Given user arrives on the Schul-Cloud homepage

	@createTeam
	Scenario Outline: As a user, I want to be able to create a team with two new members
		When teacher logs in with email '<teacherUsername>' and password '<teacherPassword>'
		And teacher performs first login actions: data protection acceptance
		When teacher creates a new team with name '<teamName>' and description '<description>' and color orange
		And teacher adds a student to team with lastname: '<lastName1>' and firstname: '<firstName1>'
		And teacher adds a student to team with lastname: '<lastName2>' and firstname: '<firstName2>'
		And teacher clicks Submit-add-team-member button
		Then teacher sees that team with name '<teamName>', colour '#ffad42' and  member number '3' is visible on the list
		When teacher clicks on Member icon in team with name '<teamName>'
		Then teacher should see that members: '<teacherName>,<firstName1> <lastName1>,<firstName2> <lastName2>' are listed

		Examples:
			| teacherUsername        | teacherPassword | teamName  | description      | teacherName | firstName1 | lastName1 | firstName2 | lastName2  |
			| lehrer@schul-cloud.org | Schulcloud1!    | test team | test description | Cord Carl   | Marla      | Mathe     | Waldemar   | Wunderlich |
