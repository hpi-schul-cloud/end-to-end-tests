'use strict';

const generalCoursePage = require('../page-objects/pages/coursePages/CRSSGeneralCoursePage');

When(/^.* clicks Duplicate-course$/, async function () {
	await generalCoursePage.cloneCourse();
});
