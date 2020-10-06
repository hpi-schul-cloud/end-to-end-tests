/*[url/teams/[teamId]news]*/
'use strict';

const { CLIENT } = require("../../../shared-objects/servers");

// team internal options
const newsTab = 'button[data-tab="js-news"]';

/* name of the data-testid is missleading*/
const createNwsBtn = 'a[data-testid="create_a_team"]';
