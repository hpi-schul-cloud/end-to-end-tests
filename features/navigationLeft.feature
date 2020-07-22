@leftNavigation
Feature:checkLeftNavigation

	@teacherclicksLeftMenuItems
	Scenario Outline: The user logs in as a teacher and clicks the left menu items he should have access to
		When The Teacher arrives on the Schul-Cloud page
		When a teacher logs in his account using <username> and <password>
		When the teacher has accepted the data protection agreement
		Then click left navigation item "logo"
		Then click left navigation item "dashboard"
		Then click left navigation item "courses"
		#Then click left navigation item "teams" #/*yet config might be missing in travis docker*/
		Then click left navigation item "homework"
		Then click left navigation item "asked homework"
		Then click left navigation item "private homework"
		Then click left navigation item "archived homework"
		Then click left navigation item "files"
		Then click left navigation item "my files"
		Then click left navigation item "course files"
		Then click left navigation item "team files"
		Then click left navigation item "shared files"
		Then click left navigation item "news"
		Then click left navigation item "calendar"
		#Then click left navigation item "addons" #/*yet config might be missing in travis docker*/
		#Then click left navigation item "content" #/*yet config might be missing in travis docker*/
		#Then click left navigation item "helpdesk" #/*yet config might be missing in travis docker*/
		Then click left navigation item "administration"
		Then click left navigation item "admStudents"
		Then click left navigation item "admTeachers"
		Then click left navigation item "admClasses"
		#Then click left navigation item "helparea" #/*yet config might be missing in travis docker*/
		#Then click left navigation item "helparticle" #/*yet config might be missing in travis docker*/
		#Then click left navigation item "contact" #/*yet config might be missing in travis docker*/
	
		Examples:
			| username               | password     |
			| lehrer@schul-cloud.org | Schulcloud1! |