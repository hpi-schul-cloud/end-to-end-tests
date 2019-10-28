const { CLIENT } = require("../shared-objects/servers");

module.exports = {

    elem: {
        sidebarTaskButton: "a[href='/homework/']",
        createTaskButton: "a[href='/homework/new']",
        taskNameField: "input[placeholder='Titel']",
        submitTaskButton: ".btn-submit",
        taskCardTitle: ".title",
        url: `${CLIENT.URL}/homework`,
    }

};
