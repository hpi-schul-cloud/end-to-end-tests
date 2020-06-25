'use strict';

const { expect, assert } = require('chai');
const loginData = require('../shared-objects/loginData'),
	imageCompare = require('../runtime/imageCompare'),
	shared = { loginData };
const firstLogin = require('../shared_steps/firstLogin.js');

let log = global.log;
let image;

module.exports = {
	performLogin: async function(username, password) {
		image = username;

		let loginSel = await driver.$(shared.loginData.elem.usernameInput);
		await loginSel.setValue(username);

		let passwordSel = await driver.$(shared.loginData.elem.passwordInput);
		await passwordSel.setValue(password);

		let loginBtnSel = await driver.$(shared.loginData.elem.submitBtn);
		await loginBtnSel.click();
	},

	goToDashboard: async function() {
		await helpers.loadPage(loginData.urlDashboard, 20);
		await driver.pause(1000);
	},

	loginResultDashboard: async function() {
		await this.goToDashboard();
		let title = shared.loginData.elem.dashboardTitle;
		expect(await helpers.getElementText(shared.loginData.elem.dashboardHeader)).to.equal(title);
	},
	
	loginInitials: async function() {
		let initials = await firstLogin.getInitials();
		expect(await helpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	loginSchool: async function() {
		await this.goToDashboard();
		let schoolName = shared.loginData.elem.fullSchoolName;
		expect(await helpers.getElementText(shared.loginData.elem.schoolName)).to.equal(schoolName);
	},
	
	loginFullInfo: async function() {
		let fullInfo = shared.loginData.elem.fullNameAdministrator; await firstLogin.getFullInfo();
		expect(await helpers.getElementText(shared.loginData.elem.fullUserInfo)).to.equal(fullInfo);
		assert.include(fullInfo())
	},
	
	compareScreenshots: async function(filename) {
		await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');

		await helpers.compareImage(`${filename}.png`);
	}
};