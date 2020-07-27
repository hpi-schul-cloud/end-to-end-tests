const { CLIENT } = require("./servers");

module.exports = {
	pageTitle: "#page-title",
	titleOfAnElement: '[data-testid="title_of_an_element"]',
	titleOfCourse: ".title",

	urlCourses: `${CLIENT.URL}/courses`,

	activeCourses: ".section-activeCourses",
	courseContainer: '[data-testid="courses"]',

	importCourseBtn: '[data-testid="import-course-btn"]',
	createCourseBtn: '[data-testid="create-course-btn"]',

	container_of_element: '[data-testid="container_of_element"]', // in this case testid of a single course
	header_of_element: '[data-testid="header-of-element"]', //  eg background colour

	title: '[data-testid="title_of_an_element"]',

	courseColour: {
		grey: "background:#ACACAC",
		metallicGold: "background:#ACACAC",
		blue: "background:#00E5FF",
		green: "background:#1DE9B6",
		darkGrey: "background:#546E7A",
		goldenPoppy: "background:#FFC400",
		martini: "background:#BCAAA4",
		violetRed: "background:#FF4081",
		corn: "background:#FFEE58",
	},
};
