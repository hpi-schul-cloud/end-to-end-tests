/*[url/administration/classes[classId]/manage]*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers")

const editClassBtn = "a[title='administration.classes.placeholer.change']"

async function clickEditClassBtn() {
    await elementHelpers.clickAndWait(editClassBtn);
}

module.exports = {
    clickEditClassBtn,
}
