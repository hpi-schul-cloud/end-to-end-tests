/*[url/administration/systems/ldap/add/ldapId] <- might change*/

const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const elementHelpers = require('../../../runtime/helpers/elementHelpers');

const serverUrlInput = '[data-testid="ldapDataConnectionUrl"]';
const basePathInput = '[data-testid="ldapDataConnectionBasisPath"]';
const searchUserInput = '[data-testid="ldapDataConnectionSearchUser"]';
const passwordSearchUserInput = '[data-testid="ldapDataConnectionSearchUserPassword"]';

const userPathInput = '[data-testid="ldapDataUsersUserPath"]';
const attributeFirstNameInput = '[data-testid="ldapDataUsersFirstName"]';
const attributeFamilyNameInput = '[data-testid="ldapDataUsersFamilyName"]';
const attributeEmailInput = '[data-testid="ldapDataUsersEmail"]';
const attributeUidInput = '[data-testid="ldapDataUsersUid"]';
const attributeUuidInput = '[data-testid="ldapDataUsersUuid"]';

const roleAttributeInput = '[data-testid="ldapDataRolesMember"]';
const studentAttributeInput = '[data-testid="ldapDataRolesStudent"]';
const teacherAttributeInput = '[data-testid="ldapDataRolesTeacher"]';
const adminAttributeInput = '[data-testid="ldapDataRolesAdmin"]';
const ignoreUserInput = '[data-testid="ldapDataRolesUser"]';

const classPathInput = '[data-testid="ldapDataClassesPath"]';
const classesNameAttributeInput = '[data-testid="ldapDataClassesNameAttribute"]';
const classesParticipantAttributeInput = '[data-testid="ldapDataClassesNameparticipantAttribute"]';

const resetInputButton = '[data-testid="ldapResetInputsButton"]';
const verifyInput = '[data-testid="ldapVerifyButton"]';


async function setServerUrl(serverUrl) {
	await waitHelpers.waitAndSetValue(serverUrlInput, serverUrl);
}

async function setBasePath(basePath) {
	await waitHelpers.waitAndSetValue(basePathInput, basePath);
}

async function setSearchUser(searchUser) {
	await waitHelpers.waitAndSetValue(searchUserInput, searchUser);
}

async function setPasswordSearchUser(passwordSearchUser) {
	await waitHelpers.waitAndSetValue(passwordSearchUserInput, passwordSearchUser);
}

async function setUserPath(userPath) {
	await waitHelpers.waitAndSetValue(userPathInput, userPath);
}

async function setAttributeFirstName(attributeFirstName) {
	await waitHelpers.waitAndSetValue(attributeFirstNameInput, attributeFirstName);
}

async function setAttributeFamilyName(attributeFamilyName) {
	await waitHelpers.waitAndSetValue(attributeFamilyNameInput, attributeFamilyName);
}

async function setAttributeEmail(attributeEmail) {
	await waitHelpers.waitAndSetValue(attributeEmailInput, attributeEmail);
}

async function setAttributeUid(attributeUid) {
	await waitHelpers.waitAndSetValue(attributeUidInput, attributeUid);
}

async function setAttributeUuid(attributeUuid) {
	await waitHelpers.waitAndSetValue(attributeUuidInput, attributeUuid);
}

async function setRoleAttribute(roleAttribute) {
	await waitHelpers.waitAndSetValue(roleAttributeInput, roleAttribute);
}

async function setStudentAttribute(studentAttribute) {
	await waitHelpers.waitAndSetValue(studentAttributeInput, studentAttribute);
}

async function setTeacherAttribute (teacherAttribute) {
	await waitHelpers.waitAndSetValue(teacherAttributeInput, teacherAttribute);
}

async function setAdminAttribute (adminAttribute) {
	await waitHelpers.waitAndSetValue(adminAttributeInput, adminAttribute);
}

async function setIgnoreUser (ignoreUser) {
	await waitHelpers.waitAndSetValue(ignoreUserInput, ignoreUser);
}

async function setClassPath (classPath) {
	await waitHelpers.waitAndSetValue(classPathInput, classPath);
}

async function setClassesNameAttribute (classesNameAttribute) {
	await waitHelpers.waitAndSetValue(classesNameAttributeInput, classesNameAttribute);
}

async function setClassesParticipantAttribute (classesParticipantAttribute) {
	await waitHelpers.waitAndSetValue(classesParticipantAttributeInput, classesParticipantAttribute);
}

async function clickResetBtn() {
    await elementHelpers.click(resetInputButton);
}
async function clickVerifyButton() {
    await elementHelpers.clickAndWait(verifyInput);
}


module.exports = {
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
