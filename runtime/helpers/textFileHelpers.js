'use strict';
let log = global.log;
const fs = require('fs');

module.exports = {
	/**
	 * writeTextFile write data to file on hard drive
	 * @param  string  filepath   Path to file on hard drive
	 * @param  string   output     Data to be written
	 */
	writeTextFile: function (filepath, output) {
		try {
            fs.writeFile(filepath, output, (err) => {
				if (err) {
					log.error(err.message);
				}
			});
			log.info('File has been written successfully');
		} catch (err) {
			if (err) {
				log.info('Error in writing file ' + err.message);
				throw err;
			}
		}
	},
};
