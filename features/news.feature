@news
Feature: Different options for news. I would like to test whether users with different permissions can see my news
Background: I am logged in as a teacher and I create some news
Given I am logged in as a teacher
Given I create some news

@newsIsVisible
Scenario: User with permission can see the news
When a user who has permissions to see the news logs in
When he goes to the news page
Then he can see the news

@newsIsNotVisible
Scenario: User mithout permission cannot see the news
When a user who has no permissions logs in
When he goes to news page
Then he cannot see the news
