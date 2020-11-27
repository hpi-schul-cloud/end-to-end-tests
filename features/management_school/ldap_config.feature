@management @managementSchool @ldap_config
Feature: Tests for the ldap config pages

    Background: User opens Schul-cloud homepage Website
		Given user arrives on the Schul-Cloud homepage

    @validateLdapInputs
    Scenario Outline: Validate the inputs of the ldap input fields
        Given <userRole> logs in with email '<username>' and password '<password>'
        When <userRole> goes to management 
        And <userRole> goes to school tab
       # And <userRole> adds a ldap system
        #And <userRole> adds '<serverUrl>' to the serverUrl input

        Examples: 
            | userRole | username                     | password        | serverUrl                       | 
            | admin    | kai.admin.qa@schul-cloud.org | Schulcloud1qa!  | ldaps://ldap.schul-cloud.org    | 
