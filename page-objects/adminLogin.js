'use strict';

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
		let title = 'Übersicht';
		expect(await helpers.getElementText('.col-sm-9')).to.equal(title);
	},
	
	loginInitials: async function() {
		let initials = await firstLogin.getInitials();
		expect(await helpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	loginSchool: async function() {
		await this.goToDashboard();
		let schoolName = 'Paul-Gerhardt-Gymnasium';
		expect(await helpers.getElementText('.nav-item.school-data.hidden-sm-down')).to.equal(schoolName);
	},
	
	loginFullInfo: async function() {
		let fullInfo = 'Thorsten Test (Administrator)'; await firstLogin.getFullInfo();
		expect(await helpers.getElementText('.btn.btn-secondary.btn-thin.dropdown-toggle')).to.equal(fullInfo);
	},
	
	compareScreenshots: async function(filename) {
		await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');

		await helpers.compareImage(`${filename}.png`);
	}
};