'use strict';


module.exports = {
    addANewClass: async function() {
        let addClassIcon = await driver.$('div[data-testid="administrate_classes"]');
        await addClassIcon.click();
        let url1 = await driver.getUrl(); // expected administration/classes/....sort,limit blabla
        let btnContainer = await driver.$('.container-fluid.ajaxcontent');
        await btnContainer.waitForExist(1500);
        let addClassBtn = await btnContainer.$('.btn.btn-primary.btn-add');
        await addClassBtn.click();
        let url2 = await driver.getUrl(); // expected /administration/classes/create
        let selectorToBeLoaded = await driver.$('input[name="classsuffix"]');
        await selectorToBeLoaded.waitForExist(3000);
    },
    createAnewClass: async function(classSuffix) {
        await this.addANewClass();
        let classSuffixSelector = await driver.$('input[name="classsuffix"]');
        await classSuffixSelector.setValue(classSuffix);
        let btnContainer = await driver.$('.create-form');
        let submitBtn = await btnContainer.$('button[type="submit"]');
        await submitBtn.click();
        let addStudentField = await driver.$('.search-field');
        await addStudentField.waitForExist(1500);
    },
    addStudentToTheClass: async function(firstname, lastname) {
        let searchRequest = firstname + " " + lastname;
        const searchName = searchRequest.trim().split(" ")[0];
        //let container = await driver.$('.chosen-container chosen-container-multi chosen-with-drop chosen-container-active');
        let upperContainer = await driver.$('.container-fluid.ajaxcontent > div:nth-child(3)');
        let container = await upperContainer.$('.chosen-container');
        const searchInput = await container.$(".chosen-search-input");
        await searchInput.click();
        await searchInput.setValue(searchName);
        const searchResult = await container.$(`.chosen-results .active-result.red`)
        await searchResult.click();
        await this.submitAddStudentTotheClass();
    },
    submitAddStudentTotheClass: async function() {
        let btnContainer = await driver.$('.container-fluid.ajaxcontent');
        let btn = await btnContainer.$('button[type="submit"]');
        await btn.click();
        let selectorToBeLoaded = await driver.$('.container-fluid.ajaxcontent tr');
        await selectorToBeLoaded.waitForExist(3000);
    },
    getAllClassNames: async function() {
        let names = [];
        let namesContainer = await driver.$('[data-testid=students_names_container]');
        let allClasses = await namesContainer.$$('tr');
        for(var i=1; i<=allClasses.length; i++) {
            let row = await namesContainer.$('tr:nth-child('+i+')');
            let nameSelector = await row.$('td:nth-child(1)');
            let name = await nameSelector.getText();
            await names.push(name);
        }
        return names;

    }

    }



