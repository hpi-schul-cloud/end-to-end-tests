/*[url/administration/classes]*/
const { CLIENT } = require("../../../shared-objects/servers");
const waitHelpers= require('../../../runtime/helpers/waitHelpers');
const ADMNSTRTNAdministrationOverviewPage = require('./ADMNSTRTNAdministrationOverviewPage');


const selectors = {
    urlKlassenVerwalten: `${CLIENT.URL}/administration/classes`,
    classCreateBtn: 'a[data-testid=\'createClass\']',
    classCreationExtraOptions: 'a[data-testid=\'classCreationExtraOptions\']',
    classNameInputField: 'input[data-testid=\'Klassenbezeichnung\']',
    confirmClassCreate: 'button[data-testId=\'confirmClassCreate\']',

};
module.exports = {
    selectors,

    createNewClass: async function (className = '11c') {
       
        // navigates to class administration
        await waitHelpers.waitAndClick(ADMNSTRTNAdministrationOverviewPage.selectors.administrateClassesBtn);
        
        const pageTitle = await driver.getTitle()
        expect(pageTitle.startsWith('Administration: Klassen')).to.equal(true)
    
        await waitHelpers.waitAndClick(selectors.classCreateBtn);
        
        const pageTitle2 = await driver.getTitle()
        expect(pageTitle2.startsWith('Erstelle eine neue Klasse')).to.equal(true)
    
        await waitHelpers.waitAndClick(selectors.classCreationExtraOptions)
        await waitHelpers.waitAndSetValue(selectors.classNameInputField, className)
        await waitHelpers.waitAndClick(selectors.confirmClassCreate)
    
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
    

}
   
