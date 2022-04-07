'use strict';
let log = global.log;
const fs = require('fs');
const textFileHelpers = require('./textFileHelpers.js');
const { SERVER } = require('../../shared-objects/servers');
const Axios = require('axios');

	/**
	 *  API call for GET, PUT, POST and DELETE functionality
	 * @param url
	 * @param method
	 * @param body
	 * @param fileName
	 * @param statusCode
	 * @type {{ GET: receive all info, POST: create, PUT: edit / update, DELETE: remove info }},
	 */

	function apiCall (url, method, body, fileName, statusCode) {
		let options = {
			url: url,
			method: method,
			body: body,
			json: true,
			time: true,
			resolveWithFullResponse: true,
		};

		return request(options).then(async function (res) {
			if (statusCode != null) {
				assert.equal(res.statusCode, statusCode);
				log.info('API Response time : ' + res.timings.response);
			}

			if (method === 'GET') {
				return res;
			}

			if ((method === 'DELETE' && fileName != null) || (method === 'PUT' && fileName != null)) {
				return fs.readFileSync(fileName, 'utf8', function (err) {
					if (err) {
						log.error(err.message);
					}
				});
			}

			if (method === 'POST' && fileName != null) {
				let data = res.body.adminDoc;
				let doc_Id = data.replace(/.*documents\/([^\/]+)\/properties.*/, '$1');
				textFileHelpers.writeTextFile(fileName, doc_Id, function (err) {
					if (err) {
						log.error(err.message);
					}
				});
				log.info('====== DocId API ===== ' + doc_Id);

				await doc_Id;
			}
			return res;
		});
	}

	async function getUserInfo (attribute) {
		const cookie = await driver.getCookies(['jwt']);
		const jwt = cookie[0].value;
		const info = await Axios.request({
			url: `${SERVER.URL}/me`,
			method: 'get',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		let object = info.data;
		return object[attribute];
	}

	async function getUserName () {
		return getUserInfo('fullName');
	}

	async function getSchoolName () {
		return getUserInfo('schoolName');
	}
	async function getInitials () {
		return getUserInfo('avatarInitials');
	}
	async function getUserRole () {
		try {
			let userRole = await getUserInfo('roles');
			return userRole[0].displayName;
		} catch (error) {
			log.error('Can not find role: ' + error.message);
			throw error;
		}
	}

module.exports = {
	apiCall,
	getUserName,
	getSchoolName,
	getInitials,
	getUserRole,
};
