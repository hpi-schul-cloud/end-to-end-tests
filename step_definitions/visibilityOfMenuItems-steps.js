'use strict';

const NavigationLeftPage = require('../page-objects/pages/NavigationLeftPage');

Then(/^.*all sub menu items are visible: '([^']*)'$/, async function (tabList) {
    return NavigationLeftPage.areSubMenuItemsVisible(tabList);
});

Then(/^.*all menu items are visible: '([^']*)'$/, async function (tabList) {
    return NavigationLeftPage.areMenuItemsVisible(tabList);
});
