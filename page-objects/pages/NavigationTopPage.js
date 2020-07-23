'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

module.exports = {
    selectors: {
        navItemHelp="",
    },
    clickNavItemHelp: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemHelp);
        }
}