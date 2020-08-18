'use strict';
let log = global.log;
const fs = require('fs');
const textFileHelpers = require('./textFileHelpers.js');
const { SERVER } = require("../shared-objects/servers");

module.exports = {
/**
	*  API call for GET, PUT, POST and DELETE functionality
	* @param url
	* @param method
	* @param body
	* @param fileName
	* @param statusCode
	* @type {{ GET: receive all info, POST: create, PUT: edit / update, DELETE: remove info }},
	*/
	apiCall: function (url, method, body, fileName, statusCode) {

		let options = {
			url: url,
			method: method,
			body: body,
			json: true,
			time: true,
			resolveWithFullResponse: true,
		};

		return request(options)
			.then(async function (res) {
				if (statusCode != null) {
					assert.equal(res.statusCode, statusCode);
					log.info('API Response time : ' + res.timings.response);
				}

				if (method === 'GET') {
					return res;
				}

				if (method === 'DELETE' && fileName != null || method === 'PUT' && fileName != null) {
					return fs.readFileSync(fileName, 'utf8', function (err) {
						if (err){
							log.error(err.message);
						}
					});
				}

				if (method === 'POST' && fileName != null) {
					let data = res.body.adminDoc;
					let doc_Id = data.replace(/.*documents\/([^\/]+)\/properties.*/, '$1');
					await textFileHelpers.writeTextFile(fileName, doc_Id, function (err) {
						if (err){
							log.error(err.message);
						}
					});
					log.info('====== DocId API ===== ' + doc_Id);

					await doc_Id;
				}
				return res;
			});
	},
	getUserInfo: async function(attribute) {
		const cookie = await driver.getCookies(['jwt']);
		const jwt = cookie[0].value;
		const info = await Axios.request({
			url:  `${SERVER.URL}/me`,
			method: 'get',
			headers: {
			  Authorization: `${jwt}`
			}
		  });
		  let object =info.data;
		  return object[attribute];
 
	  }, 
	  getUserName: async function() {

		return this.getUserInfo('fullName')
	},

	getSchoolName: async function() {

		return this.getUserInfo('schoolName');
	}, 
	getInitials: async function() {

		return  this.getUserInfo('avatarInitials');
	}, 


}
