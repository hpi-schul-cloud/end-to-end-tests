/*[url/teams/[teamId]news]*/
'use strict';

const { CLIENT } = require("../../../shared-objects/servers");

module.exports ={
	// team internal options
	newsTab: 'button[data-tab="js-news"]',

	/* name of the data-testid is missleading*/
	createNwsBtn: 'a[data-testid="create_a_team"]'
}
