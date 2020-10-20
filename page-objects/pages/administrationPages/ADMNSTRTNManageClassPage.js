/*[url/administration/classes[classId]/manage]*/

const elementHelpers = require("../../../runtime/helpers/elementHelpers")

const editClassBtn = "a.d-block.mb-1"


async function clickEditClassBtn() {
    await elementHelpers.clickAndWait(editClassBtn)
}

module.exports = {
    clickEditClassBtn,
}
