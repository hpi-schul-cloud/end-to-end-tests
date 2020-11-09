@visibilityOfMenuItems
Feature:

	Background:
		Given user arrives on the Schul-Cloud homepage

	@visibilityOfAdministrationSubMenuItems
	Scenario Outline:
        And <userRole> logs in
        And <userRole> performs first login actions: data protection acceptance
        When clicks left navigation item 'administration'
        Then <userRole> should see that all sub menu items are visible: '<tabsList>'
        Examples:
            | userRole | tabsList                                       |
            | admin    | SCHÜLER, LEHRER, KURSE, KLASSEN, TEAMS, SCHULE |
            | teacher  | SCHÜLER:INNEN, LEHRER:INNEN, KLASSEN           |
