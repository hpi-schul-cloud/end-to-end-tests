'use strict';
const waitHelpers = require('../../runtime/helpers/waitHelpers.js');
let navItemStringStart =  "/html/body/aside/nav/ul/li/a";
let navItemStringDefault =  navItemStringStart+"[contains(@title,'XXX')]";

module.exports = {
    selectors: {
        navItemLogo: navItemStringStart+"[contains(@class,'sc-branding')]",
        navItemDashboard: navItemStringDefault.replace('XXX', 'Übersicht'),
        navItemCourses: navItemStringDefault.replace('XXX', 'Kurse'),
        navItemTasks: navItemStringDefault.replace('XXX', 'Aufgaben'),  
        navItemTeams: navItemStringDefault.replace('XXX', 'Teams'),
        navItemFiles: navItemStringDefault.replace('XXX', 'Meine Dateien'),
        navItemNews: navItemStringDefault.replace('XXX', 'Neuigkeiten'),
        navItemCalendar: navItemStringDefault.replace('XXX', 'Termine'),
        navItemLearnstore: navItemStringDefault.replace('XXX', 'Lern-Store'),
        navItemAddons: navItemStringDefault.replace('XXX', 'Add-ons'),
        navItemHelpdesk: navItemStringDefault.replace('XXX', 'Helpdesk'),
        navItemAdministration: navItemStringDefault.replace('XXX', 'Verwaltung'),
        navItemHelparea: navItemStringDefault.replace('XXX', 'Hilfebereich')
    },
    clickNavItemLogo: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemLogo);   
        },
    clickNavItemDashboard: async function() {
        await  waitHelpers.waitAndClick(this.selectors.navItemDashboard);
        },
    clickNavItemCourses: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemCourses);
        },
    clickNavItemTasks: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemTasks);
        },
    clickNavItemTeams: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemTeams);
        },
    clickNavItemFiles: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemFiles);
        },
    clickNavItemNews: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemNews);
        },
    clickNavItemCalendar: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemCalendar);
        },
    clickNavItemContent: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemLearnstore);
        },
    clickNavItemAddons: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemAddons);
        },
    clickNavItemAdministration: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemAdministration);
        },
    clickNavItemHelpdesk: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemHelpdesk);
        },
    clickNavItemHelparea: async function() {
        await waitHelpers.waitAndClick(this.selectors.navItemHelparea);
        }
}