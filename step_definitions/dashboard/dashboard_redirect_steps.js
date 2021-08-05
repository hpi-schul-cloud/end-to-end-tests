'use strict';

const { expect } = require('chai');
const elementHelpers = require('../../runtime/helpers/elementHelpers.js');
const { CLIENT } = require('../../shared-objects/servers');
const schulCloudURL = `${CLIENT.URL}`;

When(/^.*goes to '([^']*)'$/, async function (url) {
	return elementHelpers.loadPage(schulCloudURL + url);
});

Then(/^.*is redirected to login page$/, async function () {
	const url = await driver.getUrl();
	expect(url).to.equal(schulCloudURL + '/login?redirect=/dashboard')
});
