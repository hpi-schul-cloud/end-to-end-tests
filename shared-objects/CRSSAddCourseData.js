const { CLIENT } = require("./servers");

module.exports = {
	urlCoursesAdd: `${CLIENT.URL}/courses/add`,

	//Sections
	nextSectionBtn: "#nextSection",
	section: {
		one: '[data-testid="section-1-area"]',
		two: '[data-testid="section-2-area"]',
		three: '[data-testid="section-3-area"]',
	},

	chosenDefInput: ".chosen-search-input.default",
	chosenInput: ".search-choice span",

	//Course data section
	courseNameInput: '[data-testid="coursename"]',
	teacherContainer: '[data-testid="teachers_container"]',
	teacherSubContainer: '[data-testid="courseSubstitute_container"]',

	colourPicker: ".color-picker__item",
	listOfColours: [
		"grey",
		"metallicGold",
		"blue",
		"green",
		"darkGrey",
		"goldenPoppy",
		"martini",
		"violetRed",
		"corn",
	],

	timeSpan: {
		start: '[data-testid="date_start"]',
		end: "#untilDate",
	},

	//Participants section
	classContainer: '[data-testid="class_container"]',
	studentsContainer: '[data-testid="students_container"]',

	//Final section
	createNewCourseBtn: '[data-testid="einen-weiteren-kurs-anlegen-btn"]',
	goToCourseListBtn: '[data-testid="zur-uebersicht-btn"]',
};
