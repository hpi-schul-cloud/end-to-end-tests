@visibilityOfDialoguesTabsForTheTeacher


Feature:  logging in as a teacher without administrator's role
I want to be able to perform normal teacher administration options (look at classes / add students to class)
Background:
	Given teacher arrives on the Schul-Cloud homepage
	Given The Teacher is logged in successfully

Scenario:
    Then The Teacher should accept the data protection
    When The Teacher goes to Verwaltung page
    Then Verify if all required tabs are visible in Verwaltung area
    | tabs         |
    |SCHÜLER:INNEN | 
    | LEHRER:INNEN | 
    | KLASSEN      |
