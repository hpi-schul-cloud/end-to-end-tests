'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
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
        await waitHelpers.waitAndClick(impressum);
    },

    clickNutzungsordnungHPISchulCloudFooterLink: async function () {
        await waitHelpers.waitAndClick(nutzungsordnungHPISchulCloud);
    },

    clickDatenschutzerklarungHPISchulCloudFooterLink: async function () {
        await waitHelpers.waitAndClick(datenschutzerklarungHPISchulCloud);
    },

    clickKontaktFooterLink: async function () {
        await waitHelpers.waitAndClick(kontakt);
    },

    clickTeamFooterLink: async function () {
        await waitHelpers.waitAndClick(team);
    },

    clickUberDasProjektFooterLink: async function () {
        await waitHelpers.waitAndClick(uberDasProjekt);
    },

    clickMitmachenFooterLink: async function () {
        await waitHelpers.waitAndClick(mitmachen);
    },

    clickPartnerFooterLink: async function () {
        await waitHelpers.waitAndClick(partner);
    },

    clickGitHubFooterLink: async function () {
        await waitHelpers.waitAndClick(gitHub);
    },

    clickStatusHubFooterLink: async function () {
        await waitHelpers.waitAndClick(status);
    },

    clickSicherheitFooterLink: async function () {
        await waitHelpers.waitAndClick(sicherheit);
    },
}
