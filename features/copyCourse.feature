@copyCourse
Feature: Copy a created course with different data

	Background: teacher is logged in and has created a course
		Given teacher arrives on the Schul-Cloud homepage
		And teacher logs in
		And teacher performs first login actions: data protection acceptance
		And teacher goes to courses page

	@simpleCopyCourse
	Scenario Outline: teacher can copy an existing course
		When teacher creates course with name '<courseName>'
		And teacher enters course name '<courseName>' into search field
		Then teacher should see that amount of courses with name '<courseName>' is '1'
		When teacher chooses course with name '<courseName>'
		And teacher clicks Duplicate-course button
		And teacher goes to courses page
		Then teacher should see that cloned course with name '<courseName> - Kopie' is visible on the list
		And teacher should see that amount of courses with name '<courseName> - Kopie' is '1'
		Examples:
			| courseName                 |
			| sample course to be cloned |


	@copyCourseWithText
	Scenario Outline: teacher can copy course with certain text
		Given teacher creates course with name '<courseName>'
		And teacher chooses course with name '<courseName>'
		And teacher adds a topic with name '<topicName>'
		And teacher adds content Text with title '<contentTitle>' and description '<contentDescription>'
		And teacher clicks Save-changes button
		And teacher goes to courses page
		And teacher chooses course with name '<courseName>'
		And teacher clicks Duplicate-course button
		And teacher goes to courses page
		Then teacher should see that course with name '<courseName> - Kopie' is visible on the list
		And teacher should see that copied course with name '<courseName> - Kopie' contains topic with name '<topicName>'
		Examples:
			| courseName    | topicName         | contentTitle      | contentDescription |
			| sample course | sample topic name | test text content | test description   |


	@copyCourseWithGeoGebra
	Scenario Outline: teacher can copy course with certain GeoGebra
		Given teacher creates course with name '<courseName>'
		And teacher chooses course with name '<courseName>'
		When teacher adds a topic with name '<topicName>'
		And teacher adds content GeoGebraArbeitsblatt with id '<geogebraID>'
		And teacher clicks Save-changes button
		And teacher goes to courses page
		And teacher chooses course with name '<courseName>'
		And teacher clicks Duplicate-course button
		And teacher goes to courses page
		Then teacher should see that cloned course with name '<courseName> - Kopie' is visible on the list
		And teacher should see that copied course with name '<courseName> - Kopie' contains topic with name '<topicName>'
		Examples:
			| courseName        | topicName | text                  | geogebraID |
			| sample course geo | geo topic | some sample text here | ucxngdjf   |

    #@copyCourseWithMaterial
    #Scenario Outline: teacher can copy course with certain Material
    #Given teacher creates course with name '<courseName>'
    #And teacher chooses course with name '<courseName>'
    #And teacher adds a topic with name '<topicName>'
    #When teacher adds content Material
    #And teacher clicks Save-changes button
    #And teacher goes to courses page
    #And teacher chooses course with name '<courseName>'
    #And teacher clicks Duplicate-course button
    #And teacher goes to courses page
    #Then teacher should see that copied course with name '<courseName> - Kopie' is visible on the list
    #And teacher should see that copied course with name '<courseName> - Kopie' contains topic with name '<topicName>'
    #Examples:
    #| courseName             | topicName      | text                  |
    #| sample course material | material topic | some sample text here |


	@copyCourseWithEtherpad
	Scenario Outline: teacher can copy course with certain Etherpad
		Given teacher creates course with name '<courseName>'
		And teacher chooses course with name '<courseName>'
		And teacher adds a topic with name '<topicName>'
		When teacher adds content Etherpad with name '<etherpadName>' and description '<etherpadDescription>'
		And teacher clicks Save-changes button
		And teacher goes to courses page
		And teacher chooses course with name '<courseName>'
		And teacher clicks Duplicate-course button
		And teacher goes to courses page
		Then teacher should see that cloned course with name '<courseName> - Kopie' is visible on the list
		And teacher should see that copied course with name '<courseName> - Kopie' contains topic with name '<topicName>'
		Examples:
			| courseName             | topicName      | etherpadName  | etherpadDescription       |
			| sample course etherpad | etherpad topic | etherpad name | etherpad description here |

	@copyCourseWithStudents
	Scenario Outline: teacher can copy course with students
		Given teacher creates course with name '<courseName>' and student '<studentName>'
		And teacher goes to courses page
		And teacher chooses course with name '<courseName>'
		And teacher clicks Duplicate-course button
		And teacher goes to courses page
		Then teacher should see that cloned course with name '<courseName> - Kopie' is visible on the list
		And teacher should see that cloned course with name '<courseName> - Kopie' contains number of members '<membersCount>'
		Examples:
			| courseName                  | studentName | membersCount |
			| sample course with students | Paula Meyer | 0            |
