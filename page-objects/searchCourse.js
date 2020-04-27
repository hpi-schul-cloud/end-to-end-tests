'use strict';
const loginData = require('../shared-objects/loginData');
const courseData = require('../shared-objects/courseData');
const { expect } = require('chai');

const createCourse = require('../page-objects/createCourse');
const shared = { loginData };
const course = { courseData };
module.exports = {
	searchOne: async function(name) {
		let searchfield = await driver.$('#searchBar > div > input');
		await searchfield.setValue(name);
	},
	amountToBeDisplayed: async function(name) {
		let names = await Promise.all(
			(await driver.$$('#section-courses .sc-card-title > div span')).map(
				async element => await element.getText()
			)
		);
		var re = new RegExp(name, 'gi');
		const matchingNames = names.filter(n => n.match(re));
		return matchingNames.length;
	},
	isCorrectlyDisplayed: async function() {
		let elem = await driver.$$('#section-courses .sc-card-wrapper');
		var num = elem.length - 1;
		var r = 0;
		for (var i = 0; i <= num; i++) {
			if ((await elem[i].isDisplayed()) == true) {
				r += 1;
			}
		}
		return r;
	}
};
