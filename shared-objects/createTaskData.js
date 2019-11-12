const { CLIENT } = require("../shared-objects/servers");

module.exports = {
  elem: {
    sidebarTaskButton: "a[href='/homework/']",
    createTaskButton: "a[href='/homework/new']",
    taskNameField: "input[placeholder='Titel']",
    ckeIframe: ".cke_wysiwyg_frame",
    taskBodyField: "p",
    submitTaskButton: ".btn-submit",
    taskCardTitle: ".title",
    url: `${CLIENT.URL}/homework`
  }
};
