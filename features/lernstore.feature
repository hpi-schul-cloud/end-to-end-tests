@lernstore

Feature: different actions in lernstore
Background: a teacher logs in and creates a course
Given user arrives on the Schul-Cloud homepage




@lernstoreAddMaterialFromContentDetailView
Scenario Outline: teacher can add material to topic of course from content detail view
Given <userRole> logs in with email '<username>' and password '<password>'
Given teacher performs first login actions: data protection acceptance
Given teacher goes to courses page
Given <userRole> creates course with name '<courseName>'
Given <userRole> chooses course with name '<courseName>'
And <userRole> adds a topic with name '<topicName>'
And <userRole> adds some Lerstore material with <lerstoreTopicName> to the course
Then <userRole> must be redirected to content page
When <userRole> searches for content <contentName>
Then <userRole> must see the right number of materials <contentName> 
When <userRole> clicks on content-card after request <contentName>
And <userRole> clicks add-btn
When <userRole> selects course <courseName> and topic <topicName>
And <userRole> clicks on add content button
And <userRole> goes to courses page
And <userRole> chooses course with name '<courseName>'
When <userRole> clicks on topic with name '<topicName>'
Then <userRole> should see added material
Examples:
    |userRole | username                  | password     | courseName          | topicName             | lerstoreTopicName | contentName |
    |teacher  | klara.fall@schul-cloud.org| Schulcloud1! | courseWithLernstore | Topic with Lernstore  | LernstoreTest     | Mathe       |



