/*[url/administration/classes]*/
const { CLIENT } = require("../../../shared-objects/servers");
const waitHelpers = require('../../../runtime/helpers/waitHelpers');
const ADMNSTRTNAdministrationOverviewPage = require('./ADMNSTRTNAdministrationOverviewPage');


const urlKlassenVerwalten = `${CLIENT.URL}/administration/classes`;
const classCreateBtn = 'a[data-testid=\'createClass\']';
const classCreationExtraOptions = 'a[data-testid=\'classCreationExtraOptions\']';
const classNameInputField = 'input[data-testid=\'Klassenbezeichnung\']';
const confirmClassCreate = 'button[data-testId=\'confirmClassCreate\']';

module.exports = {
    createNewClass: async function (className = '11c') {
        // navigates to class administration
        //TODO - weg, wenn's klappt: await waitHelpers.waitAndClick(ADMNSTRTNAdministrationOverviewPage.administrateClassesBtn);
        await ADMNSTRTNAdministrationOverviewPage.clickAdministrateClasses();

        const pageTitle = await driver.getTitle()
        expect(pageTitle.startsWith('Administration: Klassen')).to.equal(true)

        await waitHelpers.waitAndClick(classCreateBtn);

        const pageTitle2 = await driver.getTitle()
        expect(pageTitle2.startsWith('Erstelle eine neue Klasse')).to.equal(true)

        await waitHelpers.waitAndClick(classCreationExtraOptions)
        await waitHelpers.waitAndSetValue(classNameInputField, className)
        await waitHelpers.waitAndClick(confirmClassCreate)

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

