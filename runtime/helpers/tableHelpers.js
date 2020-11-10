'use strict';

const elementHelpers = require('./elementHelpers');

async function getIndexOfHeaderContainsText(tableSel, text) {
    const textList = await elementHelpers.getTextFromAllElements(tableSel + " th");
    text = text.trim();
	var index = textList.indexOf(text);
	return index;
}

async function getIndexOfRowContainsText(tableSel, text) {
    const textList = await elementHelpers.getTextFromAllElements(tableSel + " tr");
    text = text.trim();
	var index = textList.indexOf(text);
	return index;
}

module.exports = {
    getIndexOfRowContainsText,
    getIndexOfHeaderContainsText,
};