'use strict';

module.exports = {

/**
		* Converting String date into the Date format
		*
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
        stringToDate: function (date, format, delimiter) {
            let formatLowerCase = format.toLowerCase();
            let formatItems = formatLowerCase.split(delimiter);
            let dateItems = date.split(delimiter);
            let monthIndex = formatItems.indexOf('mm');
            let dayIndex = formatItems.indexOf('dd');
            let yearIndex = formatItems.indexOf('yyyy');
            let month = parseInt(dateItems[monthIndex]);
            month -= 1;
            return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        },
    
        /**
            * Get the current date dd-mm-yyyy
            * @returns {string|*}
            */
        currentDate: function () {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1; //January is 0!
            let yyyy = today.getFullYear();
    
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
    
            return yyyy + '-' + mm + '-' + dd ;
        },
/**
		* Converting String date into the Date format
		*
        * @param day : number +/- days that user passes in 
        * @param month : number +/- months that user passes in
        * @param year : number +/- years that user passes in
        * @param delimiter : /, -, .
        * @param isOrderYearMonthDay : "dd/MM/yyyy" or "yyyy/MM/dd", false/true
		* @returns {string}
		*
		* Example use
		*
		* setDate(1, 0 , 1, '.', true);
		* setDate(-10 ,5 , -1, '/', false)
		*/
        setDate: function (day, month, year, delimiter, isOrderYearMonthDay) {
            let today = new Date();
            today.setDate(today.getDate()+day);
            today.setMonth((today.getMonth()+1)+month);// +1 January is 0!
            today.setFullYear(today.getFullYear()+year);
            let dd = today.getDate();
            let months = today.getMonth();
            let yyyy = today.getFullYear();

            if(isOrderYearMonthDay){
                return yyyy + delimiter + (months <= 9 ? '0'+ months : months) + delimiter + (dd <= 9 ? '0'+ dd : dd);
            } else {
                return (dd <= 9 ? '0'+ dd : dd)+ delimiter + (months <= 9 ? '0'+ months : months) + delimiter + yyyy;
            }
        },
    
        /**
            * Get current date and time dd/mm/yyy 00:00:00
            */
        getCurrentDateTime: function () {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1; //January is 0!
            let yyyy = today.getFullYear();
            let hours = today.getHours();
            let minutes = today.getMinutes();
            let seconds= today.getSeconds();
    
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
    
            if (hours < 10){
                hours = '0' + hours;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            return dd + '-' + mm + '-' + yyyy + '-' + hours + ':' + minutes + ':' + seconds;
        },
    
        getEndDateTime: function () {
            let eDate = this.getCurrentDateTime();
            return eDate;
        },
    
        getStartDateTime: function () {
            let sDate = this.getCurrentDateTime();
            return sDate;
        },
    
        getCurrentDateFormatted: function () {
            return this.getCurrentDateTime().replace(/\//g, '').replace(/:/g, '').replace(' ', '');
        },

        	/**
	*  Reformats date string into string
	* @param dateString
	* @returns {string}
	*/
	reformatDateString: function (dateString) {
		let months = {
			'01': 'January',
			'02': 'February',
			'03': 'March',
			'04': 'April',
			'05': 'May',
			'06': 'June',
			'07': 'July',
			'08': 'August',
			'09': 'September',
			'10': 'October',
			'11': 'November',
			'12': 'December'
		};
		let b = dateString.split('/');
		return b[0] + ' ' + months[b[1]] + ' ' + b[2];
	},

	/**
		*  Sorts results by date
		* @param array
		* @returns {*}
		*/
	sortByDate: function (array) {
		array.sort(function (a, b) {
			let sentDateA = a.split('/');
			let c = new Date(sentDateA[2], sentDateA[1], sentDateA[0]);
			let sentDateB = b.split('/');
			let d = new Date(sentDateB[2], sentDateB[1], sentDateB[0]);
			return d - c;
		});
		return array;
	},
    dateToString: async function() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        let hours = "00";
        let minutes = "00";

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        return dd + '.' + mm + '.' + yyyy + '.' + hours + '.' + minutes;

    },
    randomDate: async function() {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear()+1;
        let hours = "11";
        let minutes = "00";

        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        return dd + '.' + mm + '.' + yyyy + '.' + hours + '.' + minutes;
    }
}
        