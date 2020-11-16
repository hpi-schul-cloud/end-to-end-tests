'use strict';

/**
 * Converting String date into the Date format
 * @param date : String date that user passes in
 * @param format : "dd/MM/yyyy", "mm/dd/yyyy", "mm-dd-yyyy"
 * @param delimiter
 * @returns {Date}
 *
 * Example use
 *
 * stringToDate("17/9/2014","dd/MM/yyyy","/");
 * stringToDate("9/17/2014","mm/dd/yyyy","/")
 * stringToDate("9-17-2014","mm-dd-yyyy","-")
 */
function stringToDate(date, format, delimiter) {
	let formatLowerCase = format.toLowerCase();
	let formatItems = formatLowerCase.split(delimiter);
	let dateItems = date.split(delimiter);
	let monthIndex = formatItems.indexOf('mm');
	let dayIndex = formatItems.indexOf('dd');
	let yearIndex = formatItems.indexOf('yyyy');
	let month = parseInt(dateItems[monthIndex]);
	month -= 1;
	return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
}

/**
 * Converting date into date string for files
 * @returns {StringDate} : ddMMyyyyHHmmss
 */
function getDateStringForFiles() {
	let date = getCurrentDateWithFormat("dd/MM/yyyy HH:mm:ss").toString();
	return date.replace(/\//g, '').replace(/:/g, '').replace(' ', '');
}

/**
 * Returns formatted date for given time zone offset and date offset
 * @param tzOffset : +/-number
 * @param months : +/-number
 * @param years : +/-number
 * @param hours : +/-number
 * @param minutes : +/-number
 * @param tzOffset : +/-number
 * @param format : default = "dd.mm.yyyy hh:mm" or "dd.mm.yyyy hh:mm", "dd.mm.yyyy", "dd/mm/yyyy"
 * @returns {StringDate}
 *
 * Example use
 * getFormattedDateWithOffset({days = +1, months = -3 , tzOffset = +1, format = "dd/mm/yyyy"});
 * getFormattedDateWithOffset({}); - get current date with default format
 * You do not need to give all method paremeters !!!
 */
function getFormattedDateWithOffset({date, days, months, years, hours, minutes, tzOffset, format}) {
	date = getDate({date: date, tzOffset: tzOffset});
	if (days) date.setDate(date.getDate() + days);
	if (months) date.setMonth(date.getMonth() + months);
	if (years) date.setFullYear(date.getFullYear() + years);
	if (hours) date.setHours(date.getHours() + hours);
	if (minutes) date.setMinutes(date.getMinutes() + minutes);
	return getFormattedDate(date, format);
}

function getCurrentFormattedDateWithOffset({days, months, years, hours, minutes, tzOffset, format}) {
	return getFormattedDateWithOffset({days: days, months : months, years: years, hours: hours, minutes: minutes, tzOffset: tzOffset, format: format});
}

/**
 * Returns formatted date
 * @param format : default = "dd.mm.yyyy hh:mm" or "dd.mm.yyyy hh:mm", "dd.mm.yyyy", "dd/mm/yyyy"
 * @param {Date}
 * @returns {StringDate}
 */
function getDateWithFormat(date, format) {
	return getFormattedDateWithOffset({date: date, format: format});
}

/**
 * Returns formatted current date
 * @param format : default = "dd.mm.yyyy hh:mm" or "dd.mm.yyyy hh:mm", "dd.mm.yyyy", "dd/mm/yyyy"
 * @returns {StringDate}
 */
function getCurrentDateWithFormat(format) {
	return getCurrentFormattedDateWithOffset({format: format});
}

function getFormattedDate(date, format) {
	let dd = addZeroBefore(date.getDate());
	let MM = addZeroBefore(date.getMonth() + 1); // +1 January is 0!
	let yyyy = date.getFullYear();
	let HH = addZeroBefore(date.getHours());
	let mm = addZeroBefore(date.getMinutes());
	let ss = addZeroBefore(date.getSeconds());
	switch (format.toLowerCase()) {
		case 'dd.mm.yyyy hh:mm:ss':
			date = `${dd}.${MM}.${yyyy} ${HH}:${mm}:${ss}`;
			break;
		case 'dd-mm-yyyy hh:mm:ss':
			date = `${dd}-${MM}-${yyyy} ${HH}:${mm}:${ss}`;
			break;
		case 'dd/mm/yyyy hh:mm:ss':
			date = `${dd}/${MM}/${yyyy} ${HH}:${mm}:${ss}`;
			break;
		case 'dd.mm.yyyy hh:mm':
			date = `${dd}.${MM}.${yyyy} ${HH}:${mm}`;
			break;
		case 'dd.mm.yyyy':
			date = `${dd}.${MM}.${yyyy}`;
			break;
		case 'dd/mm/yyyy':
			date = `${dd}/${MM}/${yyyy}`;
			break;
		case 'dd-mm-yyyy':
			date = `${dd}-${MM}-${yyyy}`;
			break;
		case 'mm/dd/yyyy':
			date = `${MM}.${dd}.${yyyy}`;
			break;
		default:
			console.error(`This date format: ${format} does not exist on the list of possible choices`);
			break;
	}
	return date;
}

 /**
 * Returns current date for given time zone
 * @param tzOffset : +/-number
 * @returns {Date}
 *
 * Example use
 * getCurrentDate(+5,5})
 */
function getDate({date, tzOffset}) {
	date = (!date ? new Date() : date);
	if (tzOffset) {
		var utc = date.getTime() + (date.getTimezoneOffset() * 60000); 
		date = new Date(utc + 3600000 * tzOffset);
	}
	return date;
}

function addZeroBefore(n) {
	return (n < 10 ? '0' : '') + n;
}

module.exports = {
	stringToDate,
	getDateStringForFiles,
	getCurrentDateWithFormat,
	getFormattedDateWithOffset,
	getCurrentFormattedDateWithOffset,
};
