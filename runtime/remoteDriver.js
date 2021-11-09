'use strict';

const wdio = require('webdriverio');

/**
 * create the web browser based on globals set in index.js
 * @returns {{}}
 */
module.exports = async function remoteDriver(options) {
	const defaults = {
		host: 'localhost',
		port: 6666,
		path: '/wd/hub',
		capabilities: {
			browserName: 'chrome'
		},
		autodetect: false
	};
	const extendedOptions = Object.assign(defaults, options);
	global.driver = await wdio.remote(extendedOptions);
	return driver;
};
