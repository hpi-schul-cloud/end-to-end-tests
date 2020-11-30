'use strict';
const CRSSEditCopyCoursePage = require('../../page-objects/pages/coursePages/CRSSEditCopyCoursePage');
const CRSSGeneralCoursePage = require('../../page-objects/pages/coursePages/CRSSGeneralCoursePage');

When(/^.* clicks on Delete-course button$/, async function () {
	await CRSSEditCopyCoursePage.clickDeleteButton();
	await CRSSEditCopyCoursePage.clickConfirmDeleteButton();
});