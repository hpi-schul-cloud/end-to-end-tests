/*[url/administration/systems/ldap/add/ldapId] <- might change*/

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const serverUrlInput = 'input[data-testid="ldapDataConnectionUrl"]';
const basePathInput = 'input[data-testid="ldapDataConnectionBasisPath"]';
const searchUserInput = 'input[data-testid="ldapDataConnectionSearchUser"]';
const passwordSearchUserInput = 'input[data-testid="ldapDataConnectionSearchUserPassword"]';

const userPathInput = 'input[data-testid="ldapDataUsersUserPath"]';
const attributeFirstNameInput = 'input[data-testid="ldapDataUsersFirstName"]';
const attributeFamilyNameInput = 'input[data-testid="ldapDataUsersFamilyName"]';
const attributeEmailInput = 'input[data-testid="ldapDataUsersEmail"]';
const attributeUidInput = 'input[data-testid="ldapDataUsersUid"]';
const attributeUuidInput = 'input[data-testid="ldapDataUsersUuid"]';

const roleAttributeInput = 'input[data-testid="ldapDataRolesMember"]';
const studentAttributeInput = 'input[data-testid="ldapDataRolesStudent"]';
const teacherAttributeInput = 'input[data-testid="ldapDataRolesTeacher"]';
const adminAttributeInput = 'input[data-testid="ldapDataRolesAdmin"]';
const ignoreUserInput = 'input[data-testid="ldapDataRolesUser"]';

const classPathInput = 'input[data-testid="ldapDataClassesPath"]';
const classesNameAttributeInput = 'input[data-testid="ldapDataClassesNameAttribute"]';
const classesParticipantAttributeInput = 'input[data-testid="ldapDataClassesNameparticipantAttribute"]';

const classesImportButton = '.switch';
const groupRadioButton = '.radio';

const resetInputButton = '[data-testid="ldapResetInputsButton"]';
const verifyInput = '[data-testid="ldapVerifyButton"]';

async function activateClassesImport() {
	await elementHelpers.click(classesImportButton);
}

async function clickGroupRadioButton(groupOption) {
	await elementHelpers.click(groupRadioButton);
	await setRoleAttribute('dd');
}

async function setServerUrl(serverUrl) {
	await waitHelpers.setValueAndWait(serverUrlInput, serverUrl);
}

async function setBasePath(basePath) {
	await waitHelpers.setValueAndWait(basePathInput, basePath);
}

async function setSearchUser(searchUser) {
	await waitHelpers.setValueAndWait(searchUserInput, searchUser);
}

async function setPasswordSearchUser() {
	const password = process.env.SECRET_LDAP_PASSWORD;
	await waitHelpers.setValueAndWait(passwordSearchUserInput, password);
}

async function setUserPath(userPath) {
	await waitHelpers.setValueAndWait(userPathInput, userPath);
}

async function setAttributeFirstName(attributeFirstName) {
	await waitHelpers.setValueAndWait(attributeFirstNameInput, attributeFirstName);
}

async function setAttributeFamilyName(attributeFamilyName) {
	await waitHelpers.setValueAndWait(attributeFamilyNameInput, attributeFamilyName);
}

async function setAttributeEmail(attributeEmail) {
	await waitHelpers.setValueAndWait(attributeEmailInput, attributeEmail);
}

async function setAttributeUid(attributeUid) {
	await waitHelpers.setValueAndWait(attributeUidInput, attributeUid);
}

async function setAttributeUuid(attributeUuid) {
	await waitHelpers.setValueAndWait(attributeUuidInput, attributeUuid);
}

async function setRoleAttribute(roleAttribute) {
	await waitHelpers.setValueAndWait(roleAttributeInput, roleAttribute);
}

async function setStudentAttribute(studentAttribute) {
	await waitHelpers.setValueAndWait(studentAttributeInput, studentAttribute);
}

async function setTeacherAttribute(teacherAttribute) {
	await waitHelpers.setValueAndWait(teacherAttributeInput, teacherAttribute);
}

async function setAdminAttribute(adminAttribute) {
	await waitHelpers.setValueAndWait(adminAttributeInput, adminAttribute);
}

async function setIgnoreUser(ignoreUser) {
	await waitHelpers.setValueAndWait(ignoreUserInput, ignoreUser);
}

async function setClassPath(classPath) {
	await waitHelpers.setValueAndWait(classPathInput, classPath);
}

async function setClassesNameAttribute(classesNameAttribute) {
	await waitHelpers.setValueAndWait(classesNameAttributeInput, classesNameAttribute);
}

async function setClassesParticipantAttribute(classesParticipantAttribute) {
	await waitHelpers.setValueAndWait(classesParticipantAttributeInput, classesParticipantAttribute);
}

async function clickResetBtn() {
	await elementHelpers.click(resetInputButton);
}
async function clickVerifyButton() {
	await elementHelpers.clickAndWait(verifyInput);
}

module.exports = {
	activateClassesImport,
	clickGroupRadioButton,
	setServerUrl,
	setBasePath,
	setSearchUser,
	setPasswordSearchUser,
	setUserPath,
	setAttributeFirstName,
	setAttributeFamilyName,
	setAttributeEmail,
	setAttributeUid,
	setAttributeUuid,
	setRoleAttribute,
	setStudentAttribute,
	setTeacherAttribute,
	setAdminAttribute,
	setIgnoreUser,
	setClassPath,
	setClassesNameAttribute,
	setClassesParticipantAttribute,
	clickResetBtn,
	clickVerifyButton,
};
