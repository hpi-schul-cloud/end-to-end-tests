/*[url/teams]*/
'use strict';

const { CLIENT } = require("../../../shared-objects/servers");

module.exports ={
    url: `${CLIENT.URL}/teams`,
    addTeamURL: `${CLIENT.URL}/teams/add`,
    teamsContainer: 'div[data-testid="courses"]'
}
