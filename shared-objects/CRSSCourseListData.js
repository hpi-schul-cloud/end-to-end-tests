const { CLIENT } = require("./servers");

module.exports = {
	pageTitle: "#page-title",

	urlCourses: `${CLIENT.URL}/courses`,

	activeCourses: '[data-section="js-active"]',

	importCourseBtn: '[data-testid="import-course-btn"]',
	createCourseBtn: '[data-testid="create-course-btn"]',

	container_of_element: '[data-testid="container_of_element"]', // in this case testid of a single course
	header_of_element: '[data-testid="header-of-element"]', //  eg background colour

	title: '[data-testid="title_of_an_element"]',

	courseColours: {
		grey: "[#ACACAC]",
		metallicGold: "[#ACACAC]",
		blue: "[#00E5FF]",
		green: "[#1DE9B6]",
		darkGrey: "[#546E7A]",
		goldenPoppy: "[#FFC400]",
		martini: "[#BCAAA4]",
		violetRed: "[#FF4081]",
		corn: "[#FFEE58]",
	},
};
