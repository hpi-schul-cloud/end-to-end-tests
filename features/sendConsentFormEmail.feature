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
		And <userRole> set student firstname '<firstName>', lastname '<secondName>', email '<studentEmail>'
		When <userRole> clicks Send-links-to-students'-e-mail-addresses button
		Then email is sent to '<studentEmail>' students without a full declaration of consent

		Examples:
			| userRole | adminsUsername        | adminsPassword | firstName | secondName | studentEmail |
			| admin    | admin@schul-cloud.org | Schulcloud1!   | GGG 		| DDD 		 | ggg@schul-cloud.org |

