/*[url/administration/classes[classId]/edit]*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers")
const classYearInput = "[data-placeholder='Schuljahr auswählen']"
const saveChangesBtn = "button.btn.btn-primary"

async function changeSchoolYear (){
    let dropdown = await driver.$(classYearInput);
    await dropdown.selectByIndex(1);
 }

async function clickSafeChanges() {
    await elementHelpers.clickAndWait(saveChangesBtn)
}

module.exports = {
    changeSchoolYear,
    clickSafeChanges,
}
