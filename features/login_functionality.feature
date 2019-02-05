Feature: Login Functionality Feature
    In order to ensure Login Functionality works,
    I want to run the cucumber test to verify it is working

    Scenario Outline: Login Funtionality
    Given user navigates to 'http://localhost:3100/'
    When user logs in using Username '<username>' and Password '<password>'
    Then login should be successful

    Examples:
    | username | password |
    | schueler@schul-cloud.org | Schulcloud1! |
    