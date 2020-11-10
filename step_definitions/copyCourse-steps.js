'use strict';

const generalCoursePage = require('../page-objects/pages/coursePages/CRSSGeneralCoursePage');

When(/^.* clicks Duplicate-course button$/, async function () {
	await generalCoursePage.cloneCourse();
});
