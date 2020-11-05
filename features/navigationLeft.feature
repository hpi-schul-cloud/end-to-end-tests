@leftNavigation
Feature:checkLeftNavigation

	@teacherClicksLeftMenuItems
	Scenario Outline: The user logs in as a teacher and clicks the left menu items he should have access to
		When teacher arrives on the Schul-Cloud homepage
		When teacher logs in with email '<teacherUsername>' and password '<password>'
		When teacher performs first login actions: data protection acceptance
		Then clicks left navigation item 'logo'
		Then clicks left navigation item 'dashboard'
		Then clicks left navigation item 'courses'
		Then clicks left navigation item 'teams'
		Then clicks left navigation item 'homework'
		Then clicks left navigation item 'asked homework'
		Then clicks left navigation item 'private homework'
		Then clicks left navigation item 'archived homework'
		Then clicks left navigation item 'files'
		Then clicks left navigation item 'my files'
		Then clicks left navigation item 'course files'
		Then clicks left navigation item 'team files'
		Then clicks left navigation item 'shared files'
		Then clicks left navigation item 'news'
		Then clicks left navigation item 'calendar'
		Then clicks left navigation item 'addons'
		Then clicks left navigation item 'administration'
		Then clicks left navigation item 'admStudents'
		Then clicks left navigation item 'admTeachers'
		Then clicks left navigation item 'admClasses'
		Then clicks left navigation item 'helparea'
		Then clicks left navigation item 'helparticle'
		Then clicks left navigation item 'contact'
		# TODO nuxt pages - the navigation structure is different,
	  	#  therefor leave it for last page otherwise the other pages won't be found
		Then clicks left navigation item 'content'

		Examples:
			| teacherUsername        | password     |
			| lehrer@schul-cloud.org | Schulcloud1! |


@studentClicksLeftMenuItems
	Scenario Outline: The user logs in as a student and clicks the left menu items he should have access to
		When student arrives on the Schul-Cloud homepage
		And student logs in with email '<studentUsername>' and password '<password>'
		And student performs first login actions: data protection acceptance, password change '<password>'
		Then clicks left navigation item 'logo'
		Then clicks left navigation item 'dashboard'
		Then clicks left navigation item 'courses'
		Then clicks left navigation item 'teams'
		Then clicks left navigation item 'homework'
		Then clicks left navigation item 'asked homework'
		Then clicks left navigation item 'private homework'
		Then clicks left navigation item 'archived homework'
		Then clicks left navigation item 'files'
		Then clicks left navigation item 'my files'
		Then clicks left navigation item 'course files'
		Then clicks left navigation item 'team files'
		Then clicks left navigation item 'shared files'
		Then clicks left navigation item 'news'
		Then clicks left navigation item 'calendar'
		Then clicks left navigation item 'addons'
		Then clicks left navigation item 'helparea'
		Then clicks left navigation item 'helparticle'
		Then clicks left navigation item 'contact'
		# TODO nuxt pages - the navigation structure is different,
	  	#  therefor leave it for last page otherwise the other pages won't be found
		Then clicks left navigation item 'content'

		Examples:
			| studentUsername             | password     |
			| paula.meyer@schul-cloud.org | Schulcloud1! |


	@adminClicksLeftMenuItems
	Scenario Outline: The user logs in as an admin and clicks the left menu items he should have access to
		When admin arrives on the Schul-Cloud homepage
		When admin logs in with email '<adminUsername>' and password '<password>'
		When admin performs first login actions: data protection acceptance
		Then clicks left navigation item 'logo'
		Then clicks left navigation item 'dashboard'
		Then clicks left navigation item 'courses'
		Then clicks left navigation item 'teams'
		Then clicks left navigation item 'homework'
		Then clicks left navigation item 'asked homework'
		Then clicks left navigation item 'private homework'
		Then clicks left navigation item 'archived homework'
		Then clicks left navigation item 'files'
		Then clicks left navigation item 'my files'
		Then clicks left navigation item 'course files'
		Then clicks left navigation item 'team files'
		Then clicks left navigation item 'shared files'
		Then clicks left navigation item 'news'
		Then clicks left navigation item 'calendar'
		Then clicks left navigation item 'addons'
		Then clicks left navigation item 'helpdesk'
		Then clicks left navigation item 'administration'
		Then clicks left navigation item 'admStudents'
		Then clicks left navigation item 'admTeachers'
		Then clicks left navigation item 'admClasses'
		Then clicks left navigation item 'admCourses'
		Then clicks left navigation item 'admTeams'
		Then clicks left navigation item 'admSchool'
		Then clicks left navigation item 'helparea'
		Then clicks left navigation item 'helparticle'
		Then clicks left navigation item 'contact'
		# TODO nuxt pages - the navigation structure is different,
	  	#  therefor leave it for last page otherwise the other pages won't be found
		Then clicks left navigation item 'content'

		Examples:
			| adminUsername         | password     |
			| admin@schul-cloud.org | Schulcloud1! |
