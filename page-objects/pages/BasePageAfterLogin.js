'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');

const navItemStringStart =  "/html/body/aside/nav/ul/li/a";
const navItemStringDefault =  navItemStringStart+("[contains(@title,'XXX')]");

module.exports = {
    selectors: {
        lalal: "/html/body/aside/nav/ul/li/a[contains(@title,'Meine Dateien')]",
    },
    mainNavigationSelectors: {
        navItemLogo: navItemStringStart+("[contains(@class,'sc-branding')]"),
        navItemDashboard: navItemStringDefault.replace('XXX', 'Übersicht'),
        navItemCourses: navItemStringDefault.replace('XXX', 'Kurse'),
        navItemTasks: navItemStringDefault.replace('XXX', 'Teams'),
        navItemTeams: navItemStringDefault.replace('XXX', 'Aufgaben'),
        navItemFiles: navItemStringDefault.replace('XXX', 'Meine Dateien'),
        navItemNews: navItemStringDefault.replace('XXX', 'Neuigkeiten'),
        navItemCalendar: navItemStringDefault.replace('XXX', 'Termine'),
        navItemLearnstore: navItemStringDefault.replace('XXX', 'Lern-Store'),
        navItemAddons: navItemStringDefault.replace('XXX', 'Add-ons'),
        navItemHelpdesk: navItemStringDefault.replace('XXX', 'Helpdesk'),
        navItemAdministration: navItemStringDefault.replace('XXX', 'Adminsitration'),
        navItemHelparea: navItemStringDefault.replace('XXX', 'Hilfebereich')
    },
    clickNavItemLogo: async function() {
        let navItemLogoBtn = await driver.$(this.mainNavigationSelectors.navItemLogo);
        await navItemLogoBtn.click();

        },
}