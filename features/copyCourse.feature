@copyCourse
Feature: Copy a created course with different data

	Background:
		Given User arrives on the Schul-Cloud homepage

	@simpleCopyCourse
	Scenario Outline: As a user, I want to be able to copy an existing course
		When <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		When <userRole> creates course with name '<courseName>'
		And <userRole> enters course name '<courseName>' into search field
		Then <userRole> should see that amount of courses with name '<courseName>' is '<amount>'
		When <userRole> chooses course with name '<courseName>'
		And <userRole> clicks Duplicate-course button
		And <userRole> goes to courses page
		Then <userRole> should see that cloned course with name '<courseName> - Kopie' is visible on the list
		And <userRole> should see that amount of courses with name '<courseName> - Kopie' is '<amount>'
		Examples:
			| userRole | courseName                 | amount |
			| teacher  | sample course to be cloned | 1      |

	@copyCourseWithDescription
	Scenario Outline: As a user, I want to be able to copy course with certain text
		When <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		When <userRole> creates course with name '<courseName>'
		And <userRole> chooses course with name '<courseName>'
		And <userRole> adds a topic with name '<topicName>'
		And <userRole> adds content <contentType> with title '<contentTitle>' and description '<contentDescription>'
		And <userRole> clicks Save-changes button
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> clicks Duplicate-course button
		And <userRole> goes to courses page
		Then <userRole> should see that course with name '<courseName> - Kopie' is visible on the list
		And <userRole> should see that copied course with name '<courseName> - Kopie' contains topic with name '<topicName>'
		Examples:
			| userRole | courseName             | topicName         | contentType | contentTitle          | contentDescription        |
			| teacher  | sample course          | sample topic name | Text        | test text content     | test description          |
			| teacher  | sample course etherpad | etherpad topic    | Etherpad    | etherpad name         | etherpad description here |
			| teacher  | sample course geo      | geo topic         | GeoGebra    | some sample text here | ucxngdjf                  |

#	@copyCourseWithMaterial
#	Scenario Outline: As a user, I want to be able to copy course with certain Material
#		When <userRole> logs in
#		And <userRole> performs first login actions: data protection acceptance
#		And <userRole> goes to courses page
#		And <userRole> creates course with name '<courseName>'
#		And <userRole> chooses course with name '<courseName>'
#		And <userRole> adds a topic with name '<topicName>'
#		When <userRole> adds content Material
#		And <userRole> clicks Save-changes button
#		And <userRole> goes to courses page
#		And <userRole> chooses course with name '<courseName>'
#		And <userRole> clicks Duplicate-course button
#		And <userRole> goes to courses page
#		Then <userRole> should see that copied course with name '<courseName> - Kopie' is visible on the list
#		And <userRole> should see that copied course with name '<courseName> - Kopie' contains topic with name '<topicName>'
#		Examples:
#			| userRole | courseName             | topicName      | text                  |
#			| teacher  | sample course material | material topic | some sample text here |

	@copyCourseWithStudents
	Scenario Outline: As a user, I want to be able to copy course with students
		When <userRole> logs in
		And <userRole> performs first login actions: data protection acceptance
		And <userRole> goes to courses page
		And <userRole> creates course with name '<courseName>' and student '<studentName>'
		And <userRole> goes to courses page
		And <userRole> chooses course with name '<courseName>'
		And <userRole> clicks Duplicate-course button
		And <userRole> goes to courses page
		Then <userRole> should see that cloned course with name '<courseName> - Kopie' is visible on the list
		And <userRole> should see that cloned course with name '<courseName> - Kopie' contains number of members '<membersCount>'
		Examples:
			| userRole | courseName                  | studentName | membersCount |
			| teacher  | sample course with students | Paula Meyer | 0            |
