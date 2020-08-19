/*[url/teams/[teamId]events]*/
'use strict';

const { CLIENT } = require("../../../shared-objects/servers");

module.exports ={
	// team internal options
	eventsTab: 'div[data-testid="team_events"]',

	// team events:
	nameTeamEvent: 'input[data-testid="team_event_name"]',
	descriptionTeamEvent: 'input[data-testid="description_team_event"]',
	locationTeamEvent: 'input[data-testid="team_event_location"]',
}
