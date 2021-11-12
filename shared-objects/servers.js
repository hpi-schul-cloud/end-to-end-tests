'use strict';

// STATIC DATA FROM ENV + DEFAULTS
const config = {
	CLIENT: {
		PROTOCOLL: process.env.IT_CLIENT_PROTOCOLL || 'http',
		HOST: process.env.IT_CLIENT_HOST || 'localhost',
		PORT: process.env.IT_CLIENT_PORT || '4000',
		get URL() {
			return 'https://nbc-main.cd.dbildungscloud.dev/login/';
			//return `${config.CLIENT.PROTOCOLL}://${config.CLIENT.HOST}:${config.CLIENT.PORT}`;
		},
	},
	SERVER: {
		PROTOCOLL: process.env.IT_SERVER_PROTOCOLL || 'http',
		HOST: process.env.IT_SERVER_HOST || 'localhost',
		PORT: process.env.IT_SERVER_PORT || '3030',
		get URL() {
			return `${config.SERVER.PROTOCOLL}://${config.SERVER.HOST}:${config.SERVER.PORT}`;
		},
	},
	MANAGEMENT_SERVER: {
		PROTOCOLL: process.env.IT_MANAGEMENT_SERVER_PROTOCOLL || 'http',
		HOST: process.env.IT_MANAGEMENT_SERVER_HOST || 'localhost',
		PORT: process.env.IT_MANAGEMENT_SERVER_PORT || '3333',
		get URL() {
			return `${config.MANAGEMENT_SERVER.PROTOCOLL}://${config.MANAGEMENT_SERVER.HOST}:${config.MANAGEMENT_SERVER.PORT}/api`;
		},
	},
};

module.exports = config;
