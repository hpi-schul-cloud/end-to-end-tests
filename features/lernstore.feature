@lernstore

Feature: different actions in lernstore
Background: a teacher logs in and creates a course
Given teacher arrives on the Schul-Cloud homepage
Given teacher logs in
Given teacher accepts data protection
Given teacher goes to courses page

@lernstoreAddMaterialFromContentDetailView
Scenario Outline: teacher can add material to topic of course from content detail view
Given teacher creates course with name '<courseName>'
Given teacher chooses course with name '<courseName>'
And teacher adds a topic with name '<topicName>'
And teacher adds some Lerstore material with <lerstoreTopicName> to the course
Then teacher must be redirected to content page
When teacher searches for content <content>
Then teacher must see the right number of materials <content> 
When teacher clicks on content-card after request <content>
And teacher clicks add-btn
When teacher selects course <courseName> and topic <topicName>
And teacher clicks on add content button
When teacher goes to topic <topicName> of course <courseName>
Then teacher should see added material
Examples:
    | courseName          | topicName             | lerstoreTopicName | content |
    | courseWithLernstore | Topic with Lernstore  | LernstoreTest     | Mathe   |

#add one more testcase accessing lernstore as the first step
# add test case clicking add btn
