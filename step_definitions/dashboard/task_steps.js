'use strict';

const dashboardPage = require('../../page-objects/pages/DashboardPage');

//SCHEDULE

//TASKS
Then(/^.* '([^']*)' tasks section is visible on dashboard$/, async function (section) {
	await dashboardPage.isTasksSectionVisible(section);
});

Then(
	/^.* '([^']*)' task with name '([^']*)' has '([^']*)' submitted and '([^']*)' to be submitted tasks$/,
	async function (section, taskName, submitted, toBeSubmitted) {
		await dashboardPage.isTaskWithSubmittedTasksInSection(taskName, section, submitted, toBeSubmitted);
	}
);

Then(
	/^.* number of submitted tasks is not visible for task '([^']*)' in '([^']*)' section$/,
	async function (taskName, section) {
		await dashboardPage.isElementOnTaskVisible('Submitted', taskName, section, false);
	}
);

Then(
	/^.* number of submitted tasks is visible for task '([^']*)' in '([^']*)' section$/,
	async function (taskName, section) {
		await dashboardPage.isElementOnTaskVisible('Submitted', taskName, section, true);
	}
);

Then(
	/^.* '([^']*)' task with name '([^']*)' has '([^']*)' graded and '([^']*)' to be graded tasks$/,
	async function (section, taskName, graded, toBeGraded) {
		await dashboardPage.isTaskWithGradedTasksInSection(taskName, section, graded, toBeGraded);
	}
);

Then(
	/^.* number of graded tasks is not visible for task '([^']*)' in '([^']*)' section$/,
	async function (taskName, section) {
		await dashboardPage.isElementOnTaskVisible('Graded', taskName, section, false);
	}
);

Then(
	/^.* number of graded tasks is visible for task '([^']*)' in '([^']*)' section$/,
	async function (taskName, section) {
		await dashboardPage.isElementOnTaskVisible('Graded', taskName, section, true);
	}
);

Then(/^.* '([^']*)' task with name '([^']*)' is visible on dashboard$/, async function (section, taskName) {
	await dashboardPage.isTaskWithNameVisible(taskName, section);
});

Then(
	/^.* '([^']*)' task with name '([^']*)' assigned to course '([^']*)' is visible on dashboard$/,
	async function (section, taskName, courseName) {
		await dashboardPage.isTaskWithCourseVisible(taskName, section, courseName, true);
	}
);

Then(
	/^.* '([^']*)' task with name '([^']*)' with "No submission date set" is visible on dashboard$/,
	async function (section, taskName) {
		await dashboardPage.isElementOnTaskVisible('Deadline', taskName, section, true);
		await dashboardPage.isTaskWithSubmissionDateSet(taskName, section, false);
	}
);

Then(
	/^.* '([^']*)' task with name '([^']*)' with submission date is visible on dashboard$/,
	async function (section, taskName) {
		await dashboardPage.isElementOnTaskVisible('Deadline', taskName, section, true);
		await dashboardPage.isTaskWithSubmissionDateSet(taskName, section, true);
	}
);

//NEWS
