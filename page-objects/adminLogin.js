'use strict';

const { expect } = require('chai');
const loginData = require('../shared-objects/loginData'),
	imageCompare = require('../runtime/imageCompare'),
	shared = { loginData };
const firstLogin = require('../shared_steps/firstLogin.js');
const elementHelpers = require('../runtime/helpers/elementHelpers');

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
		await elementHelpers.loadPage(loginData.urlDashboard, 20);
		await driver.pause(1000);
	},

	loginResultDashboard: async function() {
		await this.goToDashboard();
		let title = shared.loginData.elem.dashboardTitle;
		expect(await elementHelpers.getElementText(shared.loginData.elem.dashboardHeader)).to.equal(title);
	},
	
	loginInitials: async function() {
		let initials = await firstLogin.getInitials();
		expect(await elementHelpers.getElementText('.avatar-circle')).to.equal(initials);
	},

	loginSchool: async function() {
		await this.goToDashboard();
		let schoolName = shared.loginData.elem.fullSchoolName;
		expect(await elementHelpers.getElementText(shared.loginData.elem.schoolName)).to.equal(schoolName);
	},
	
	loginFullUserInfo: async function() {
		await firstLogin.getNameAndPosition();
		let fullUserInfo = shared.loginData.elem.fullNameAdministrator;
		expect(await elementHelpers.getElementText(shared.loginData.elem.fullUserInfo)).to.equal(fullUserInfo);
	},
	
	checkIfElementIsVisisble: async function (itemsToCompare, selector) {
    let items = await driver.$$(selector);
    let expectations = itemsToCompare.hashes();
    for(let i = 0; i < items.length; i++){
        let actualLabelText = await items[i].getText();
        await items[i].waitForEnabled(DELAY_100_MILLISECOND);
		expect(actualLabelText).to.equal(expectations[i].tabs);
		}
	},
	compareScreenshots: async function(filename) {
		await imageCompare.saveScreenshot(`${filename}.png`, '.timetable');

		await imageHelpers.compareImage(`${filename}.png`);
	}
};