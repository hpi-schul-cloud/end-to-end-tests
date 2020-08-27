'use strict';

const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

module.exports = {
    selectors: {
        impressum: '#footer li:nth-child(1) > a',
        nutzungsordnungHPISchulCloud: '#footer li:nth-child(2) > a',
        datenschutzerklarungHPISchulCloud: '#footer li:nth-child(3) > a',
        kontakt: '#footer li:nth-child(4) > a',
        team: '#footer li:nth-child(5) > a',
        uberDasProjekt: '#footer li:nth-child(6) > a',
        mitmachen: '#footer li:nth-child(7) > a',
        partner: '#footer li:nth-child(8) > a',
        gitHub: '#footer li:nth-child(9) > a',
        status: '#footer li:nth-child(10) > a',
        sicherheit: '#footer li:nth-child(11) > a'
    },

    clickImpressumFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.impressum);
    },
    
    clickNutzungsordnungHPISchulCloudFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.nutzungsordnungHPISchulCloud);
    },

    clickDatenschutzerklarungHPISchulCloudFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.datenschutzerklarungHPISchulCloud);
    },

    clickKontaktFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.kontakt);
    },

    clickTeamFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.team);
    },

    clickUberDasProjektFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.uberDasProjekt);
    },

    clickMitmachenFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.mitmachen);
    },

    clickPartnerFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.partner);
    },

    clickGitHubFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.gitHub);
    },

    clickStatusHubFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.status);
    },

    clickSicherheitHubFooterLink: async function(){
        await waitHelpers.waitAndClick(this.selectors.sicherheit);
    },
}
