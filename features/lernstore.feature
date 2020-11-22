@lernstore

Feature: different actions in lernstore
Background: load Schul-Cloud page

Given user arrives on the Schul-Cloud homepage

@lernstoreAddMaterialFromContentDetailView
Scenario Outline: teacher can add material to topic of course from content detail view
When <userRole> logs in
And <userRole> goes to courses page
And <userRole> creates course with name '<courseName>'
And <userRole> adds a topic with name '<topicName>'
And <userRole> adds some Lerstore material with <lerstoreTopicName> to the course
Then <userRole> must be redirected to content page
When <userRole> searches for content <contentName>
Then <userRole> must see the right number of materials <contentName> 
When <userRole> clicks on content-card after request <contentName>
And <userRole> clicks add-btn
And <userRole> selects course <courseName> and topic <topicName>
And <userRole> clicks on add content button
And <userRole> goes to courses page
And <userRole> chooses course with name '<courseName>'
And <userRole> clicks on topic with name '<topicName>'
Then <userRole> should see added material
Examples:
    |userRole | courseName          | topicName             | lerstoreTopicName | contentName |
    |teacher  | courseWithLernstore | Topic with Lernstore  | LernstoreTest     | Mathe       |



