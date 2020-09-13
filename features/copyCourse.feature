
@copyCourse
Feature: copy a created course with different data

Background: teacher is logged in and has created a course
Given teacher arrives on the Schul-Cloud homepage
Given teacher is successfully logged in
Given teacher goes to courses page

@simpleCopyCourse
Scenario Outline: teacher can copy an existing course
Given the teacher creates a course with name <coursename> and
Given the amount of courses is x
When the teacher selects the course <coursename> and clicks clone it
Then the amount of courses is implemented

Examples:
| coursename |
| sample course to be cloned |


@copyCourseWithText
Scenario Outline: teacher can copy course with certain text
Given the teacher creates some with name <coursename>
Given the teacher chooses the created course with <coursename> and
When the teacher adds a Topic with name <topicname>
When the teacher adds some Text <text> to the course
When the teacher clicks copy course <coursename> with Text
Then teacher sees the course <coursename> was copied and the topic <topicname> is still availiable
Examples:
| coursename    | topicname         | text                  |
| sample course | sample topic name | some sample text here |


@copyCourseWithGeoGebra
Scenario Outline: teacher can copy course with certain GeoGebra
Given the teacher creates some with name <coursename>
Given the teacher chooses the created course with <coursename> and
When the teacher adds a Topic with name <topicname>
When the teacher adds some GeoGebraArbeitsblatt with id <geogebraID> to the course
When the teacher clicks copy course <coursename> with GeoGebraArbeitsblatt
Then teacher sees the course <coursename> copy and the GeoGebraArbeitsblatt <topicname> is still availiable
Examples:
| coursename       | topicname | text                  | geogebraID |
| sample course geo| geo topic | some sample text here | ucxngdjf   |

@copyCourseWithEtherpad

Scenario Outline: teacher can copy course with certain Etherpad
Given the teacher creates a course with name <coursename>,
Given the teacher chooses this course with <coursename> and
Given the teacher adds a topic with <topicname>
When the teacher adds some Etherpad with <etherpadName> and <etherpadDescription> to the course
When the teacher clicks copy course <coursename> with Etherpad
Then teacher sees the course <coursename> copy and the Etherpadd <topicname> is still availiable
Examples:
| coursename             | topicname      | etherpadName          | etherpadDescription          |
| sample course etherpad | etherpad topic | etherpad name         | etherpad description here    |

@copyCourseWithStudents
Scenario Outline: teacher can copy course with students
Given the teacher creates a course with name <courseName> and student <studentname>
When the teacher copies the course <courseName> with students
Then the teacher should see the cloned course <courseName> but without students

Examples:
| courseName                  | studentname                 |
| sample course with students | Paula Meyer                 |
