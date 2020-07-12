'use strict';

    
module.exports = {
    /**
	* Visual comparison function
	* @param fileName
	* @returns {Promise<void>}
	*/
	compareImage: async(fileName) => {
		const verify = require('./imageCompare');
		await verify.assertion(fileName);
		await verify.value();
		await verify.pass();
	},
    }
