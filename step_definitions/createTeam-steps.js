"use strict";

let loginData = require("../shared-objects/loginData");
const createTeam = require("../page-objects/createTeam");
let teacherLogin = require("../page-objects/teacherLogin");
let newPupil = require("../page-objects/administration");
const Login = require("../shared-objects/loginData");

const addededStudents = [];

Given(/^the teacher started on the login page and$/, function () {
	let url = loginData.url;
	return helpers.loadPage(url, 10);
});
Given(/^teacher successfully logged in$/, function () {
	return teacherLogin.performLogin(
		Login.defaultTeacherUsername,
		Login.defaultTeacherpassword
	);
});
When(/^teacher adds a new student with (.*), (.*), (.*)$/, function (
	firstname,
	lastname,
	email
) {
	const fullname = firstname + " " + lastname;
	addededStudents.push(fullname);
	return newPupil.createNewPupil(firstname, lastname, email);
});

When(/^teacher creates a new team with (.*) and$/, function (teamname) {
	return createTeam.createTeamAndGoToSettings(teamname);
});
When(/^teacher adds two students to this team$/, function () {
	return createTeam.addTwoTeamMemebers(...addededStudents);
});

Then(/^the team (.*) should be displayed on the team page$/, async function (
	teamName
) {
	let teamNames = await createTeam.getTeamNames();
	await expect(teamNames).to.include(teamName);
});
