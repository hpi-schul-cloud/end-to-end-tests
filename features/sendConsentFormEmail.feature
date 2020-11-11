@email
Feature: Test set for sending emails
	Background:
		Given user arrives on the Schul-Cloud homepage

	@sendConsentFormEmail
	Scenario Outline: Send emails to all students without a full declaration of consent.
		When <userRole> logs in with email '<adminsUsername>' and password '<adminsPassword>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> goes to administration
		And <userRole> goes to students administration
		When <userRole> clicks Send-links-to-students'-e-mail-addresses button
		Then email is sent to all students without a full declaration of consent

		Examples:
			| userRole | adminsUsername        | adminsPassword |
			| admin    | admin@schul-cloud.org | Schulcloud1!   |
