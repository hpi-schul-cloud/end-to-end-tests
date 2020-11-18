'use strict';
const CRSSEditCopyCoursePage = require('../../page-objects/pages/coursePages/CRSSEditCopyCoursePage');

When(/^.* clicks on Delete-course button$/, async function () {
	await CRSSEditCopyCoursePage.clickDeleteButton();
});