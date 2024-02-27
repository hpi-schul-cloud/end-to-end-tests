'use strict'
const instance = 'nbc'
const localBranchName = 'bc-485-yulia'

// STATIC DATA FROM ENV + DEFAULTS
const config = {
	CLIENT: {
		PROTOCOLL: process.env.IT_CLIENT_PROTOCOLL || 'http',
		HOST: process.env.IT_CLIENT_HOST || 'localhost',
		PORT: process.env.IT_CLIENT_PORT || '4242',
		get URL () {
			/**
			 * needed when running the tests locally
			 * return `https://${instance}-${localBranchName}.cd.dbildungscloud.dev`;
			 */
			return `${config.CLIENT.PROTOCOLL}://${config.CLIENT.HOST}:${config.CLIENT.PORT}`
		},
	},
	SERVER: {
		PROTOCOLL: process.env.IT_SERVER_PROTOCOLL || 'http',
		HOST: process.env.IT_SERVER_HOST || 'localhost',
		PORT: process.env.IT_SERVER_PORT || '3030',
		get URL () {
			return `${config.SERVER.PROTOCOLL}://${config.SERVER.HOST}:${config.SERVER.PORT}`
			/**
			 * needed when running the tests locally
			 * return `https://${instance}-${localBranchName}.cd.dbildungscloud.dev/api/v1`;
			 */
		},
	},
	MANAGEMENT_SERVER: {
		PROTOCOLL: process.env.IT_MANAGEMENT_SERVER_PROTOCOLL || 'http',
		HOST: process.env.IT_MANAGEMENT_SERVER_HOST || 'localhost',
		PORT: process.env.IT_MANAGEMENT_SERVER_PORT || '3333',
		get URL () {
			return `${config.MANAGEMENT_SERVER.PROTOCOLL}://${config.MANAGEMENT_SERVER.HOST}:${config.MANAGEMENT_SERVER.PORT}/api`
			/**
			 * needed when running the tests locally
			 * port forwarding needed
			 * return `http://mgmt-svc.${instance}-${localBranchName}.svc.cluster.local:3333/api/management/database/seed`;
			 */
		},
	},
}

module.exports = config
