'use strict';

const { SERVER } = require("../shared-objects/servers");


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
    // get all classes names given we are on classes administration page
    getAllClassNames: async function() {
        await this.deleteFilterSchoolYears();
        let isThereAnyClass = await this.isThereAnyClass();
        let isPaginated = await this.isPaginated();
        let names = [];
        if (isPaginated==true ) {
            let pagesSelector = await driver.$$('.pagination-wrapper .pagination li');
            let lastpageIndex = pagesSelector.length-2;
            for (var i=3; i<=lastpageIndex; i++) {
                let namesContainer = await driver.$('[data-testid="students_names_container"]');
                let allClassesOnThePage = await namesContainer.$$('tr');
                for(var j=1; j<=allClassesOnThePage.length; j++) {
                    let row = await namesContainer.$('tr:nth-child('+j+')');
                    let nameSelector = await row.$('td:nth-child(1)');
                    let name = await nameSelector.getText();
                    await names.push(name);
                }
                if (i==lastpageIndex) {
                    return names; 
                } else { 
                    let nextPageSelector = await driver.$('.pagination-wrapper .pagination li:nth-child('+(i+1)+') > a');
                    await nextPageSelector.click()
                    await driver.pause(1500);
                }
            };
        } else if (isThereAnyClass==true && isPaginated==false) {
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
        let classThatShouldBeDeleted = await grade.toString()+className;
        await this.deleteFilterSchoolYears();
        let isPaginated = await this.isPaginated();
        if (isPaginated==true) {
            let pagesSelector = await driver.$$('.pagination-wrapper .pagination li');
            let lastpageIndex = pagesSelector.length-2;
            for (var i=3; i<=lastpageIndex; i++) {
                let namesContainer = await driver.$('[data-testid="students_names_container"]');
                let allClassesOnThePage = await namesContainer.$$('tr');
                for(var j=1; j<=allClassesOnThePage.length; j++) {
                    let row = await namesContainer.$('tr:nth-child('+j+')');
                    let nameSelector = await row.$('td:nth-child(1)');
                    let name = await nameSelector.getText();
                    if(name==classThatShouldBeDeleted) {
                        let administrateClassContainer = await row.$('.table-actions');
                        let deleteBtn = await administrateClassContainer.$('button[type="submit"] > i');
                        await deleteBtn.click();
                        let container = await driver.$('.modal.fade.delete-modal.in');
                        await container.waitForExist(1500);
                        let submit = await container.$('.modal-footer button[type="submit"]');
                        await submit.click();
                        await driver.pause(1500);
                        // since we have deleted a class there is a risk that page number has changed so we have to calculate it again
                        pagesSelector = await driver.$$('.pagination-wrapper .pagination li');
                        lastpageIndex = pagesSelector.length-2;
                        break;
                    } 
            }
            if (i==lastpageIndex) {
                break; 
            } else { 
                let nextPageSelector = await driver.$('.pagination-wrapper .pagination li:nth-child('+(i+1)+') > a');
                await nextPageSelector.click();
            }
            let nextPageSelector = await driver.$('.pagination-wrapper .pagination li:nth-child('+(i+1)+') > a');
            await nextPageSelector.click();
            }
        }   

    },
    // important to check first since otherwise the wanted selector won#t be loaded
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
        // the next school year should be displayed at the top, above other options
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
    upgradeClassWithPagination: async function(grade, className) {
        let classThatShouldBeUpgraded = await grade.toString()+className;
        await this.deleteFilterSchoolYears();
        let isThereAnyClass = await this.isThereAnyClass();
        let isPaginated = await this.isPaginated();
        if (isPaginated==true ) {
            let pagesSelector = await driver.$$('.pagination-wrapper .pagination li');
            let lastpageIndex = pagesSelector.length-2;
            for (var i=3; i<=lastpageIndex; i++) {
                let namesContainer = await driver.$('[data-testid="students_names_container"]');
                let allClassesOnThePage = await namesContainer.$$('tr');
                for(var j=1; j<=allClassesOnThePage.length; j++) {
                    let row = await namesContainer.$('tr:nth-child('+j+')');
                    let nameSelector = await row.$('td:nth-child(1)');
                    let name = await nameSelector.getText();
                    if(name==classThatShouldBeUpgraded) {
                        let administrateClassContainer = await row.$('.table-actions');
                        let upgradeBtn = await administrateClassContainer.$('.fa.fa-arrow-up');
                        await upgradeBtn.click();
                        await this.upgradeClassSteps();
                        await this.setFilterOfSchoolYear();
                        break;
                    }
                }
                if (i==lastpageIndex) {
                    break; 
                } else { 
                    let nextPageSelector = await driver.$('.pagination-wrapper .pagination li:nth-child('+(i+1)+') > a');
                    await nextPageSelector.click()
                    await driver.pause(1500);
                }
            };
        } else if (isThereAnyClass==true && isPaginated==false) {
            await this.upgradeClass(grade, classNAme);
        }
        else {
            return "there are no classes";
    }
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

    //check whether there is a gagination selector
    isPaginated: async function() {
        let paginationSelector = await driver.$('.pagination-wrapper > ul > li');
        let isExisting = await paginationSelector.isExisting(); 
        return isExisting;
    },
    // so that we really get ALL the classes with attribute teacherId=teacher in this test case
    deleteFilterSchoolYears: async function() {
        let closeFilterSelector = await driver.$('.filter div:nth-child(2) >button');
        await closeFilterSelector.click();
        await driver.pause(1000);
    },
    // now we set filter on elements on the page and check whether classes are shown correctly
    clickOnFilterNumOfElemsSelector: async function() {
    let filterSelector = await driver.$('.filter > div:nth-child(2) > div'); 
    await filterSelector.click();
    let selectorToBeLoaded = await driver.$('.md-dialog-container');
    await selectorToBeLoaded.waitForExist(2000);
    },
    // some actions in web driver 
    show25Elements: async function() {
        await this.clickOnFilterNumOfElemsSelector();
        let container = await driver.$('#limit-picker');
        let option = await container.$('div:nth-child(1) > label');
        await option.click(); 
        await driver.pause(500);
        let submit = await driver.$('.md-dialog-container button.md-button.md-primary > div > div');
        await submit.click();
        let selectorToBeLoaded = await driver.$('[data-testid="students_names_container"]');
        await selectorToBeLoaded.waitForExist(2000);
    },
    show50Elements: async function() {
        await this.clickOnFilterNumOfElemsSelector();
        let container = await driver.$('#limit-picker');
        let option = await container.$('div:nth-child(2) > label');
        await option.click(); 
        await driver.pause(500);
        let submit = await driver.$('.md-dialog-container button.md-button.md-primary > div > div');
        await submit.click();
        let selectorToBeLoaded = await driver.$('[data-testid="students_names_container"]');
        await selectorToBeLoaded.waitForExist(2000);
    },
    show100Elements: async function() {
        await this.clickOnFilterNumOfElemsSelector();
        let container = await driver.$('#limit-picker');
        let option = await container.$('div:nth-child(3) > label');
        await option.click();
        let submit = await driver.$('.md-dialog-container button.md-button.md-primary > div > div');
        await submit.click(); 
        let selectorToBeLoaded = await driver.$('[data-testid="students_names_container"]');
        await selectorToBeLoaded.waitForExist(2000);
    },
    // helper function
    updateNumPages: async function() {
        let actualNumPagesArray = await driver.$$('.pagination > li');
        let actualNumPagesNumber =  actualNumPagesArray.length; 
        return actualNumPagesNumber-4;
    },

    testPagination: async function() {
        let arrayOfClasses =  await this.getAllClassNames();
        let numberOfClasses = await arrayOfClasses.length;
        let isPaginated1 = await this.isPaginated();
        
        if(isPaginated1==true) {
            // switch to 1 page again
            let firstPage = await driver.$('.pagination > li:nth-child(3) > a');
            await firstPage.click();
            let mustBePagesWith25ElemFilter = await Math.ceil((numberOfClasses/25)); // int value, and 2 selectors before the first page and 2 selectors after the last page
            let mustBePagesWith50ElemFilter = await Math.ceil((numberOfClasses/50));
            let mustBePagesWith100ElemFilter = await Math.ceil((numberOfClasses/100));
            // test with 25 elems:
            await this.show25Elements();
            await driver.pause(1000);
            let pagesWith25ElemFiler = await this.updateNumPages();
            await expect(pagesWith25ElemFiler).to.equal(mustBePagesWith25ElemFilter);
            // test with 50 elems:
            await this.show50Elements();
            await driver.pause(1000);
            let isPaginated2 = await this.isPaginated();
            if (isPaginated2==true) {
                let pagesWith50ElemFiler = await this.updateNumPages();
                await expect(pagesWith50ElemFiler).to.equal(mustBePagesWith50ElemFilter);
            }
            // test with 100 elems: 
            await this.show100Elements();
            await driver.pause(1000);
            let isPaginated3 = await this.isPaginated();
            if (isPaginated3==true) {
                let pagesWith100ElemFiler = await this.updateNumPages();
                await expect(pagesWith100ElemFiler).to.equal(mustBePagesWith100ElemFilter);
            }    
        }

        

    }

}



