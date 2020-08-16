/*[url/administration/classes]*/
const { CLIENT } = require("../../../shared-objects/servers");
const ADMNSTRTNAdministrationOverviewPage = require("../administrationPages/ADMNSTRTNAdministrationOverviewPage");


const selectors = {

    urlKlassenVerwalten: `${CLIENT.URL}/administration/classes`,
    classCreateBtn: 'a[data-testid=\'createClass\']',
    classCreationExtraOptions: 'a[data-testid=\'classCreationExtraOptions\']',
    classNameInputField: 'input[data-testid=\'Klassenbezeichnung\']',
    confirmClassCreate: 'button[data-testId=\'confirmClassCreate\']',
};


module.exports = {

    createNewClass: async function (className = '11c') {
        // navigates to administration tools
        await ADMNSTRTNAdministrationOverviewPage.goToAdministration();
    
        // navigates to class administration
        const administrateClassesBtn = await driver.$(ADMNSTRTNAdministrationOverviewPage.administrateClassesBtn);
        await administrateClassesBtn.click();
    
        const pageTitle = await driver.getTitle()
        expect(pageTitle.startsWith('Administration: Klassen')).to.equal(true)
    
        const createClassBtn = await driver.$(selectors.classCreateBtn);
        await createClassBtn.click();
    
        const pageTitle2 = await driver.getTitle()
        expect(pageTitle2.startsWith('Erstelle eine neue Klasse')).to.equal(true)
    
        const classCreationExtraOptions = await driver.$(selectors.classCreationExtraOptions)
        await classCreationExtraOptions.click()
    
        const classNameInputField = await driver.$(selectors.classNameInputField)
        await classNameInputField.setValue(className);
    
        const confirmButton = await driver.$(selectors.confirmClassCreate)
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
}
