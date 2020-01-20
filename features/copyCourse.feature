
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

#500 ERROR
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

#OK
@copyCourseWithNeXboard
Scenario: teacher can copy course with certain NeXboard
When the teacher adds some NeXboard to the course
When the teacher clicks copy course with NeXboard
Then teacher sees the course copy and the NeXboard is still availiable

# OK, verify-Methode fehlt noch
# @copyCourseWithEtherpad
# Scenario: teacher can copy course with certain Etherpad
# When the teacher adds some Etherpad to the course
# When the teacher edits the content of the etherpad
# When the teacher clicks copy course with Etherpad
# Then teacher sees the course copy and the Etherpad is still availiable

#Links???
# @copyCourseWithInternComponents
# Scenario: teacher can copy course with certain InternComponents
# When the teacher adds some InternComponents to the course
# When the teacher clicks copy course with InternComponents
# Then teacher sees the course copy and the InternComponents is (are) still availiable 

#OK
@copyCourseWithPupils
Scenario: teacher can copy course with pupils
When the teacher copies the course with pupils
Then the teacher should see the cloned course but without pupils



