'use strict';

const addCoursePage = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const generalCoursePage = require("../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const courseTopicsPage = require("../page-objects/pages/coursePages/CRSSCourseTopicsPage");
const addEditTopicPage = require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
let coursesCount;

// _________Copy__________

Given(/^the teacher creates a course with name (.*) and$/, function(coursename) {
	return addCoursePage.createCourse(coursename);
});

Given(/^the amount of courses is x$/, async function() {
	//coursesCount = await copyCourse.countCourses();
	await courseListPage.goToCourses();
	coursesCount = await courseListPage.countDisplayedCoursesForSection(courseListPage.section.activeCourses);
});

When(/^the teacher selects the course (.*) and clicks clone it$/, async function(coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.allCourses);
	await generalCoursePage.cloneCourse();
});
Then(/^the amount of courses is implemented$/, async function() {
	//let coursesCountAfterCloning = await copyCourse.countCourses();
	await courseListPage.goToCourses();
	let coursesCountAfterCloning = await await courseListPage.countDisplayedCoursesForSection(courseListPage.section.activeCourses);
	await expect(coursesCount+1).to.equal(coursesCountAfterCloning);
});

// _________With Text__________
Given(/^the teacher creates some with name (.*)$/, function(coursename) {
	return addCoursePage.createCourse(coursename);
});
Given(/^the teacher chooses the created course with (.*) and$/, function(coursename) {
	return courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
});
When(/^the teacher adds a Topic with name (.*)$/, async function(topicname) {
	//return copyCourse.addTopic(topicname);
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicname);

});
When(/^the teacher adds some Text (.*) to the course$/, async function(text) {
	await addEditTopicPage.addText(text);
	await addEditTopicPage.clickCreateTopicButton();
});

When(/^the teacher clicks copy course (.*) with Text$/, async function(coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.allCourses);
	await generalCoursePage.cloneCourse();
});

When(/^teacher sees the course (.*) was copied and the topic (.*) is still availiable$/, async function(coursename, topicname) {
		//return copyCourse.verify(coursename, topicname);
	await courseListPage.goToCourses();
	await courseListPage.verifyCourseAndTopic(coursename, topicname);
	});

// _________With GeoGebra__________

When(/^the teacher adds some GeoGebraArbeitsblatt with id (.*) to the course$/, async function(geogebraID) {
	//return copyCourse.addGeoGebra(geogebraID);
	await addEditTopicPage.addGeoGebra(geogebraID);
	await addEditTopicPage.clickCreateTopicButton();

});
When(/^the teacher clicks copy course (.*) with GeoGebraArbeitsblatt$/, async function(coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.allCourses);
	await generalCoursePage.cloneCourse();
});
Then(/^teacher sees the course (.*) copy and the GeoGebraArbeitsblatt (.*) is still availiable$/, async function(coursename, topicname) {
		//return copyCourse.verify(coursename, topicname);
		await courseListPage.goToCourses();
		await courseListPage.verifyCourseAndTopic(coursename, topicname);
	});

// _________With Etherpad__________
When(/^the teacher adds some Etherpad with (.*) and (.*) to the course$/, async function(etherpadName, etherpadDescription) {
	//return copyCourse.addEtherpad(etherpadName, etherpadDescription);
	await addEditTopicPage.addEtherpad(etherpadName, etherpadDescription);
	await addEditTopicPage.clickCreateTopicButton();
});
When(/^the teacher clicks copy course (.*) with Etherpad$/, async function(coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.allCourses);
	await generalCoursePage.cloneCourse();
});
Then(/^teacher sees the course (.*) copy and the Etherpadd (.*) is still availiable$/, async function(coursename, topicname) {
	//return copyCourse.verify(coursename, topicname);
	await courseListPage.goToCourses();
	await courseListPage.verifyCourseAndTopic(coursename, topicname);
});


// _________With pupils__________
Given(/^the teacher creates a course with name (.*) and student (.*)$/, function(coursename, studentname) {
	return addCoursePage.createCourseWithStudents(coursename, studentname);
});
When(/^the teacher copies the course (.*) with students$/, async function(coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.allCourses);
	await generalCoursePage.cloneCourse();
});
Then(/^the teacher should see the cloned course (.*) but without students$/, async function(coursename) {
		//return copyCourse.verifyCopyWithStudents(coursename);
		await courseListPage.goToCourses();
		await courseListPage.verifyCopyWithStudents(coursename);
	});
