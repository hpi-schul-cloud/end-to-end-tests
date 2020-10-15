let urls = require('../shared-objects/versionsData');
const elementHelpers = require('../runtime/helpers/elementHelpers.js');

When(/^a user arrives on the client version page$/, function() {
	return elementHelpers.loadPage(urls.client);
});
When(/^a user arrives on the server version page$/, function() {
	return elementHelpers.loadPage(urls.server);
});
When(/^a user arrives on the nuxt version page$/, function() {
	return elementHelpers.loadPage(urls.nuxt);
});
When(/^he should see the git sha$/, async function() {
	const page = await driver.$("body")
	const pageContent = await page.getText()
	await expect(pageContent).to.match(/"sha":\W*"[a-z0-9]{40}"/);
});
