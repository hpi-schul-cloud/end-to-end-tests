
Feature: copy a created course with different data

Background: teacher is logged in and has created a course
Given teacher goes to the home page
Given teacher is successfully logged in
Given goes the course page

@copyCourse
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
When the teacher adds a topic with name <topicname>
When the teacher adds some Text <text> to the course
When the teacher clicks copy course <coursename> with Text
Then teacher sees the course <coursename> was copied and the topic <topicname> is still availiable
Examples:
| coursename    | topicname         | text                  |
| sample course | sample topic name | some sample text here |


@copyCourseWithGeoGebraArbeitsblatt
Scenario Outline: teacher can copy course with certain GeoGebraArbeitsblatt
Given the teacher creates one course with name <coursename> and 
Given the teacher chooses the course with <coursename> and
Given the teacher adds a topic with topicname <topicname> and 
When the teacher adds some GeoGebraArbeitsblatt with id <geogebraID> to the course
When the teacher clicks copy course <coursename> with GeoGebraArbeitsblatt
Then teacher sees the course <coursename> copy and the GeoGebraArbeitsblatt <topicname> is still availiable
Examples:
| coursename       | topicname | text                  | geogebraID |
| sample course geo| geo topic | some sample text here | ucxngdjf   |

@copyCourseWithMaterial

Scenario Outline: teacher can copy course with certain Material
Given the teacher creates a course with name <coursename>, 
Given the teacher chooses this course with <coursename> and
Given the teacher adds a topic with <topicname> 
When the teacher adds some Material  to the course
When the teacher clicks copy course <coursename> with Material
Then teacher sees the course <coursename> copy and the material <topicname> is still availiable
Examples:
| coursename             | topicname      | text                  | 
| sample course material | material topic | some sample text here | 


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
Scenario: teacher can copy course with students
Given the teacher creates a course with name <coursename> and student <studentname>, 
When the teacher copies the course <coursename> with students
Then the teacher should see the cloned course <coursename> but without students

Examples:
| coursename                  | studentname                 | 
| sample course with students | Paula Meyer                 | 

