/*[url/teams/[teamId]events]*/
'use strict';

const { CLIENT } = require("../../../shared-objects/servers");
// team internal options
const eventsTab = 'div[data-testid="team_events"]';

// team events:
const nameTeamEvent = 'input[data-testid="team_event_name"]';
const descriptionTeamEvent = 'input[data-testid="description_team_event"]';
const locationTeamEvent = 'input[data-testid="team_event_location"]';
