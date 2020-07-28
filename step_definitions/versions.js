let urls = require('../shared-objects/versionsData');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

When(/^a user arrives on the client version page$/, function() {
	return elementHelpers.loadPage(urls.client, 10);
});
When(/^a user arrives on the server version page$/, function() {
	return elementHelpers.loadPage(urls.server, 10);
});
When(/^a user arrives on the nuxt version page$/, function() {
	return elementHelpers.loadPage(urls.nuxt, 10);
});
When(/^he should see the git sha$/, async function() {
	const page = await driver.$("body")
	const pageContent = await page.getText()
	await expect(pageContent).to.match(/"sha":\W*"[a-z0-9]{40}"/);
});
