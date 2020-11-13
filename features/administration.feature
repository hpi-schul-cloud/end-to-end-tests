@administration

Feature: Administrate pupils, classes and teachers
	As an Schul-Cloud user I want to be able to administrate pupils, teachers and classes

	Background:
		Given user arrives on the Schul-Cloud homepage

	@createNewStudent
	Scenario Outline: user creates a student
		Given <userRole> logs in with email '<adminsUsername>' and password '<adminPassword>'
		And '<userRole>' performs first login actions
		And <userRole> goes to administration
		And <userRole> goes to students administration
		When <userRole> set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>'
		And <userRole> sees that student with email '<studentEmail>' is visible on the list
		And <userRole> manually submits consent for user with e-mail '<studentEmail>', thus generates a random password for him
		And <userRole> logs out
		And student logs in with email '<studentEmail>' and password genarated by admin during manual submission of consent
		Then student should see that data protection is already accepted and performs first login actions: password change '<newPasswordStudent>'
		Examples:
			| userRole | firstName | secondName | studentEmail              | adminsUsername        | adminPassword | newPasswordStudent |
			| admin    | Georg     | Georgmann  | georgmann@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!  | Schulcloud1!!      |

	@editStudent
	Scenario Outline: user edits a student
		Given <userRole> logs in with email '<adminsUsername>' and password '<adminsPassword>'
		And '<userRole>' performs first login actions
		And <userRole> goes to administration
		And <userRole> goes to students administration
		And <userRole> clicks Edit-student button
		When <userRole> changes student firstname to '<newFirstName>'
		And <userRole> changes student lastname to '<newLastName>'
		And <userRole> changes student email to '<newEmail>'
		And <userRole> changes student birthdate to '<newBirthdate>'
		And <userRole> clicks Save-changes button
		Then <userRole> should see that edited student firstname '<newFirstName>' is visible on the list
		And <userRole> should see that edited student lastname '<newLastName>' is visible on the list
		And <userRole> should see that edited student email '<newEmail>' is is visible on the list
		And <userRole> clicks Edit-student button
		Then <userRole> should see that student birthdate is '<newBirthdate>'

		Examples:
			| userRole | newFirstName | newLastName | newEmail                    | adminsUsername        | adminsPassword | newBirthdate |
			| admin    | Nils         | Nilsen      | nils.nilsen@schul-cloud.org | admin@schul-cloud.org | Schulcloud1!   | 24.12.2004   |

	@deleteStudent
	Scenario Outline: As an admin, I want to be able to delete the user
		Given <userRole> logs in with email '<adminUsername>' and password '<adminPassword>'
		And <userRole> login is successful
		And <userRole> goes to administration
		And <userRole> goes to students administration
		When <userRole> clicks Edit-student with '<Email>' button
		And <userRole> clicks Delete button
		And <userRole> clicks Delete button inside popup
		Then <userRole> should see that user with email '<Email>' is not visible on the list
		Examples:
			| userRole | adminUsername                   | adminPassword   | Email					           |
			| admin    | kai.admin.qa@schul-cloud.org    | Schulcloud1qa!  | amelia.strobl.qa@schul-cloud.org  |
