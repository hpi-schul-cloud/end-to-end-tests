'use strict';

const elementHelpers = require("../../runtime/helpers/elementHelpers");

const impressum = '#footer li:nth-child(1) > a';
const nutzungsordnungHPISchulCloud = '#footer li:nth-child(2) > a';
const datenschutzerklarungHPISchulCloud = '#footer li:nth-child(3) > a';
const kontakt = '#footer li:nth-child(4) > a';
const team = '#footer li:nth-child(5) > a';
const uberDasProjekt = '#footer li:nth-child(6) > a';
const mitmachen = '#footer li:nth-child(7) > a';
const partner = '#footer li:nth-child(8) > a';
const gitHub = '#footer li:nth-child(9) > a';
const status = '#footer li:nth-child(10) > a';
const sicherheit = '#footer li:nth-child(11) > a';

module.exports = {
    clickImpressumFooterLink: async function () {
        await elementHelpers.click(impressum);
    },

    clickNutzungsordnungHPISchulCloudFooterLink: async function () {
        await elementHelpers.click(nutzungsordnungHPISchulCloud);
    },

    clickDatenschutzerklarungHPISchulCloudFooterLink: async function () {
        await elementHelpers.click(datenschutzerklarungHPISchulCloud);
    },

    clickKontaktFooterLink: async function () {
        await elementHelpers.click(kontakt);
    },

    clickTeamFooterLink: async function () {
        await elementHelpers.click(team);
    },

    clickUberDasProjektFooterLink: async function () {
        await elementHelpers.click(uberDasProjekt);
    },

    clickMitmachenFooterLink: async function () {
        await elementHelpers.click(mitmachen);
    },

    clickPartnerFooterLink: async function () {
        await elementHelpers.click(partner);
    },

    clickGitHubFooterLink: async function () {
        await elementHelpers.click(gitHub);
    },

    clickStatusHubFooterLink: async function () {
        await elementHelpers.click(status);
    },

    clickSicherheitFooterLink: async function () {
        await elementHelpers.click(sicherheit);
    },
}
