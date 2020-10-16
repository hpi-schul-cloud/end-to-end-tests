'use strict';

const addCoursePage = require("../page-objects/pages/coursePages/CRSSAddCoursePage");
const courseListPage = require("../page-objects/pages/coursePages/CRSSCourseListPage");
const generalCoursePage = require("../page-objects/pages/coursePages/CRSSGeneralCoursePage");
const courseTopicsPage = require("../page-objects/pages/coursePages/CRSSCourseTopicsPage");
const addEditTopicPage = require("../page-objects/pages/coursePages/CRSSAddEditTopicPage");
let coursesCount;

// _________Copy__________

Given(/^.* creates a course with name (.*) and$/, function (coursename) {
	return addCoursePage.createCourse(coursename);
});

Given(/^.*amount of courses with name (.*) is ([0-9])$/, async function (courseName, coursesCount) {
	return courseListPage.isCountOfCoursesWithNameOnList(courseName, coursesCount, courseListPage.section.activeCourses);
});

When(/^.* selects the course (.*) and clicks clone it$/, async function (coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await generalCoursePage.cloneCourse();
});

// _________With Text__________
Given(/^.* creates some with name (.*)$/, function (coursename) {
	return addCoursePage.createCourse(coursename);
});
Given(/^.* chooses the created course with (.*) and$/, function (coursename) {
	return courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
});
When(/^.*adds a Topic with name (.*)$/, async function (topicname) {
	//return copyCourse.addTopic(topicname);
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicname);

});
When(/^.* adds title (.*) and text (.*) to the topic$/, async function (sectionTitle, text) {
	await addEditTopicPage.addText(sectionTitle, text);
	await addEditTopicPage.clickCreateTopicButton();
});

When(/^.* clicks copy course (.*) with Text$/, async function (coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await generalCoursePage.cloneCourse();
});

When(/^.* sees the course (.*) was copied and the topic (.*) is still availiable$/, async function (coursename, topicname) {
	//return copyCourse.verify(coursename, topicname);
	await courseListPage.goToCourses();
	await courseListPage.isTopicInCourseInSection(coursename, topicname, courseListPage.section.activeCourses);
});

// _________With GeoGebra__________

When(/^.* adds some GeoGebraArbeitsblatt with id (.*) to the course$/, async function (geogebraID) {
	//return copyCourse.addGeoGebra(geogebraID);
	await addEditTopicPage.addGeoGebra("GeoGebra", geogebraID);
	await addEditTopicPage.clickCreateTopicButton();

});
When(/^.* clicks copy course (.*) with GeoGebraArbeitsblatt$/, async function (coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await generalCoursePage.cloneCourse();
});
Then(/^.* sees the course (.*) copy and the GeoGebraArbeitsblatt (.*) is still availiable$/, async function (coursename, topicname) {
	//return copyCourse.verify(coursename, topicname);
	await courseListPage.goToCourses();
	await courseListPage.isTopicInCourseInSection(coursename, topicname, courseListPage.section.activeCourses);
});

// _________With Material__________
Given(/^.* creates a course with name (.*),$/, function (coursename) {
	return addCoursePage.createCourse(coursename);
});
Given(/^.* chooses this course with (.*) and$/, function (coursename) {
	return courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
});
Given(/^.* adds a topic with (.*)$/, async function (topicname) {
	//return copyCourse.addTopic(topicname);
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicname);
});

When(/^.* adds some Material  to the course$/, function () {
	return addEditTopicPage.addMaterial();
});
When(/^.* clicks copy course (.*) with Material$/, async function (coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await generalCoursePage.cloneCourse();
});
Then(/^.* sees the course (.*) copy and the material (.*) is still availiable$/, async function (coursename, topicname) {
	//return copyCourse.verify(coursename, topicname);
	await courseListPage.goToCourses();
	await courseListPage.isTopicInCourseInSection(coursename, topicname, courseListPage.section.activeCourses);
});


// _________With Etherpad__________
When(/^.* adds some Etherpad with (.*) and (.*) to the course$/, async function (etherpadName, etherpadDescription) {
	//return copyCourse.addEtherpad(etherpadName, etherpadDescription);
	await addEditTopicPage.addEtherpad(etherpadName, etherpadDescription);
	await addEditTopicPage.clickCreateTopicButton();
});
When(/^.* clicks copy course (.*) with Etherpad$/, async function (coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await generalCoursePage.cloneCourse();
});
Then(/^.* sees the course (.*) copy and the Etherpadd (.*) is still availiable$/, async function (coursename, topicname) {
	//return copyCourse.verify(coursename, topicname);
	await courseListPage.goToCourses();
	await courseListPage.isTopicInCourseInSection(coursename, topicname, courseListPage.section.activeCourses);
});


// _________With pupils__________
Given(/^.* creates a course with name (.*) and student (.*)$/, function (coursename, studentname) {
	return addCoursePage.createCourseWithStudents(coursename, studentname);
});
When(/^.* copies the course (.*) with students$/, async function (coursename) {
	await courseListPage.goToCourses();
	await courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
	await generalCoursePage.cloneCourse();
});
Then(/^.* should see the cloned course (.*) but without students$/, async function (coursename) {
	await courseListPage.goToCourses();
	await courseListPage.isCountOfCourseMemebrs(coursename, 0, courseListPage.section.activeCourses);
});
