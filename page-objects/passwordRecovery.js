'use strict';
const { SERVER } = require("../shared-objects/servers");
const jwtDecode = require("jwt-decode");
const mailHelper = require('../shared_steps/mailslurper');
const loginData = require('../shared-objects/loginData');
const teacherLogin = require('../page-objects/teacherLogin');
const firstLogin = require('../shared_steps/firstLogin.js');
const Axios = require("axios");


// TODO: mail lookup

module.exports = {

clickOnPasswordRecovery: async function() {
    const pswdRecoverySelector = await driver.$('.submit-pwrecovery');
    await pswdRecoverySelector.click();
    await driver.pause(2000);

},
submitEmail: async function(registeredEmail) {
 
    const emailSelector = await driver.$('#username');
    await emailSelector.setValue(registeredEmail);
    const btnConatiner = await driver.$('.pwrecovery-modal.in');
    const submitBtn = await btnConatiner.$('button.btn.btn-primary.btn-submit');
    await submitBtn.click();
    
},
/* the func checks whether mail with password was sent */
isMailed: async function(email) {
    const subjectOfEmail = await mailHelper.getEmailSubject(email)
    const expectedSubject = "Passwort zurücksetzen für die Schul-Cloud";
    await expect(subjectOfEmail).to.equal(expectedSubject);
},
/* get the link from mailslurper, navigate and set a new valid password */ 
setNewPassword: async function(email, password) { 
    const link = await driver.getUrl(); 
    const regExp = /\/\/[a-z],[0-9]{4}/;
    const url = await link.match(regExp); 
    const sys = await url.substr(2, url.length-1);
    const mailedLink = await mailHelper.getEmailLink(email, sys);
    await helpers.loadPage(mailedLink, 20);
    await this.setNewPasswordSteps(password);
}, 
setNewPasswordSteps: async function(password) {
    let passwordSelector = await driver.$('#password');
    let passwordControlSelector = await driver.$('#password_control'); 
    await helpers.waitAndSetValue(passwordSelector, password);
    await helpers.waitAndSetValue(passwordControlSelector, password); 
    let submitBtn = await driver.$('input[type="submit"]');
    await helpers.waitAndClick(submitBtn); 

},
/* a helper function which returns the role of the person */ 
getUsersRole: async function() {
    const cookies = await driver.getCookies(["jwt"])
    const jwt = cookies[0].value;
    const userInfo = jwtDecode(jwt);
    const years = await Axios.request({
            url: `${SERVER.URL}/me`,
            headers: {
                Cookie: `jwt=Bearer ${jwt};`
            }
        })
    const myRole = roles.name;
    return myRole;
},
userCanLoginWithANewPassword: async function(email, password) {
    await helpers.loadPage(loginData.url, 10);
    await driver.pause(1000);
    await teacherLogin.performLogin(email, password); // this function is also applicable to student and admin login
    let usersRole = await this.getUsersRole; // then we have to perform the first login accordingly 
    switch (usersRole) {
        case "teacher" :
        await firstLogin.teacherLogin(email, password);
        break;
        case "student":
        await firstLogin.firstLoginPupilFullAge(email, password);
        break;
        case "admin":
        await firstLogin.teacherLogin(email, password);
        break;
    }
    await teacherLogin.loginResult(); // verify that the initials in the circle correspond the name of the person
}
}
