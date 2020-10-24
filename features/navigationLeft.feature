@leftNavigation
Feature:checkLeftNavigation

	@teacherClicksLeftMenuItems
	Scenario Outline: The user logs in as a teacher and clicks the left menu items he should have access to
		When teacher arrives on the Schul-Cloud homepage
		When teacher logs in with email '<teacherUsername>' and password '<password>'
		When teacher performs first login actions: data protection acceptance
		Then click left navigation item "logo"
		Then click left navigation item "dashboard"
		Then click left navigation item "courses"
		Then click left navigation item "teams"
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
		Then click left navigation item "addons"
		Then click left navigation item "administration"
		Then click left navigation item "admStudents"
		Then click left navigation item "admTeachers"
		Then click left navigation item "admClasses"
		Then click left navigation item "helparea"
		Then click left navigation item "helparticle"
		Then click left navigation item "contact"
		# TODO nuxt pages - the navigation structure is different,
	  	#  therefor leave it for last page otherwise the other pages won't be found
		Then click left navigation item "content"

		Examples:
			| teacherUsername        | password     |
			| lehrer@schul-cloud.org | Schulcloud1! |


@studentClicksLeftMenuItems
	Scenario Outline: The user logs in as a student and clicks the left menu items he should have access to
		When student arrives on the Schul-Cloud homepage
		And student logs in with email '<studentUsername>' and password '<password>'
        And student performs first login actions: data protection acceptance, password change '<password>'
		Then click left navigation item "logo"
		Then click left navigation item "dashboard"
		Then click left navigation item "courses"
		Then click left navigation item "teams"
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
		Then click left navigation item "addons"
		Then click left navigation item "helparea"
		Then click left navigation item "helparticle"
		Then click left navigation item "contact"
   		# TODO nuxt pages - the navigation structure is different,
	  	#  therefor leave it for last page otherwise the other pages won't be found
		Then click left navigation item "content"

		Examples:
			| studentUsername             | password     |
			| paula.meyer@schul-cloud.org | Schulcloud1! |


	@adminClicksLeftMenuItems
	Scenario Outline: The user logs in as an admin and clicks the left menu items he should have access to
		When admin arrives on the Schul-Cloud homepage
		When admin logs in with email '<adminUsername>' and password '<password>'
		When admin performs first login actions: data protection acceptance
		Then click left navigation item "logo"
		Then click left navigation item "dashboard"
		Then click left navigation item "courses"
		Then click left navigation item "teams"
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
		Then click left navigation item "addons"
		Then click left navigation item "helpdesk"
		Then click left navigation item "administration"
		Then click left navigation item "admStudents"
		Then click left navigation item "admTeachers"
		Then click left navigation item "admClasses"
		Then click left navigation item "helparea"
		Then click left navigation item "helparticle"
		Then click left navigation item "contact"
		# TODO nuxt pages - the navigation structure is different,
	  	#  therefor leave it for last page otherwise the other pages won't be found
		Then click left navigation item "content"

		Examples:
			| adminUsername         | password     |
			| admin@schul-cloud.org | Schulcloud1! |
