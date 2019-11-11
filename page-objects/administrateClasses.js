'use strict';

module.exports = {
    initalizeCreateClass: async function() {
        let addClassIcon = await driver.$('div[data-testid="administrate_classes"]');
        await addClassIcon.click();

    },
    addANewClass: async function() {
        let btnContainer = await driver.$('.container-fluid.ajaxcontent');
        await btnContainer.waitForExist(1500);
        let addClassBtn = await btnContainer.$('.btn.btn-primary.btn-add');
        await addClassBtn.click();
        let selectorToBeLoaded = await driver.$('input[name="classsuffix"]');
        await selectorToBeLoaded.waitForExist(3000);
    },
    createAnewClass: async function(grade,className) {
        await this.addANewClass();
        let classSuffixSelector = await driver.$('input[name="classsuffix"]');
        await classSuffixSelector.setValue(className);
        await driver.pause(1000);
        let schoolYear = await driver.$('#createnew .chosen-single');
        await schoolYear.click();
        let index = parseInt(grade)+1;
        let schoolYearOption = await driver.$('#createnew  .chosen-drop  .chosen-results > li:nth-child('+index+')');
        
        await schoolYearOption.click();
        let btnContainer = await driver.$('.create-form');
        let submitBtn = await btnContainer.$('button[type="submit"]');
        await submitBtn.click();
        let addStudentField = await driver.$('.search-field');
        await addStudentField.waitForExist(1500);
    },
    addStudentToTheClass: async function(firstname, lastname) {
        let searchRequest = firstname + " " + lastname;
        const searchName = searchRequest.trim().split(" ")[0];
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
        let isThereAnyClass = await this.isThereAnyClass();
        if (isThereAnyClass==true) {
        let names = [];
        let namesContainer = await driver.$('[data-testid="students_names_container"]');
        let allClasses = await namesContainer.$$('tr');
        for(var i=1; i<=allClasses.length; i++) {
            let row = await namesContainer.$('tr:nth-child('+i+')');
            let nameSelector = await row.$('td:nth-child(1)');
            let name = await nameSelector.getText();
            await names.push(name);
        }
        return names;
    } else {
        return "there are no classes";
    }

    },
    deleteClass: async function(grade,className) {
        let classThatShouldBeDeleted = await  grade.toString()+className;
        let namesContainer = await driver.$('[data-testid="students_names_container"]');
       
        let allClasses = await namesContainer.$$('tr');
        for(var i=1; i<=allClasses.length; i++) {
            const row = await namesContainer.$('tr:nth-child('+i+')');
            let nameSelector = await row.$('td:nth-child(1)');
            let name = await nameSelector.getText();
            if (name === classThatShouldBeDeleted) {
                let administrateClassContainer = await row.$('.table-actions');
                let deleteBtn = await administrateClassContainer.$('button[type="submit"]');
                await deleteBtn.click();
                break;
            }
        }
        let submitFormContainer = await driver.$('.modal.fade.delete-modal.in');
        await submitFormContainer.waitForExist(1500);
        let submitDeleteBtn = await submitFormContainer.$('button[type="submit"]');
        await submitDeleteBtn.click();
        let selectorToBeLoaded = await driver.$('.container-fluid.ajaxcontent');
        await selectorToBeLoaded.waitForExist(2000);

    },
    
    isThereAnyClass: async function() {
        let elem = await driver.$('[data-testid="students_names_container"]');
        let isExisting = await elem.isExisting(); 
        return isExisting;
    },
    clickUpgradeClass: async function(grade, className) {
        let classThatShouldBeUpgraded = await  grade.toString()+className;
        let namesContainer = await driver.$('[data-testid="students_names_container"]');
       
        let allClasses = await namesContainer.$$('tr');
        for(var i=1; i<=allClasses.length; i++) {
            const row = await namesContainer.$('tr:nth-child('+i+')');
            let nameSelector = await row.$('td:nth-child(1)');
            let name = await nameSelector.getText();
            if (name === classThatShouldBeUpgraded) {
                let administrateClassContainer = await row.$('.table-actions');
                let upgradeBtn = await administrateClassContainer.$('.fa.fa-arrow-up');
                await upgradeBtn.click();
                break;
            }
        }

    },
    upgradeClassSteps: async function() {
        // if you want to change name of the class please add steps here
        let btnContainer = await driver.$('.create-form');
        let submitBtn = await btnContainer.$('button[type="submit"]');
        await submitBtn.click();
        let selectorToBeLoaded = await driver.$('#titlebar');
        await selectorToBeLoaded.waitForExist(3000);
        // if you want to change the student list or teacher add here

        let btnContainer2 = await driver.$('.section-classes-manage');
        let submitBtn2 = await btnContainer2.$('button[type="submit"]');
        await submitBtn2.click();
        let selectorToBeLoaded2 = await driver.$('[data-testid="students_names_container"]');
        await selectorToBeLoaded2.waitForExist(3000);

    },
    setFilterOfSchoolYear: async function() {
        let filterContainer = await driver.$('.filter');
        let schoolYearFilter = await filterContainer.$('div:nth-child(2)');
        await schoolYearFilter.click();
        let containerInFilterMenu = await driver.$('#selection-picker');
        await containerInFilterMenu.waitForExist(2000);
        // the next school year should be displayed at the bottom, above other options
        let option = await driver.$('#selection-picker > div > div > div > div');
        await option.click();
        await driver.pause(500);
        let submitBtnContainer = await driver.$('.md-dialog-actions');
        let submitBtn = await submitBtnContainer.$('button:nth-child(2)');
        await submitBtn.click();
        await driver.pause(1500);


    },
    upgradeClass: async function(grade, className) {
        await this.clickUpgradeClass(grade, className);
        await this.upgradeClassSteps();
        await this.setFilterOfSchoolYear();
    },
    verifyUpgradeClass: async function(grade, className) {
        let a = await parseInt(grade);
        let nextgrade = (a+1).toString();
        let name = nextgrade+ className;
        let classes = await this.getAllClassNames();
        await expect(classes).to.include(name);
    },

    upgradeBtnGradeThirteenMustBeDeaktivated: async function(grade, className) {
        let classThatShouldBeUpgraded = await  grade.toString()+className;
        let namesContainer = await driver.$('[data-testid="students_names_container"]');
       
        let allClasses = await namesContainer.$$('tr');
        var isExisting;
        for(var i=1; i<=allClasses.length; i++) {
            const row = await namesContainer.$('tr:nth-child('+i+')');
            let nameSelector = await row.$('td:nth-child(1)');
            let name = await nameSelector.getText();
            
            if (name === classThatShouldBeUpgraded) {
                let administrateClassContainer = await row.$('.table-actions');
                let upgradeBtn = await administrateClassContainer.$('.btn.btn-secondary.btn-sm.disabled');
                isExisting = await upgradeBtn.isExisting();
                break;
            }
        }
        return isExisting; 

    },
    //pagination

    create35Classes: async function(firstname, lastname) {
        
        for (var i=1; i<=35; i++) {
            await this.createAnewClass(1,i);
            await this.addStudentToTheClass(firstname, lastname);
        }
    },


}



