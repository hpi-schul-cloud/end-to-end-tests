'use strict';
let log = global.log;

module.exports = {
    /**
	* Generates a random 13 digit number
	* @param length
	* @returns {number}
	*/
	randomNumberGenerator: function(length=13) {
		let baseNumber = Math.pow(10, length -1 );
		let number = Math.floor(Math.random()*baseNumber);
		/**
		* Check if number have 0 as first digit
		*/
		if (number < baseNumber) {
			number += baseNumber;
		}
		log.info('this is the number ' + number);
		return number;
	},

	/**
		* Generate random integer from a given range
		*/
	generateRandomInteger: function (range) {
		return Math.floor(Math.random() * Math.floor(range));
	},
	/**
		* This method is useful for dropdown boxes as some of them have default "Please select" option on index 0
		*
		* @param range
		* @returns randomNumber excluding index 0
		*/
	getRandomIntegerExcludeFirst: function (range) {
		let randomNumber = helpers.generateRandomInteger(range);

		if (randomNumber <= 1) {
			randomNumber += 2;
		}
		return randomNumber;
	},

}
