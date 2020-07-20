@leftNavigation
Feature:checkLeftNavigation

@teacherclicksLeftMenuItems
Scenario Outline: The user logs in as a teacher and clicks the left menu items
When The Teacher arrives on the Schul-Cloud page
When a teacher logs in his account using <username> and <password>
When the teacher has accepted the data protection agreement
Then click all left menu items
	Examples:
	| username                | password      | 
	| lehrer@schul-cloud.org  | Schulcloud1!  | 