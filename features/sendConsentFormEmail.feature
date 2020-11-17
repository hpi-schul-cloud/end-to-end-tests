@email
Feature: Test set for sending emails

	Background:
		Given user arrives on the Schul-Cloud homepage

	@sendConsentFormEmail
	Scenario Outline: As a user, I want to be able to send emails to all students without a full declaration of consent.
		When <userRole> logs in with email '<username>' and password '<password>'
		And <userRole> performs first login actions: data protection acceptance
		When <userRole> goes to administration
		And <userRole> goes to students administration
		And <userRole> set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>'
		When <userRole> clicks Send-links-to-students'-e-mail-addresses button
		Then email is sent to '<studentEmail>' students without a full declaration of consent
		Examples:
			| userRole | username              | password     | firstName | secondName | studentEmail        |
			| admin    | admin@schul-cloud.org | Schulcloud1! | GGG       | DDD        | ggg@schul-cloud.org |
