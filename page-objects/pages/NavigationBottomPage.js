'use strict';

const elementHelpers = require("../../runtime/helpers/elementHelpers");

const imprint = '#footer li:nth-child(1) > a';
const termsOfUseOfTheHPISchoolncloud = '#footer li:nth-child(2) > a';
const privacyPolicyOfHPISchoolcloud = '#footer li:nth-child(3) > a';
const contact = '#footer li:nth-child(4) > a';
const team = '#footer li:nth-child(5) > a';
const aboutTheProject = '#footer li:nth-child(6) > a';
const participate = '#footer li:nth-child(7) > a';
const partner = '#footer li:nth-child(8) > a';
const gitHub = '#footer li:nth-child(9) > a';
const status = '#footer li:nth-child(10) > a';
const security = '#footer li:nth-child(11) > a';

// TO DO check if footer text is correct
const imprintTextList = ["Imprint", "Impressum"];
const termsOfUseOfTheHPISchoolncloudTextList = ["Terms of use of the HPI school cloud", "Nutzungsordnung HPI Schul-Cloud"];
const privacyPolicyOfHPISchoolcloudTextList = ["Privacy Policy of HPI school cloud PDF Opens in a new tab", "Datenschutzerklärung HPI Schul-Cloud"];
const contactTextList = ["Contact", "Kontakt"];
const teamTextList = ["Team", "Team"];
const aboutTheProjectTextList = ["About the project", "Über das Projekt"];
const participateTextList = ["Participate", "Mitmachen"];
const partnerTextList = ["Partner", "Partner"];
const gitHubTextList = ["GitHub", "GitHub"];
const statusTextList = ["Status", "Status"];
const securityTextList = ["Security", "Sicherheit"];

async function clickImprintFooterLink () {
    await elementHelpers.clickAndWait(imprint);
}

async function clickTermsOfUseOfTheHPISchoolncloudFooterLink () {
    await elementHelpers.clickAndWait(termsOfUseOfTheHPISchoolncloud);
}

async function clickPrivacyPolicyOfHPISchoolcloudFooterLink () {
    await elementHelpers.clickAndWait(privacyPolicyOfHPISchoolcloud);
}

async function clickContactFooterLink () {
    await elementHelpers.clickAndWait(contact);
}

async function clickTeamFooterLink () {
    await elementHelpers.clickAndWait(team);
}

async function clickAboutTheProjektFooterLink () {
    await elementHelpers.clickAndWait(aboutTheProject);
}

async function clickParticipateFooterLink () {
    await elementHelpers.clickAndWait(participate);
}

async function clickPartnerFooterLink () {
    await elementHelpers.clickAndWait(partner);
}

async function clickGitHubFooterLink () {
    await elementHelpers.clickAndWait(gitHub);
}

async function clickStatusFooterLink () {
    await elementHelpers.clickAndWait(status);
}

async function clickSecurityFooterLink () {
    await elementHelpers.clickAndWait(security);
}

module.exports = {
    clickImprintFooterLink,
    clickTermsOfUseOfTheHPISchoolncloudFooterLink,
    clickPrivacyPolicyOfHPISchoolcloudFooterLink,
    clickContactFooterLink,
    clickTeamFooterLink,
    clickAboutTheProjektFooterLink,
    clickParticipateFooterLink,
    clickPartnerFooterLink,
    clickGitHubFooterLink,
    clickStatusFooterLink,
    clickSecurityFooterLink,
}
