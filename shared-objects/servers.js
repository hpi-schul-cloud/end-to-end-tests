'use strict';

// STATIC DATA FROM ENV + DEFAULTS
const config = {
	CLIENT: {
		PROTOCOLL: process.env.IT_CLIENT_PROTOCOLL || 'http',
		HOST: process.env.IT_CLIENT_HOST || 'localhost',
		PORT: process.env.IT_CLIENT_PORT || '4000',
		get URL() {
			return `${config.CLIENT.PROTOCOLL}://${config.CLIENT.HOST}:${config.CLIENT.PORT}`
		}
	},
	SERVER: {
		PROTOCOLL: process.env.IT_SERVER_PROTOCOLL || 'http',
		HOST: process.env.IT_SERVER_HOST || 'localhost',
		PORT: process.env.IT_SERVER_PORT || '3030',
		MANAGEMENT_PORT: process.env.IT_MANAGEMENT_SERVER_PORT || '3333',
		MANAGEMENT_PATH: process.env.IT_MANAGEMENT_API_PATH || '/api/management',
		get URL() {
			return `${config.SERVER.PROTOCOLL}://${config.SERVER.HOST}:${config.SERVER.PORT}`
		},
		get MANAGEMENT_URL() {
			return `${config.SERVER.PROTOCOLL}://${config.SERVER.HOST}:${config.SERVER.PORT}${config.SERVER.MANAGEMENT_PATH}`
		}
	}
};

module.exports = config;
