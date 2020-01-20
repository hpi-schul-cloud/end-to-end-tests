
Feature: copy a created course with different data


Background: teacher is logged in and has created a course
Given teacher goes to the home page
Given teacher is successfully logged in
#Given teacher has accepted the data protection agreement
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



#Now we test it with Themas

#notOK
@copyCourseWithText
Scenario: teacher can copy course with certain text
When the teacher adds some Text to the course
When the teacher adds a topic
When the teacher clicks copy course with Text
Then teacher sees the course copy and the Text is still availiable

#OK
@copyCourseWithGeoGebraArbeitsblatt
Scenario: teacher can copy course with certain GeoGebraArbeitsblatt
When the teacher adds some GeoGebraArbeitsblatt to the course
When the teacher clicks copy course with GeoGebraArbeitsblatt
Then teacher sees the course copy and the GeoGebraArbeitsblatt is still availiable

#500 ERROR
@copyCourseWithMaterial
Scenario: teacher can copy course with certain Material
When the teacher adds some Material to the course
When the teacher clicks copy course with Material
Then teacher sees the course copy and the Material is still availiable

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



