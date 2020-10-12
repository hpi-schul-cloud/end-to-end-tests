'use strict';
let log = global.log;

/**
 * Generates a random 13 digit number
 * @param length
 * @returns {number}
 */
function getRandomNumber(length = 13) {
	let baseNumber = Math.pow(10, length - 1);
	let number = Math.floor(Math.random() * baseNumber);
	//Check if number have 0 as first digit
	if (number < baseNumber) {
		number += baseNumber;
	}
	log.info('this is the number ' + number);
	return number;
}

function getRandomInteger(range) {
	return Math.floor(Math.random() * Math.floor(range));
}
/**
 * This method is useful for dropdown boxes as some of them have default "Please select" option on index 0
 * @param range
 * @returns randomNumber excluding index 0
 */
function getRandomIntegerExcludeFirst(range) {
	let randomNumber = getRandomInteger(range);
	if (randomNumber < 1) {
		randomNumber += 2;
	}
	return randomNumber;
}

module.exports = {
	getRandomNumber,
	generateRandomInteger: getRandomInteger,
	getRandomIntegerExcludeFirst,
};
