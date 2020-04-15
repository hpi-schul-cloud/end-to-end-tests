"use strict";
const firstLogin = require("../shared_steps/firstLogin.js");
const { expect } = require("chai");
const Admin = require("../shared-objects/administrationData");
var length;
let oldPassword;
let tmpEMail;
let name;
let newPassword = "Schulcloud1!";

module.exports = {
	goToAdministration: function () {
		let url = Admin.urlAdministration;
		return helpers.loadPage(url, 10);
	},
	createNewPupil: async function (firstname, lastname, email) {
		name = firstname;
		tmpEMail = email;
		await this.goToAdministration();
		// navigate to students administration page
		let administrateStudentsBtn = await driver.$(Admin.administrateStudentsBtn);
		await administrateStudentsBtn.click();
		// open fab and click add Student
		const mainFAB = await driver.$(`.fab-wrapper > button`);
		await mainFAB.click();
		await driver.pause(500); // wait for fab to open
		const btnAddStudent = await driver.$(
			`a[href="/administration/students/new"]`
		);
		await btnAddStudent.click();
		await driver.pause(3000); // wait for page load TODO: wait for actual page load
		// fill userdata
		let firstName = await driver.$(Admin.setFirstName);
		await firstName.setValue(firstname);
		let secondName = await driver.$(Admin.setLastName);
		await secondName.setValue(lastname);
		let eMail = await driver.$(Admin.setEmail);
		await eMail.setValue(email);
		await this.executeScript(
			`document.querySelector("${Admin.birthday_field}").value = "1990-08-13"`
		);
		let addButton = await driver.$(Admin.submitBtn);
		await addButton.click();
	},
	executeScript: async function (script) {
		await driver.pause(1500);
		await driver.execute(script);
	},
	emailsOfThePupils: async function () {
		let names = await driver.$$(Admin.namesContainer + " > tr");
		return Promise.all(
			names.map(async (nameContainer) => {
				const emailContainer = await nameContainer.$("td:nth-child(3)");
				return await emailContainer.getText();
			})
		);
	},
	verify: async function (email) {
		let emails = await this.emailsOfThePupils();
		await expect(emails).to.contain(email);
	},
	submitConsent: async function (e_mail) {
		let names = await driver.$$(Admin.namesContainer + " > tr");
		length = names.length;
		for (var i = 1; i <= length; i++) {
			let emailPromise = await driver.$(
				Admin.namesContainer + " > tr:nth-child(" + i + ") > td:nth-child(3)"
			);
			let email = await emailPromise.getText();
			if (email === e_mail) {
				let boxConsent = await driver.$(
					Admin.namesContainer +
						" > tr:nth-child(" +
						i +
						") > td:nth-child(7) > a:nth-child(2) > i"
				);
				await boxConsent.click();
				let submitBtn = await driver.$(Admin.consentSubmitBtn);
				let passwordField = await driver.$("#passwd");
				let password_old = await passwordField.getValue();
				oldPassword = password_old;
				await submitBtn.click();
				break;
			}
		}
	},
	newPupilLogsIn: async function () {
		await firstLogin.logout();
		await firstLogin.pupilLogin(tmpEMail, oldPassword);
	},
	pupilAcceptsDataProtection: async function () {
		await firstLogin.firstLoginPupilFullAge(name, newPassword);
	},
};
