@leftNavigation
Feature:checkLeftNavigation

	Background:
		Given user arrives on the Schul-Cloud homepage

	@teacherClicksLeftMenuItems
	Scenario Outline: The user logs in as a teacher and clicks the left menu items he should have access to
		When teacher logs in with email '<teacherUsername>' and password '<password>'
		And teacher performs first login actions: data protection acceptance
		Then teacher clicks left navigation item 'logo'
		And teacher clicks left navigation item 'dashboard'
		And teacher clicks left navigation item 'courses'
		And teacher clicks left navigation item 'teams'
		And teacher clicks left navigation item 'homework'
		And teacher clicks left navigation item 'asked homework'
		And teacher clicks left navigation item 'private homework'
		And teacher clicks left navigation item 'archived homework'
		And teacher clicks left navigation item 'files'
		And teacher clicks left navigation item 'my files'
		And teacher clicks left navigation item 'course files'
		And teacher clicks left navigation item 'team files'
		And teacher clicks left navigation item 'shared files'
		And teacher clicks left navigation item 'news'
		And teacher clicks left navigation item 'calendar'
		And teacher clicks left navigation item 'addons'
		And teacher clicks left navigation item 'administration'
		And teacher clicks left navigation item 'admStudents'
		And teacher clicks left navigation item 'admTeachers'
		And teacher clicks left navigation item 'admClasses'
		And teacher clicks left navigation item 'helparea'
		And teacher clicks left navigation item 'helparticle'
		And teacher clicks left navigation item 'contact'
		# TODO nuxt pages - the navigation structure is different,
		#  therefor leave it for last page otherwise the other pages won't be found
		And clicks left navigation item 'content'

		Examples:
			| teacherUsername        | password     |
			| lehrer@schul-cloud.org | Schulcloud1! |


	@studentClicksLeftMenuItems
	Scenario Outline: The user logs in as a student and clicks the left menu items he should have access to
		When student logs in with email '<studentUsername>' and password '<password>'
		And student performs first login actions: data protection acceptance, password change '<password>'
		Then student clicks left navigation item 'logo'
		And student clicks left navigation item 'dashboard'
		And student clicks left navigation item 'courses'
		And student clicks left navigation item 'teams'
		And student clicks left navigation item 'homework'
		And student clicks left navigation item 'asked homework'
		And student clicks left navigation item 'private homework'
		And student clicks left navigation item 'archived homework'
		And student clicks left navigation item 'files'
		And student clicks left navigation item 'my files'
		And student clicks left navigation item 'course files'
		And student clicks left navigation item 'team files'
		And student clicks left navigation item 'shared files'
		And student clicks left navigation item 'news'
		And student clicks left navigation item 'calendar'
		And student clicks left navigation item 'addons'
		And student clicks left navigation item 'helparea'
		And student clicks left navigation item 'helparticle'
		And student clicks left navigation item 'contact'
		# TODO nuxt pages - the navigation structure is different,
		#  therefor leave it for last page otherwise the other pages won't be found
		And clicks left navigation item 'content'

		Examples:
			| studentUsername             | password     |
			| paula.meyer@schul-cloud.org | Schulcloud1! |


	@adminClicksLeftMenuItems
	Scenario Outline: The user logs in as an admin and clicks the left menu items he should have access to
		When admin logs in with email '<adminUsername>' and password '<password>'
		And admin performs first login actions: data protection acceptance
		Then admin clicks left navigation item 'logo'
		And admin clicks left navigation item 'dashboard'
		And admin clicks left navigation item 'courses'
		And admin clicks left navigation item 'teams'
		And admin clicks left navigation item 'homework'
		And admin clicks left navigation item 'asked homework'
		And admin clicks left navigation item 'private homework'
		And admin clicks left navigation item 'archived homework'
		And admin clicks left navigation item 'files'
		And admin clicks left navigation item 'my files'
		And admin clicks left navigation item 'course files'
		And admin clicks left navigation item 'team files'
		And admin clicks left navigation item 'shared files'
		And admin clicks left navigation item 'news'
		And admin clicks left navigation item 'calendar'
		And admin clicks left navigation item 'addons'
		And admin clicks left navigation item 'helpdesk'
		And admin clicks left navigation item 'administration'
		And admin clicks left navigation item 'admStudents'
		And admin clicks left navigation item 'admTeachers'
		And admin clicks left navigation item 'admClasses'
		And admin clicks left navigation item 'helparea'
		And admin clicks left navigation item 'helparticle'
		And admin clicks left navigation item 'contact'
		# TODO nuxt pages - the navigation structure is different,
		#  therefor leave it for last page otherwise the other pages won't be found
		And clicks left navigation item 'content'

		Examples:
			| adminUsername         | password     |
			| admin@schul-cloud.org | Schulcloud1! |
