@news
Feature: Different options for news. I would like to test whether users with different permissions can see my news
Background: I am logged in as a teacher and I create some news
Given teacher goes to the home page
Given teacher is successfully logged-in

@newsIsVisible
Scenario: User can see the news
When teacher creats some news which has to be published immediately
When a user who has permissions to see the news logs in
When he goes to the news page
Then he can see the news

@newsIsNotVisible
Scenario: User  cannot see the news if the news is not due yet
When teacher creats some news which has to be published later
When a pupil logs in
When he goes to news page
Then he cannot see the news which is not due yet

# @teamnews
# Scenario: teacher creates team news and this news can only be visible for team members
# When teacher creates two teams team and news for these teams
# Then team member can see the news
# Then team non-members cannot see the news
