'use strict';

const addCoursePage = require('../page-objects/pages/coursePages/CRSSAddCoursePage');
const courseListPage = require('../page-objects/pages/coursePages/CRSSCourseListPage');
const generalCoursePage = require('../page-objects/pages/coursePages/CRSSGeneralCoursePage');
const courseTopicsPage = require('../page-objects/pages/coursePages/CRSSCourseTopicsPage');
const addEditTopicPage = require('../page-objects/pages/coursePages/CRSSAddEditTopicPage');

When(/^.* creates course with name '([^']*)'$/, function (coursename) {
	return addCoursePage.createCourse(coursename);
});

When(/^.* creates course with name '([^']*)' and student '([^']*)'$/, function (coursename, studentNameList) {
	return addCoursePage.createCourse(coursename, studentNameList);
});

When(/^.* chooses course with name '([^']*)'$/, function (coursename) {
	return courseListPage.clickOnCourseInSection(coursename, courseListPage.section.activeCourses);
});

Then(/^.* amount of courses with name '([^']*)' is '([^']*)'$/, async function (courseName, coursesCount) {
	return courseListPage.isCountOfCoursesWithNameOnList(courseName,coursesCount,courseListPage.section.activeCourses);
});

When(/^.* clicks 'duplicate course'$/, async function () {
	await generalCoursePage.cloneCourse();
});

Then(/^.* course with name '([^']*)' is cloned, but without students$/, async function (clonedCourseName) {
	await courseListPage.goToCourses();
	await courseListPage.isCountOfCourseMemebrs(clonedCourseName, 0, courseListPage.section.activeCourses);
});

When(/^.* adds content title '([^']*)' and text '([^']*)' to the topic content$/, async function (contentTitle, description) {
	await addEditTopicPage.addText(contentTitle, description);
	await addEditTopicPage.clickCreateTopicButton();
});

When(/^.*adds a topic with name '([^']*)'$/, async function (topicname) {
	await courseTopicsPage.clickAddNewTopicBtn();
	await addEditTopicPage.setTopic(topicname);
});

When(/^.* adds some Text '([^']*)'$/, async function (text) {
	await addEditTopicPage.addText(text);
	await addEditTopicPage.clickCreateTopicButton();
});

When(/^.* adds some GeoGebraArbeitsblatt with id '([^']*)'$/, async function (geogebraID) {
	await addEditTopicPage.addGeoGebra('GeoGebra', geogebraID);
	await addEditTopicPage.clickCreateTopicButton();
});

When(/^.* adds some Material$/, function () {
	return addEditTopicPage.addMaterial();
});

When(/^.* adds some Etherpad with name '([^']*)' and description '([^']*)'$/, async function (etherpadName,etherpadDescription) {
	await addEditTopicPage.addEtherpad(etherpadName, etherpadDescription);
	await addEditTopicPage.clickCreateTopicButton();
});

Then(/^.* course with name '([^']*)' contains topic with name '([^']*)'$/, async function (coursename, topicname) {
	await courseListPage.goToCourses();
	await courseListPage.isTopicInCourseInSection(coursename, topicname, courseListPage.section.activeCourses);
});
