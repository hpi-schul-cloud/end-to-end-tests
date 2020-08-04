'use strict';
const firstLogin = require('../shared_steps/firstLogin.js');
const loginData = require('../shared-objects/loginData');
const { expect } = require('chai');
const Admin = require('../shared-objects/administrationData');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

const { Api } = require("../runtime/helpers/axiosHelper.js")

var length;
let oldPassword;
let eMAIL;
let name;
let newPassword = "Schulcloud1!"

const getJwt = async () => {
    let cookie;
    try {
        cookie = await driver.getCookies(['jwt']);
    } catch (e) {
        console.error('error: ', e)
        return
    }
    const jwt = cookie[0].value;
    return jwt
}


module.exports = {
    goToAdministration: function () {
        let url = Admin.urlAdministration;
        return elementHelpers.loadPage(url, 10);
    },

    createNewClass: async function (className = '11c') {
        // navigates to administration tools
        await this.goToAdministration();

        // navigates to class administration
        const administrateClassesBtn = await driver.$(Admin.administrateClassesBtn);
        await administrateClassesBtn.click();

        const pageTitle = await driver.getTitle()
        expect(pageTitle.startsWith('Administration: Klassen')).to.equal(true)

        const createClassBtn = await driver.$(Admin.classCreateBtn);
        await createClassBtn.click();

        const pageTitle2 = await driver.getTitle()
        expect(pageTitle2.startsWith('Erstelle eine neue Klasse')).to.equal(true)

        const classCreationExtraOptions = await driver.$(Admin.classCreationExtraOptions)
        await classCreationExtraOptions.click()

        const classNameInputField = await driver.$(Admin.classNameInputField)
        await classNameInputField.setValue(className);

        const confirmButton = await driver.$(Admin.confirmClassCreate)
        await confirmButton.click()

    },
    verifyNewEmptyClassCreated: async function (className = '11c', numOfStudents = '0') {
        const allClassesContainer = await driver.$('tbody[data-testid=\'students_names_container\']')
        const allClassesContent = await allClassesContainer.getText()
        const contentArray = allClassesContent.split(" ")

        const currentYear = new Date().getFullYear().toString().substring(2) // 20

        expect(contentArray.length).to.equal(3) // teacher column should be empty and therefore not 4, but 3
        expect(contentArray[0]).to.equal('11c')
        expect(contentArray[1].includes(currentYear)).to.equal(true)
        expect(contentArray[2]).to.equal(numOfStudents)

    },
    createNewPupil: async function (firstname, lastname, email) {
        name = firstname;
        eMAIL = email;
        await this.goToAdministration();
        let administrateStudentsBtn = await driver.$(Admin.administrateStudentsBtn);
        await administrateStudentsBtn.click();
        let addBtn = await driver.$(Admin.addStudentBtn);
        await addBtn.click();
        await driver.pause(1000);
        let firstName = await driver.$(Admin.setFirstName);
        await firstName.setValue(firstname);
        let secondName = await driver.$(Admin.setLastName);
        await secondName.setValue(lastname);
        let eMail = await driver.$(Admin.setEmail);
        await eMail.setValue(email);
        await this.executeScript();
        let sendAMessageBox = await driver.$(Admin.sendALinkBox);
        await sendAMessageBox.click();
        let addButton = await driver.$('body > div.modal.fade.add-modal.in > div > div > form > div.modal-footer > button.btn.btn-primary.btn-submit');
        await addButton.click();
    },
    executeScript: async function () {
        await driver.pause(1500);
        await driver.execute('document.querySelector("#create_birthday").value = "13.08.1990"')
    },
    emailsOfThePupils: async function () {
        let names = await driver.$$(Admin.namesContainer + ' > tr');
        return Promise.all(names.map(async (nameContainer) => {
            const emailContainer = await nameContainer.$("td:nth-child(3)");
            return await emailContainer.getText();
        }))
    },
    verify: async function (email) {
        let emails = await this.emailsOfThePupils();
        await expect(emails).to.contain(email);
    },
    submitConsent: async function (e_mail) {
        let names = await driver.$$(Admin.namesContainer + ' > tr');
        length = names.length;
        for (var i = 1; i <= length; i++) {
            let emailPromise = await driver.$(Admin.namesContainer + ' > tr:nth-child(' + i + ') > td:nth-child(3)');
            let email = await emailPromise.getText();
            if (email === e_mail) {
                let boxConsent = await driver.$(Admin.namesContainer + ' > tr:nth-child(' + i + ') > td:nth-child(7) > a:nth-child(2) > i');
                await boxConsent.click();
                let submitBtn = await driver.$(Admin.consentSubmitBtn);
                let passwordField = await driver.$('#passwd');
                let password_old = await passwordField.getValue();
                oldPassword = password_old;
                await submitBtn.click();
                break;
            }
        }
    },
    checkIfElementIsVisisble: async function (itemsToCompare, selector) {
        let items = await driver.$$(selector);
        let expectations = itemsToCompare.hashes();
        for (let i = 0; i < items.length; i++) {
            let actualLabelText = await items[i].getText();
            await items[i].waitForEnabled(DELAY_100_MILLISECOND);
            expect(actualLabelText).to.equal(expectations[i].tabs);
        }
    },
    newPupilLogsIn: async function () {
        await firstLogin.logout();
        await firstLogin.pupilLogin(eMAIL, oldPassword);
    },
    pupilAcceptsDataProtection: async function () {
        await firstLogin.firstLoginPupilFullAge(name, newPassword);
    },
    getStudentsFromSameSchoolAndVerify: async () => {
        // fake user data can be found in schul-cloud-server repo
        // 'backup/setup/users.json'
        const studentsFromSameSchool = ["Marla", "Waldemar"]

        const jwt = await getJwt()
        const allStudents = await Api.getStudentsAsAdmin(jwt)

        expect(allStudents.data.length).to.not.be.equal(0)
        allStudents.data.forEach(student => {
            expect(studentsFromSameSchool).to.include(student.firstName)
        })

        const randomStudent = allStudents.data[Math.floor(Math.random() * allStudents.data.length)]
        const singleStudent = await Api.getStudent(jwt, randomStudent._id)
        expect(singleStudent.status).to.equal(200)
        expect(singleStudent.data.firstName).to.equal(randomStudent.firstName)
    },

    requestForeignStudent: async () =>{
        const jwt = await getJwt()
        const foreignStudentId = "59ae89b71f513506904e1cc9"

        try {
            await Api.getStudent(jwt, foreignStudentId)
        }
        catch (err) {
            expect(err.code).to.be.equal(403)
        }
    },


    requestForeignStudentAndVerify: async () => {
        // fake user data can be found in schul-cloud-server repo
        // 'backup/setup/users.json'

        const adminSchoolId = "0000d186816abba584714c5f"
        const jwt = await getJwt()
        const foreignStudentId = "59ae89b71f513506904e1cc9"

        // (GET) should fail to get student from foreign school 
        try {
            await Api.getStudent(jwt, foreignStudentId)
        }
        catch (err) {
            expect(err.name).to.be.equal("Forbidden")
            expect(err.code).to.be.equal(403)
            expect(err.message).to.be.equal("Der angefragte Nutzer gehört nicht zur eigenen Schule!")
        }

        const newFakeUser = {
            schoolId: '0000d186816abba584714c5f',
            roles: ['student'],
            firstName: 'Jarle',
            lastName: 'Moe',
            email: 'jarle@moe.com',
            birthday: '',
        }

        // (POST) should succeed to create a new user to same school as admin
        let newUser;
        try {
            newUser = await Api.createStudent(jwt, newFakeUser)
        }
        catch (err) {
            console.error('Error: ', err)
        }

        let newlyCreatedUser;
        try {
            newlyCreatedUser = await Api.getStudent(jwt, newUser.data._id)
        }
        catch (err) {
            console.error('Error: ', err)
        }
        expect(newlyCreatedUser.data.schoolId).to.be.equal(adminSchoolId)

        // (PUT) should fail to replace a students information from foreign school
        try {
            await Api.replaceStudent(jwt, foreignStudentId, {})
        }
        catch (err) {
            expect(err.name).to.be.equal("MethodNotAllowed")
            expect(err.code).to.be.equal(405)
            expect(err.message).to.be.equal("Provider \'rest\' can not call \'update\'. (disallow)")
        }

        // (PATCH) should fail to replace specified student information from foreign school
        try {
            await Api.editStudent(jwt, foreignStudentId, {})
        }
        catch (err) {
            expect(err.name).to.be.equal("NotFound")
            expect(err.code).to.be.equal(404)
            expect(err.message).to.be.equal(`no record found for id '${foreignStudentId}'`)
        }

        // (DELETE) should fail to delete a student from foreign school
        try {
            await Api.deleteStudent(jwt, foreignStudentId, {})
        }
        catch (err) {
            expect(err.name).to.be.equal("NotFound")
            expect(err.code).to.be.equal(404)
            expect(err.message).to.be.equal(`no record found for id '${foreignStudentId}'`)
        }
    },

    newPupilLogsIn: async function() {
        await firstLogin.logout();
        await firstLogin.pupilLogin(eMAIL, oldPassword);
    },
    pupilAcceptsDataProtection: async function() {
        await firstLogin.firstLoginPupilFullAge(name, newPassword);
    }
}


