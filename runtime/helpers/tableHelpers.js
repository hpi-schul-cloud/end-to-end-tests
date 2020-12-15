'use strict';

const elementHelpers = require('./elementHelpers');

async function getIndexOfHeaderContainsText(tableSel, text) {
    const textList = await elementHelpers.getTextFromAllElements(`${tableSel} thead th`);
    text = text.trim();
	var index = textList.indexOf(text);
	return index;
}

async function getIndexOfRowContainsText(tableSel, text) {
    const textList = await elementHelpers.getTextFromAllElements(`${tableSel} tbody tr`);
	var index = textList.findIndex(async (element) => (await element.includes(text.trim())));
	return index;
}

module.exports = {
    getIndexOfRowContainsText,
    getIndexOfHeaderContainsText,
};