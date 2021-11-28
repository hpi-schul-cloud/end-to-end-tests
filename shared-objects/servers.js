'use strict';

// STATIC DATA FROM ENV + DEFAULTS
const config = {
	CLIENT: {
		PROTOCOLL: process.env.IT_CLIENT_PROTOCOLL || 'http',
		HOST: process.env.IT_CLIENT_HOST || 'localhost',
		PORT: process.env.IT_CLIENT_PORT || '4000',
		get URL() {
			//return 'https://nbc-bc-485-yulia.cd.dbildungscloud.dev';
			return `${config.CLIENT.PROTOCOLL}://${config.CLIENT.HOST}:${config.CLIENT.PORT}`;
		},
	},
	SERVER: {
		PROTOCOLL: process.env.IT_SERVER_PROTOCOLL || 'http',
		HOST: process.env.IT_SERVER_HOST || 'localhost',
		PORT: process.env.IT_SERVER_PORT || '3030',
		get URL() {
			return `${config.SERVER.PROTOCOLL}://${config.SERVER.HOST}:${config.SERVER.PORT}`;
			//return 'https://nbc-bc-485-yulia.cd.dbildungscloud.dev/api/v1'
		},
	},
	MANAGEMENT_SERVER: {
		PROTOCOLL: process.env.IT_MANAGEMENT_SERVER_PROTOCOLL || 'http',
		HOST: process.env.IT_MANAGEMENT_SERVER_HOST || 'localhost',
		PORT: process.env.IT_MANAGEMENT_SERVER_PORT || '3333',
		get URL() {
			return `${config.SERVER.PROTOCOLL}://${config.SERVER.HOST}:${config.SERVER.PORT}`;
		//	return 'http://mgmt-svc.nbc-bc-485-yulia.svc.cluster.local:3333/api/management/database/seed';
		},
	},
};

module.exports = config;
