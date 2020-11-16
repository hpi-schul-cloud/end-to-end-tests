'use strict';

const navigationLeftPage = require('../page-objects/pages/NavigationLeftPage.js');
const tasksListPage = require('../page-objects/pages/TASKListPage.js');
const editHomeworkPage = require('../page-objects/pages/TASKAddEditTaskPage.js');

Then(/^.* clicks on '([^']*)' button for task with name '([^']*)'$/, async function (button, taskname) {
	await tasksListPage.clickOnTask(taskname, button)
});

Then(/^.* chooses task courses '([^']*)'$/, async function (listOfTaskCourses) {
	await editHomeworkPage.setTaskCourses(listOfTaskCourses);
});

Then(/^.* task body is '([^']*)'$/, async function (taskbody) {
	let descriptions = await tasksListPage.getTaskDescription();
	await expect(descriptions.some((x) => x.includes(taskbody))).to.be.true;
});
