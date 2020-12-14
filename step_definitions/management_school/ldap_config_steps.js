'use strict';

const navigationLeftPage = require('../../page-objects/pages/NavigationLeftPage');
const manageSchoolPage = require('../../page-objects/pages/managementPages/ManageSchoolPage');
const manageLdapPage = require('../../page-objects/pages/managementPages/ManageLdapPage');
const ldapAfterVerifyPage = require('../../page-objects/pages/managementPages/LdapAfterVerifyPage');

When(/^.*goes to school tab$/, async function () {
	await navigationLeftPage.clickNavItemManageSchool();
});

When(/^.*adds a ldap system$/, async function () {
	manageSchoolPage.clickAddLDAPButton();
});

When(/^.* adds '([^']*)' to the serverUrl input$/, async function (serverUrl) {
	await manageLdapPage.setServerUrl(serverUrl);
});

When(/^.* adds '([^']*)' to the basePath input$/, async function (basePath) {
	await manageLdapPage.setBasePath(basePath);
});

When(/^.* adds '([^']*)' to the searchUser input$/, async function (searchUser) {
	await manageLdapPage.setSearchUser(searchUser);
});

When(/^.* adds password to the passwordSearchUser input$/, async function () {
	await manageLdapPage.setPasswordSearchUser();
});

When(/^.* adds '([^']*)' to the userPath input$/, async function (userPath) {
	await manageLdapPage.setUserPath(userPath);
});

When(/^.* adds '([^']*)' to the attributeFirstName input$/, async function (attributeFirstName) {
	await manageLdapPage.setAttributeFirstName(attributeFirstName);
});

When(/^.* adds '([^']*)' to the attributeFamilyName input$/, async function (attributeFamilyName) {
	await manageLdapPage.setAttributeFamilyName(attributeFamilyName);
});

When(/^.* adds '([^']*)' to the attributeEmail input$/, async function (attributeEmail) {
	await manageLdapPage.setAttributeEmail(attributeEmail);
});

When(/^.* adds '([^']*)' to the attributeUid input$/, async function (attributeUid) {
	await manageLdapPage.setAttributeUid(attributeUid);
});

When(/^.* adds '([^']*)' to the attributeUuid input$/, async function (attributeUuid) {
	await manageLdapPage.setAttributeUuid(attributeUuid);
});

// When(/^.* adds '([^']*)' to the roleAttribute input$/, async function (roleAttribute) {
// 	await manageLdapPage.setRoleAttribute(roleAttribute);
// });
When(/^.* clicks '([^']*)' from the user roles$/, async function (groupOption) {
	await manageLdapPage.clickGroupRadioButton(groupOption);
});

When(/^.* adds '([^']*)' to the studentAttribute input$/, async function (studentAttribute) {
	await manageLdapPage.setStudentAttribute(studentAttribute);
});

When(/^.* adds '([^']*)' to the teacherAttribute input$/, async function (teacherAttribute) {
	await manageLdapPage.setTeacherAttribute(teacherAttribute);
});

When(/^.* adds '([^']*)' to the adminAttribute input$/, async function (adminAttribute) {
	await manageLdapPage.setAdminAttribute(adminAttribute);
});

When(/^.* adds '([^']*)' to the ignoreUser input$/, async function (ignoreUser) {
	await manageLdapPage.setIgnoreUser(ignoreUser);
});

When(/^.* activates classes import$/, async function () {
	await manageLdapPage.activateClassesImport();
});

When(/^.* adds '([^']*)' to the classPath input$/, async function (classPath) {
	await manageLdapPage.setClassPath(classPath);
});

When(/^.* adds '([^']*)' to the classesNameAttribute input$/, async function (classesNameAttribute) {
	await manageLdapPage.setClassesNameAttribute(classesNameAttribute);
});

When(/^.* adds '([^']*)' to the classesParticipantAttribute input$/, async function (classesParticipantAttribute) {
	await manageLdapPage.setClassesParticipantAttribute(classesParticipantAttribute);
});

When(/^.* clicks verify button$/, async function () {
	await manageLdapPage.clickVerifyButton();
});
When(/^.* is redirected to page with preview data$/, async function () {
	await ldapAfterVerifyPage.isButtonPresent();
	await ldapAfterVerifyPage.isUsersTablePresent();
});
