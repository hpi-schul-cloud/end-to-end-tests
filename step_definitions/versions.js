let urls = require('../shared-objects/versionsData');
let performLogin = require('../page-objects/performLogin');


When(/^a user arrives on the client version page$/, function() {
	return helpers.loadPage(urls.client, 10);
});
When(/^a user arrives on the server version page$/, function() {
	return helpers.loadPage(urls.server, 10);
});
When(/^a user arrives on the nuxt version page$/, function() {
	return helpers.loadPage(urls.nuxt, 10);
});
When(/^he should see the git sha$/, async function() {
	const page = await driver.$("body")
	const pageContent = await page.getText()
	await expect(pageContent).to.match(/"sha":\W*"[a-z0-9]{40}"/);
});
